'use client';

import React, { useState } from 'react';
import { Share2, Copy, Check, X, Loader2 } from 'lucide-react';
import { saveCalculationTemplate } from '@/lib/supabase';

interface SaveCalculationModalProps {
  calculatorType: 'paypal' | 'stripe' | 'etsy' | 'amazon' | 'shopify' | 'freelance';
  currency: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  defaultTitle?: string;
}

const CALCULATOR_ROUTE_MAP: Record<SaveCalculationModalProps['calculatorType'], string> = {
  paypal: '/paypal-fee-calculator',
  stripe: '/stripe-fee-calculator',
  etsy: '/etsy-fee-calculator',
  amazon: '/amazon-fba-calculator',
  shopify: '/shopify-profit-calculator',
  freelance: '/freelance-hourly-rate-calculator',
};

export default function SaveCalculationModal({
  calculatorType,
  currency,
  inputs,
  results,
  defaultTitle = 'My Saved Calculation',
}: SaveCalculationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(defaultTitle);
  const [isSaving, setIsSaving] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const suffix =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID().replace(/-/g, '').slice(0, 8)
        : Math.random().toString(36).substring(2, 10);
    const shareId = `${calculatorType.substring(0, 3)}-${suffix}`;

    try {
      const res = await saveCalculationTemplate({
        share_id: shareId,
        calculator_type: calculatorType,
        title: title.trim() || defaultTitle,
        currency,
        inputs,
        results,
      });

      if (res.success) {
        const routePath = CALCULATOR_ROUTE_MAP[calculatorType];
        const fullUrl = `${window.location.origin}${routePath}?template=${res.shareId}`;
        setShareUrl(fullUrl);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setTitle(defaultTitle);
          setShareUrl(null);
          setIsOpen(true);
        }}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2D9C3] bg-white px-3 py-2 text-xs font-medium text-[#2C221E] shadow-sm transition hover:bg-[#FAF5EE] hover:border-[#C58842]"
      >
        <Share2 className="h-3.5 w-3.5 text-[#6E5D54]" />
        <span>Save & Share</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-xl border border-[#EFEAD8] bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#EFEAD8] pb-3">
              <h3 className="text-sm font-semibold text-[#2C221E]">
                Save Calculation Template
              </h3>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setShareUrl(null);
                }}
                className="text-[#6E5D54] hover:text-[#2C221E]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {!shareUrl ? (
              <form onSubmit={handleSave} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#6E5D54]">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={80}
                    placeholder="e.g. Q4 Merchant Estimate"
                    className="mt-1.5 w-full rounded-md border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-2 text-xs text-[#2C221E] focus:border-[#C58842] focus:outline-hidden"
                  />
                </div>

                <div className="rounded-md bg-[#FAF5EE] p-3 text-[11px] text-[#6E5D54]">
                  Saves inputs and outputs so you can retrieve or share this exact calculation later via a link.
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="rounded-md px-3 py-1.5 text-xs font-medium text-[#6E5D54] hover:bg-[#FAF5EE]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[#C58842] px-3.5 py-1.5 text-xs font-medium text-white transition hover:bg-[#A86E31] disabled:opacity-50"
                  >
                    {isSaving && <Loader2 className="h-3 w-3 animate-spin" />}
                    <span>Save Template</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="rounded-md bg-[#EBF7EE] p-3 text-xs text-[#2B7A4B]">
                  Calculation template saved successfully.
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#6E5D54]">
                    Shareable Link
                  </label>
                  <div className="mt-1 flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={shareUrl}
                      className="w-full rounded-md border border-[#EFEAD8] bg-[#FDFBF7] px-3 py-2 font-mono text-[11px] text-[#2C221E]"
                    />
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1 rounded-md bg-[#2C221E] px-3 py-2 text-xs font-medium text-white hover:bg-[#433530]"
                    >
                      {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                      <span>{copied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false);
                      setShareUrl(null);
                    }}
                    className="rounded-md border border-[#EFEAD8] px-3.5 py-1.5 text-xs font-medium text-[#2C221E] hover:bg-[#FAF5EE]"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

