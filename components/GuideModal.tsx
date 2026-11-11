'use client';

import React, { useState } from 'react';
import { X, ArrowRight, ArrowLeft, Check, Compass, Sliders, BarChart2, FileText } from 'lucide-react';
import { useGuide } from '@/context/GuideContext';

const GUIDE_STEPS = [
  {
    icon: Compass,
    step: '01',
    title: 'Select a Dedicated Calculation Engine',
    subtitle: 'High-Precision Financial Tools',
    content:
      'Choose from six dedicated calculators across payment processors (PayPal, Stripe), marketplaces (Etsy, Amazon FBA), or business planning (Shopify unit economics, Freelance hourly rates). Every tool includes 2026 baseline schedules and regional rate modifiers.',
  },
  {
    icon: Sliders,
    step: '02',
    title: 'Utilize Two-Way Inversion Logic',
    subtitle: 'Standard Charges vs. Net Dollar Targets',
    content:
      'Switch between "I am invoicing" (deducts platform fees from your gross charge) and "I want to receive" (reverse calculates the exact invoice total required to net an exact take-home target after all deductions).',
  },
  {
    icon: BarChart2,
    step: '03',
    title: 'Inspect Live Breakdown & Effective Rates',
    subtitle: 'Itemized Fee Visibility',
    content:
      'As you adjust values or sliders, review the real-time proportional distribution bar, effective processing rate percentage, and side-by-side fee itemization tables. There are no hidden fees or estimation gaps.',
  },
  {
    icon: FileText,
    step: '04',
    title: 'Export PDF Reports & Save Templates',
    subtitle: 'Auditing & Sharing',
    content:
      'Click "Download Calculation Summary PDF" to generate a client-side document for accounting and client billing. Use "Save & Share" to store calculation templates directly into Supabase with unique shareable links.',
  },
];

export default function GuideModal() {
  const { isOpen, closeGuide } = useGuide();
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const current = GUIDE_STEPS[currentStep];
  const IconComponent = current.icon;
  const isLast = currentStep === GUIDE_STEPS.length - 1;

  const handleNext = () => {
    if (isLast) {
      closeGuide();
      setCurrentStep(0);
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleClose = () => {
    closeGuide();
    setCurrentStep(0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-lg rounded-xl border border-[#EFEAD8] bg-white p-6 shadow-2xl transition">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-4">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-[#FAF5EE] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#C58842]">
              User Walkthrough
            </span>
            <span className="text-xs text-[#9B8C83]">
              Step {currentStep + 1} of {GUIDE_STEPS.length}
            </span>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-md p-1 text-[#6E5D54] hover:bg-[#FAF5EE] hover:text-[#2C221E] transition"
            aria-label="Close guide"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 flex gap-1.5">
          {GUIDE_STEPS.map((_, idx) => (
            <div
              key={idx}
              className={`h-1 flex-1 rounded-full transition-all duration-300 ${idx <= currentStep ? 'bg-[#C58842]' : 'bg-[#EFEAD8]'
                }`}
            />
          ))}
        </div>

        {/* Content Body */}
        <div className="mt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#E8DFC9] bg-[#FAF5EE] text-[#C58842]">
              <IconComponent className="h-4 w-4" />
            </div>
            <div>
              <span className="font-mono text-[11px] font-medium text-[#6E5D54]">
                Phase {current.step}
              </span>
              <h3 className="text-base font-semibold text-[#2C221E]">
                {current.title}
              </h3>
            </div>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-[#6E5D54]">
            {current.content}
          </p>

          <div className="mt-4 rounded-lg border border-[#EFEAD8] bg-[#FDFBF7] p-3 text-[11px] text-[#6E5D54]">
            <span className="font-medium text-[#2C221E]">{current.subtitle}:</span> All mathematical execution runs entirely client-side on your device with 0 latency and 0 remote server transmission.
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex items-center justify-between border-t border-[#EFEAD8] pt-4">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 0}
            className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium text-[#6E5D54] transition hover:bg-[#FAF5EE] disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-[#6E5D54] transition hover:bg-[#FAF5EE]"
            >
              Skip
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#C58842] px-4 py-1.5 text-xs font-medium text-white shadow-xs transition hover:bg-[#A86E31]"
            >
              {isLast ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Start Calculating</span>
                </>
              ) : (
                <>
                  <span>Next Step</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

