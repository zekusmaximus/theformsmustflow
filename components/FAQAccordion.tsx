// components/FAQAccordion.tsx
// FAQ accordion with analytics tracking

'use client';

import React, { useState } from 'react';
import { copy } from '@/copy';
import { trackFAQExpand } from '@/lib/analytics';

interface FAQAccordionProps {
  className?: string;
}

/**
 * FAQ Accordion Component
 * 
 * Expandable FAQ items with smooth animations
 * Tracks which questions are expanded
 * 
 * Usage:
 * <FAQAccordion />
 */
export function FAQAccordion({ className = '' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    if (openIndex !== index) {
      trackFAQExpand(index);
    }
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      className={`py-16 md:py-24 ${className}`}
      data-section="faq"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          id="faq-heading"
          className="text-3xl md:text-4xl font-bold text-primary-900 text-center mb-4"
        >
          {copy.ui.faqHeadline}
        </h2>
        <p className="text-center text-primary-600 mb-12">
          Everything you need to know before diving in.
        </p>

        <div className="space-y-4">
          {copy.faq.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface FAQItemProps {
  item: { question: string; answer: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ item, index, isOpen, onToggle }: FAQItemProps) {
  const buttonId = `faq-button-${index}`;
  const contentId = `faq-content-${index}`;

  return (
    <div 
      className="border border-primary-200 rounded-lg overflow-hidden bg-white hover:border-primary-300 transition-colors"
    >
      <button
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-inset"
      >
        <span className="text-lg font-semibold text-primary-900 pr-4">
          {item.question}
        </span>
        <span 
          className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="p-5 md:p-6 pt-0 text-primary-600 leading-relaxed">
          {item.answer}
        </div>
      </div>
    </div>
  );
}
