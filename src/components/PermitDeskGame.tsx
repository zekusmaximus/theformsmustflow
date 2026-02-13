"use client";

import { useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { FORM_TEMPLATES, REQUIREMENT_META, RequirementKey } from "@/lib/forms";

type GeneratedForm = {
  id: string;
  title: string;
  code: string;
  flavor: string;
  requirements: Array<{ key: RequirementKey; label: string }>;
  present: Record<RequirementKey, boolean>;
  shouldApprove: boolean;
  isExpedite: boolean;
};

type Decision = "approve" | "return";

const GAME_SECONDS = 45;
const SWIPE_THRESHOLD_PX = 90;
const INVASION_START = 50;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uuid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function generateForm(): GeneratedForm {
  const template = FORM_TEMPLATES[randInt(0, FORM_TEMPLATES.length - 1)];
  const isExpedite = template.code === "X-1";

  // Target ~45% fully compliant, ~55% missing at least one requirement.
  const makeCompliant = Math.random() < 0.45;

  const present: Record<RequirementKey, boolean> = {
    signature: true,
    fee: true,
    supportingDoc: true,
    correctForm: true,
    notarized: true,
  };

  if (!makeCompliant) {
    // Missing 1-2 requirements (Expedite tends to miss 2 a bit more often)
    const misses = isExpedite ? (Math.random() < 0.55 ? 2 : 1) : (Math.random() < 0.25 ? 2 : 1);
    const keys: RequirementKey[] = ["signature", "fee", "supportingDoc", "correctForm", "notarized"];
    for (let i = 0; i < misses; i++) {
      const k = keys.splice(randInt(0, keys.length - 1), 1)[0];
      present[k] = false;
    }
  }

  const shouldApprove = Object.values(present).every(Boolean);

  return {
    id: uuid(),
    title: template.title,
    code: template.code,
    flavor: template.flavor,
    requirements: template.requirements,
    present,
    shouldApprove,
    isExpedite,
  };
}

function loadHighScore(): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem("permitDeskHighScore");
  const n = raw ? Number(raw) : 0;
  return Number.isFinite(n) ? n : 0;
}

function saveHighScore(score: number) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem("permitDeskHighScore", String(score));
}

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest("button, a, input, select, textarea, [role='button']"));
}

