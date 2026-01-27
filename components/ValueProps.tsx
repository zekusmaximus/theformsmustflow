// components/ValueProps.tsx
// Value proposition cards grid

'use client';

import React from 'react';
import { copy } from '@/copy';

interface ValuePropsProps {
  className?: string;
}

/**
 * Value Propositions Grid
 * 
 * Displays 6 value prop cards in a responsive grid
 * 
 * Usage:
 * <ValueProps />
 */
export function ValueProps({ className = '' }: ValuePropsProps) {
  const valueProps = copy.valueProps;

  return (
    <section 
      className={`py-16 md:py-24 ${className}`}
      data-section="value-props"
      aria-labelledby="value-props-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="value-props-heading" 
          className="sr-only"
        >
          What to Expect
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {valueProps.map((prop, index) => (
            <ValuePropCard 
              key={index} 
              {...prop} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ValuePropCardProps {
  headline: string;
  description: string;
  index: number;
}

function ValuePropCard({ headline, description, index }: ValuePropCardProps) {
  // Alternate accent colors for visual interest
  const accentColors = [
    'border-accent-400',
    'border-secondary-400',
    'border-primary-400',
    'border-accent-400',
    'border-secondary-400',
    'border-primary-400',
  ];

  const icons = [
    <RocketIcon key={0} />,
    <ScissorsIcon key={1} />,
    <FilmIcon key={2} />,
    <UserIcon key={3} />,
    <BookOpenIcon key={4} />,
    <ClockIcon key={5} />,
  ];

  return (
    <article 
      className={`relative p-6 md:p-8 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 ${accentColors[index]} group`}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 group-hover:bg-primary-100 transition-colors">
          {icons[index]}
        </div>
        <div>
          <h3 className="text-lg font-bold text-primary-900 mb-2">
            {headline}
          </h3>
          <p className="text-primary-600 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}

// Icon components
function RocketIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  );
}

function ScissorsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
    </svg>
  );
}

function FilmIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
}

function BookOpenIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
