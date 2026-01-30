"use client";

import Image from "next/image";
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

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function uuid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

function initialForm(): GeneratedForm {
  const template = FORM_TEMPLATES[0];
  return {
    id: "initial",
    title: template.title,
    code: template.code,
    flavor: template.flavor,
    requirements: template.requirements,
    present: {
      signature: true,
      fee: true,
      supportingDoc: true,
      correctForm: true,
      notarized: true,
    },
    shouldApprove: true,
    isExpedite: template.code === "X-1",
  };
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
  const [invasion, setInvasion] = useState(0); // 0..100
  const [current, setCurrent] = useState<GeneratedForm>(() => initialForm());
  const [banner, setBanner] = useState<string>("");

  const [highScore, setHighScore] = useState(0);

  // Swipe / drag UI state
  const cardRef = useRef<HTMLDivElement | null>(null);
  const startX = useRef<number | null>(null);
  const dragging = useRef(false);
  const [dragX, setDragX] = useState(0);

  const ended = useMemo(() => invasion >= 100 || (running && secondsLeft <= 0), [invasion, running, secondsLeft]);

  useEffect(() => {
    setHighScore(loadHighScore());
    setCurrent(generateForm());
  }, []);

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
    setDragX(0);

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

  useEffect(() => {
    // Keyboard controls (desktop)
    const onKeyDown = (e: KeyboardEvent) => {
      if (!running || ended) return;
      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        e.preventDefault();
        handleDecision("approve");
      }
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        e.preventDefault();
        handleDecision("return");
      }
    };
    window.addEventListener("keydown", onKeyDown, { passive: false });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [running, ended, current, combo, score, secondsLeft, invasion, handleDecision]);

  function resetGame() {
    setRunning(true);
    setSecondsLeft(GAME_SECONDS);
    setScore(0);
    setCombo(0);
    setInvasion(0);
    setBanner("");
    setCurrent(generateForm());
    setDragX(0);
  }

  function nextCard() {
    setCurrent(generateForm());
    setDragX(0);
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
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    if (!dragging.current || startX.current == null) return;
    const dx = e.clientX - startX.current;
    setDragX(clamp(dx, -160, 160));
  }

  function onPointerUp() {
    if (!dragging.current) return;
    dragging.current = false;

    if (dragX > SWIPE_THRESHOLD_PX) handleDecision("approve");
    else if (dragX < -SWIPE_THRESHOLD_PX) handleDecision("return");
    else setDragX(0);

    startX.current = null;
  }

  const tilt = dragX / 20;
  const approveHint = dragX > 0 ? Math.min(Math.abs(dragX) / 160, 1) : 0;
  const returnHint = dragX < 0 ? Math.min(Math.abs(dragX) / 160, 1) : 0;

  return (
    <div className="rounded-2xl border border-primary-200 bg-white shadow-lg p-3 sm:p-4 md:p-5">
      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 sm:gap-3">
          <div>
            <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider">Permit Desk</p>
            <h3 className="text-base sm:text-lg font-bold text-primary-900">Swipe-to-Approve</h3>
            <p className="mt-1 text-[11px] text-primary-500">
              Mobile: swipe card - Desktop: Left/Right or A/D
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary-50 px-2.5 py-1.5">
              <p className="text-[11px] text-primary-500">Time</p>
              <p className="text-base font-bold text-primary-900 tabular-nums">{secondsLeft}s</p>
            </div>
            {!running ? (
              <button
                onClick={resetGame}
                className="px-3 py-1.5 rounded-lg bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold transition-colors"
              >
                Start a Shift
              </button>
            ) : (
              <button
                onClick={() => {
                  setRunning(false);
                  setBanner("Shift paused.");
                }}
                className="px-3 py-1.5 rounded-lg border-2 border-primary-300 text-primary-800 text-sm font-semibold hover:bg-primary-50 transition-colors"
              >
                Pause
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 rounded-lg bg-primary-50 px-2.5 py-2">
            <div className="text-[10px] text-primary-500">
              <div>Score</div>
              <div>Combo</div>
              <div>High</div>
            </div>
            <div className="text-xs font-bold text-primary-900 tabular-nums">
              <div>{score}</div>
              <div>{combo}</div>
              <div>{highScore}</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-[10px] text-primary-500 mb-1">
              <span>Invasion</span>
              <span className="tabular-nums">{invasion}%</span>
            </div>
            <div className="h-2 rounded-full bg-primary-100 overflow-hidden">
              <div
                className="h-full bg-accent-600 transition-all"
                style={{ width: `${invasion}%` }}
                aria-label="Invasion progress bar"
              />
            </div>
          </div>
        </div>

        <div
          className="rounded-lg bg-secondary-50 border border-secondary-200 px-3 text-xs text-secondary-900 h-8 flex items-center overflow-hidden"
          aria-live="polite"
        >
          <span className={`transition-opacity truncate ${banner ? "opacity-100" : "opacity-0"}`}>
            {banner || " "}
          </span>
        </div>

        <div className="flex items-center justify-between text-[11px] text-primary-500">
          <span className="inline-flex items-center gap-2">
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-primary-200 bg-white"
              style={{ opacity: 0.4 + 0.6 * returnHint }}
            >
              &lt;-
            </span>
            Return for More Info
          </span>
          <span className="inline-flex items-center gap-2">
            Approve
            <span
              className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-primary-200 bg-white"
              style={{ opacity: 0.4 + 0.6 * approveHint }}
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
            className="rounded-2xl border border-primary-200 bg-white shadow-sm overflow-hidden transition-transform"
            style={{ transform: `translateX(${dragX}px) rotate(${tilt}deg)` }}
          >
            <div className="p-3 sm:p-4 md:p-6 border-b border-primary-100 bg-primary-50">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider">Incoming Request</p>
                  <h4 className="text-base sm:text-lg md:text-xl font-extrabold text-primary-900 leading-tight">
                    {current.title} <span className="text-primary-400">({current.code})</span>
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-primary-600">{current.flavor}</p>
                </div>

                {current.isExpedite ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-accent-100 text-accent-700 text-xs font-semibold">
                    EXPEDITE
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold">
                    STANDARD
                  </span>
                )}
              </div>
            </div>

            <div className="p-3 sm:p-4 md:p-5">
              <p className="text-xs sm:text-sm font-semibold text-primary-900 mb-2 sm:mb-3">Checklist</p>

              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {current.requirements.map((req) => {
                  const meta = REQUIREMENT_META[req.key];
                  const ok = current.present[req.key];
                  const label = ok ? req.label : `Missing ${req.label}`;
                  return (
                    <div
                      key={req.key}
                      className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 sm:px-3 sm:py-2 ${
                        ok ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-primary-500">{meta.short}</span>
                        <span className="text-xs sm:text-sm font-semibold text-primary-900">{label}</span>
                      </div>
                      <span className={`text-[11px] font-bold ${ok ? "text-green-700" : "text-red-700"}`}>
                        {ok ? "OK" : "MISSING"}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 sm:mt-5 rounded-lg border border-primary-200 bg-white p-3 sm:p-4">
                <p className="text-xs font-semibold text-primary-500 uppercase tracking-wider mb-2">Desk Note</p>
                <p className="text-xs sm:text-sm text-primary-700">
                  Approve only if every item is present. Otherwise: return for more info.
                </p>
              </div>
            </div>

            <div className="p-3 sm:p-4 md:p-5 border-t border-primary-100 bg-white">
              <div className="flex flex-row flex-nowrap gap-3">
                <button
                  onClick={() => handleDecision("return")}
                  disabled={!running || ended}
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg border-2 border-primary-300 text-primary-800 text-sm font-semibold hover:bg-primary-50 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-primary-100">
                    <Image
                      src="/images/Vexthar.jpg"
                      alt="High Commander Vex'Thar"
                      fill
                      sizes="40px"
                      className="object-cover"
                      priority={false}
                    />
                  </span>
                  Return for More Info
                </button>
                <button
                  onClick={() => handleDecision("approve")}
                  disabled={!running || ended}
                  className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white text-sm font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-primary-100">
                    <Image
                      src="/images/Mildred.jpg"
                      alt="Mildred Higgins"
                      fill
                      sizes="40px"
                      className="object-cover"
                      priority={false}
                    />
                  </span>
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>

        {ended ? (
          <div className="rounded-xl border border-primary-200 bg-primary-50 p-5 md:p-6">
            <h4 className="text-lg font-extrabold text-primary-900">Shift Summary</h4>
            <p className="mt-1 text-sm text-primary-700">
              Score: <span className="font-bold tabular-nums">{score}</span> - High Score:{" "}
              <span className="font-bold tabular-nums">{Math.max(highScore, score)}</span>
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={resetGame}
                className="w-full px-4 py-3 rounded-lg bg-accent-600 hover:bg-accent-700 text-white font-semibold transition-colors"
              >
                Start Another Shift
              </button>
              <a
                href="https://a.co/d/h9ehTip"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-3 rounded-lg border-2 border-primary-300 text-primary-900 font-semibold hover:bg-white transition-colors"
              >
                Buy the Book
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