export default function PermitDeskGame() {
  const [running, setRunning] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(GAME_SECONDS);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [invasion, setInvasion] = useState(INVASION_START); // 0..100
  const [current, setCurrent] = useState<GeneratedForm>(() => generateForm());
  const [banner, setBanner] = useState<string>("");

  const [highScore, setHighScore] = useState(() => loadHighScore());

  // Swipe / drag UI state
  const cardRef = useRef<HTMLDivElement | null>(null);
  const cardInnerRef = useRef<HTMLDivElement | null>(null);
  const approveHintRef = useRef<HTMLSpanElement | null>(null);
  const returnHintRef = useRef<HTMLSpanElement | null>(null);

  const startX = useRef<number | null>(null);
  const dragging = useRef(false);
  const dragXRef = useRef(0);

  const ended = useMemo(() => invasion >= 100 || (running && secondsLeft <= 0), [invasion, running, secondsLeft]);

  useEffect(() => {
    if (!running) return;
    if (ended) return;

    const t = window.setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);

    return () => window.clearInterval(t);
  }, [running, ended]);

  useEffect(() => {
    if (!running) return;
    if (secondsLeft > 0) return;

    // End by timer
    setRunning(false);
    setBanner("Time! File closed.");
  }, [running, secondsLeft]);

  useEffect(() => {
    if (!ended) return;

    // Finalize high score once
    setRunning(false);
    dragXRef.current = 0;

    setHighScore((hs) => {
      const next = Math.max(hs, score);
      saveHighScore(next);
      return next;
    });

    if (invasion >= 100) {
      setBanner("Compliance breach. The hive mind advances.");
    } else {
      setBanner("Desk cleared. For now.");
    }
  }, [ended, invasion, score]);

  const handleDecisionRef = useRef(handleDecision);
  useEffect(() => {
    handleDecisionRef.current = handleDecision;
  });

  useEffect(() => {
    // Keyboard controls (desktop)
    const onKeyDown = (e: KeyboardEvent) => {
      if (!running || ended) return;
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        e.preventDefault();
        handleDecisionRef.current("approve");
      }
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        e.preventDefault();
        handleDecisionRef.current("return");
      }
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [running, ended]);

  function resetGame() {
    setRunning(true);
    setSecondsLeft(GAME_SECONDS);
    setScore(0);
    setCombo(0);
    setInvasion(INVASION_START);
    setBanner("");
    setCurrent(generateForm());
    dragXRef.current = 0;
  }

  function nextCard() {
    setCurrent(generateForm());
    dragXRef.current = 0;
  }

  function flash(msg: string) {
    setBanner(msg);
    window.setTimeout(() => setBanner(""), 900);
  }

  function handleDecision(decision: Decision) {
    if (!running || ended) return;

    const correct =
      (decision === "approve" && current.shouldApprove) ||
      (decision === "return" && !current.shouldApprove);

    // Base points + speed-ish bonus
    const speedBonus = clamp(Math.round((secondsLeft / GAME_SECONDS) * 30), 0, 30);
    const base = 100 + speedBonus;

    if (correct) {
      const nextCombo = combo + 1;
      setCombo(nextCombo);

      const mult = 1 + Math.floor(nextCombo / 5) * 0.25; // +25% every 5 streak
      const gained = Math.round(base * mult);
      setScore((s) => s + gained);

      // Correct work slows invasion a hair
      setInvasion((x) => clamp(x - 2, 0, 100));

      flash(decision === "approve" ? "Stamped. Next." : "Returned: Missing item(s).");
    } else {
      setCombo(0);

      // Penalties: approving bad paperwork is worse than rejecting good paperwork
      const penalty = decision === "approve" ? 15 : 6;
      setInvasion((x) => clamp(x + penalty, 0, 100));

      flash(decision === "approve" ? "Incorrect approval. Process violation." : "Wrong return. Resubmission required.");
    }

    nextCard();
  }

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    if (!running || ended) return;
    if (isInteractiveTarget(e.target)) return;
    dragging.current = true;
    startX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);

    if (cardInnerRef.current) {
      cardInnerRef.current.style.transition = 'none';
    }
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current || startX.current == null) return;
    const dx = e.clientX - startX.current;
    const newDragX = clamp(dx, -160, 160);
    dragXRef.current = newDragX;

    if (cardInnerRef.current) {
      const tilt = newDragX / 20;
      cardInnerRef.current.style.transform = `translateX(${newDragX}px) rotate(${tilt}deg)`;
    }

    if (approveHintRef.current) {
      const approveHint = newDragX > 0 ? Math.min(Math.abs(newDragX) / 160, 1) : 0;
      approveHintRef.current.style.opacity = String(0.4 + 0.6 * approveHint);
    }

    if (returnHintRef.current) {
      const returnHint = newDragX < 0 ? Math.min(Math.abs(newDragX) / 160, 1) : 0;
      returnHintRef.current.style.opacity = String(0.4 + 0.6 * returnHint);
    }
  }

  function onPointerUp() {
    if (!dragging.current) return;
    dragging.current = false;
    const currentDragX = dragXRef.current;

    if (currentDragX > SWIPE_THRESHOLD_PX) handleDecision("approve");
    else if (currentDragX < -SWIPE_THRESHOLD_PX) handleDecision("return");
    else {
      dragXRef.current = 0;
      if (cardInnerRef.current) {
        cardInnerRef.current.style.transition = '';
        cardInnerRef.current.style.transform = '';
      }
      if (approveHintRef.current) approveHintRef.current.style.opacity = "";
      if (returnHintRef.current) returnHintRef.current.style.opacity = "";
    }

    startX.current = null;
  }

  return (
    <div className="rounded-2xl border border-primary-200 bg-white shadow-lg p-2 sm:p-3">
      <div className="flex flex-col gap-1.5 sm:gap-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1.5 sm:gap-2">
          <div>
            <p className="text-[10px] font-semibold text-primary-500 uppercase tracking-wider">Permit Desk</p>
            <h3 className="text-sm sm:text-base font-bold text-primary-900">Swipe-to-Approve</h3>
            <p className="text-[10px] text-primary-500">
              Swipe or use arrow keys
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary-50 px-2 py-1">
              <p className="text-[10px] text-primary-500">Time</p>
              <p className="text-sm font-bold text-primary-900 tabular-nums">{secondsLeft}s</p>
            </div>
            {!running ? (
              <button
                onClick={resetGame}
                className="px-3 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white text-xs font-semibold transition-colors min-h-9"
              >
                Start
              </button>
            ) : (
              <button
                onClick={() => {
                  setRunning(false);
                  setBanner("Shift paused.");
                }}
                className="px-3 py-2 rounded-lg border-2 border-primary-300 text-primary-800 text-xs font-semibold hover:bg-primary-50 transition-colors min-h-9"
              >
                Pause
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-2 rounded-lg bg-primary-50 px-2 py-1">
            <div className="text-[10px] text-primary-500">
              <div>Score</div>
              <div>Combo</div>
              <div>High</div>
            </div>
            <div className="text-[11px] font-bold text-primary-900 tabular-nums">
              <div>{score}</div>
              <div>{combo}</div>
              <div>{highScore}</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-[10px] text-primary-500 mb-0.5">
              <span>Invasion</span>
              <span className="tabular-nums">{invasion}%</span>
            </div>
            <div className="relative h-2 rounded-full bg-primary-100 overflow-hidden">
              <div
                className="h-full bg-accent-600 transition-all"
                style={{ width: `${invasion}%` }}
                aria-label="Invasion progress bar"
              />
              <div
                className="absolute top-0 h-full w-0.5 bg-primary-400"
                style={{ left: `${INVASION_START}%` }}
                aria-label="Starting invasion level"
              />
            </div>
          </div>
        </div>

        <div
          className="rounded-lg bg-secondary-50 border border-secondary-200 px-2 text-[10px] text-secondary-900 h-6 flex items-center overflow-hidden"
          aria-live="polite"
        >
          <span className={`transition-opacity truncate ${banner ? "opacity-100" : "opacity-0"}`}>
            {banner || " "}
          </span>
        </div>

        <div className="flex items-center justify-between text-[10px] text-primary-500">
          <span className="inline-flex items-center gap-1">
            <span
              ref={returnHintRef}
              className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-primary-200 bg-white text-[10px]"
              style={{ opacity: 0.4 }}
            >
              &lt;-
            </span>
            Return
          </span>
          <span className="inline-flex items-center gap-1">
            Approve
            <span
              ref={approveHintRef}
              className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-primary-200 bg-white text-[10px]"
              style={{ opacity: 0.4 }}
            >
              -&gt;
            </span>
          </span>
        </div>

        <div
          ref={cardRef}
          className="relative select-none touch-pan-y"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            ref={cardInnerRef}
            key={current.id}
            className="rounded-xl border border-primary-200 bg-white shadow-sm overflow-hidden transition-transform"
          >
            <div className="p-2 sm:p-3 border-b border-primary-100 bg-primary-50">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-semibold text-primary-500 uppercase tracking-wider">Request</p>
                  <h4 className="text-sm sm:text-base font-extrabold text-primary-900 leading-tight">
                    {current.title} <span className="text-primary-400 text-xs">({current.code})</span>
                  </h4>
                  <p className="mt-0.5 text-[10px] sm:text-xs text-primary-600 line-clamp-1">{current.flavor}</p>
                </div>

                {current.isExpedite ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-accent-100 text-accent-700 text-[10px] font-semibold whitespace-nowrap">
                    EXPEDITE
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-primary-100 text-primary-700 text-[10px] font-semibold whitespace-nowrap">
                    STANDARD
                  </span>
                )}
              </div>
            </div>

            <div className="p-2 sm:p-3">
              <p className="text-[10px] font-semibold text-primary-900 mb-1.5">Checklist</p>

              <div className="grid grid-cols-2 gap-1.5">
                {current.requirements.map((req) => {
                  const meta = REQUIREMENT_META[req.key];
                  const ok = current.present[req.key];
                  const label = ok ? req.label : `Missing ${req.label}`;
                  return (
                    <div
                      key={req.key}
                      className={`flex items-center justify-between rounded border px-1.5 py-1 ${
                        ok ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }`}
                      title={label}
                      aria-label={label}
                    >
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="text-[10px] font-bold text-primary-500 whitespace-nowrap">{meta.short}</span>
                        <span className={`text-[10px] font-semibold truncate ${ok ? "text-green-700" : "text-red-700"}`}>
                          {ok ? "✓" : "✗"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-2 rounded border border-primary-200 bg-white px-2 py-1">
                <p className="text-[10px] font-semibold text-primary-500 uppercase tracking-wider">Note</p>
                <p className="text-[10px] text-primary-700">
                  Approve if all present, else return.
                </p>
              </div>
            </div>

            <div className="p-2 sm:p-3 border-t border-primary-100 bg-white">
              <div className="flex flex-row flex-nowrap gap-2">
                <button
                  onClick={() => handleDecision("return")}
                  disabled={!running || ended}
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg border-2 border-primary-300 text-primary-800 text-xs font-semibold hover:bg-primary-50 transition-colors disabled:opacity-50 flex items-center justify-center min-h-10"
                >
                  Return
                </button>
                <button
                  onClick={() => handleDecision("approve")}
                  disabled={!running || ended}
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white text-xs font-semibold transition-colors disabled:opacity-50 flex items-center justify-center min-h-10"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>

        {ended ? (
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-3">
            <h4 className="text-sm font-extrabold text-primary-900">Shift Complete</h4>
            <p className="mt-0.5 text-xs text-primary-700">
              Score: <span className="font-bold tabular-nums">{score}</span> - High: {" "}
              <span className="font-bold tabular-nums">{Math.max(highScore, score)}</span>
            </p>
            {invasion >= INVASION_START ? (
              <p className="mt-1.5 text-xs text-accent-700 font-semibold">
                Invasion successful! The hive mind breaks through the red tape.
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-green-700 font-semibold">
                Invasion stopped by proper form filing! Bureaucracy wins again.
              </p>
            )}
            <div className="mt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={resetGame}
                className="w-full px-3 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white text-xs font-semibold transition-colors"
              >
                Play Again
              </button>
              <a
                href="https://a.co/d/h9ehTip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-3 py-2 rounded-lg border-2 border-primary-300 text-primary-900 text-xs font-semibold hover:bg-white transition-colors text-center"
              >
                {invasion >= INVASION_START
                  ? "Read the book to get the whole story"
                  : "Read how the bureaucracy fares in the book"}
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
