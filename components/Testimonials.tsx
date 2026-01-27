// components/Testimonials.tsx
// Social proof carousel + grid

'use client';

import React, { useEffect, useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  tone: 'approval' | 'snark' | 'awe' | 'relief';
}

const testimonials: Testimonial[] = [
  {
    name: 'Lena Ortiz',
    role: 'Process Engineer',
    quote: "I came for the satire, stayed for the terrifying accuracy about approvals. I laughed, then filed a ticket about it.",
    tone: 'approval',
  },
  {
    name: 'Jordan Blake',
    role: 'Deputy Assistant (of Something)',
    quote: "Finally, a sci-fi book where bureaucracy is the weapon. Also, yes, there's a form for that.",
    tone: 'snark',
  },
  {
    name: 'Priya Narayanan',
    role: 'Incident Commander',
    quote: "Peak tension delivered via meeting minutes and risk registers. Unexpectedly gripping, uncomfortably real.",
    tone: 'awe',
  },
  {
    name: 'Zed-14',
    role: 'Alien Liaison (provisional)',
    quote: "We paused planetary conquest to finish chapter eight. Requesting extension form for invasion timeline.",
    tone: 'relief',
  },
];

const toneBadge: Record<Testimonial['tone'], string> = {
  approval: 'bg-primary-100 text-primary-800 border-primary-200',
  snark: 'bg-accent-100 text-accent-800 border-accent-200',
  awe: 'bg-secondary-100 text-secondary-800 border-secondary-200',
  relief: 'bg-metallic-100 text-metallic-800 border-metallic-200',
};

export function Testimonials({ className = '' }: { className?: string }) {
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev: number) => (prev + 1) % testimonials.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className={`relative py-16 md:py-20 overflow-hidden ${className}`}
      data-section="testimonials"
      aria-labelledby="testimonials-heading"
    >
      {/* layered folder backing */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 rotate-[-2deg] bg-secondary-50 border border-secondary-200 rounded-[28px] shadow-md" />
        <div className="absolute inset-4 rotate-1 bg-white border border-primary-100 rounded-[26px] shadow-lg" />
        <div className="absolute -top-1 left-16 right-16 h-2 bg-accent-500 rotate-[-6deg] rounded-sm shadow" />
        <div className="absolute -bottom-3 left-24 right-20 h-2 bg-accent-600 rotate-4 rounded-sm shadow-md" />
        <div className="grain-overlay" aria-hidden="true" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="h-10 w-1.5 bg-accent-500 rounded-full rotate-[-3deg]" />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary-500">What the characters are saying</p>
            <h2 id="testimonials-heading" className="text-2xl md:text-3xl font-extrabold text-primary-900">
              Field notes from the bureaucracy front lines
            </h2>
            <p className="text-xs text-primary-400 mt-1 italic">
              All quotes are from fictional personnel records. Any resemblance to real process engineers is… regrettable
            </p>
          </div>
        </div>

        {/* Mobile carousel */}
        <div className="md:hidden mb-8">
          <TestimonialCard testimonial={testimonials[active]} index={active} />
          <div className="mt-4 flex items-center justify-center gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActive(idx)}
                className={`h-2.5 w-7 rounded-full transition-all duration-300 ${
                  idx === active ? 'bg-accent-600' : 'bg-primary-200'
                }`}
                aria-label={`Show testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Grid on desktop */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={idx} testimonial={testimonial} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const tilt = index % 2 === 0 ? '-1deg' : '1.5deg';
  return (
    <article
      className="relative bg-white border border-primary-100 rounded-2xl shadow-md p-6 md:p-7 overflow-hidden"
      style={{ transform: `rotate(${tilt})` }}
    >
      <div className="absolute -top-3 left-10 right-14 h-2 bg-accent-500 rotate-[-4deg] rounded-sm shadow-md" />
      <div className="absolute -bottom-4 left-14 right-10 h-2 bg-secondary-300 rotate-3 rounded-sm shadow" />
      <div className="relative space-y-4">
        <p className="text-primary-700 leading-relaxed text-base md:text-lg">
          “{testimonial.quote}”
        </p>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-primary-900">{testimonial.name}</p>
            <p className="text-sm text-primary-500">{testimonial.role}</p>
          </div>
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full border ${toneBadge[testimonial.tone]} rotate-[-2deg]`}
          >
            {testimonial.tone.toUpperCase()}
          </span>
        </div>
      </div>
    </article>
  );
}
