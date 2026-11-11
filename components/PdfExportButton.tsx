'use client';

import React, { useState } from 'react';
import { Download, Loader2, Check } from 'lucide-react';
import { generateCalculationPdf } from '@/lib/pdfGenerator';
import { logCalculationEvent } from '@/lib/supabase';

interface PdfExportButtonProps {
  targetElementId: string;
  filename: string;
  calculatorType: string;
  className?: string;
}

export default function PdfExportButton({
  targetElementId,
  filename,
  calculatorType,
  className = '',
}: PdfExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDownload = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setIsSuccess(false);

    try {
      const ok = await generateCalculationPdf(targetElementId, filename);
      if (ok) {
        setIsSuccess(true);
        logCalculationEvent(calculatorType, 'export_pdf');
        setTimeout(() => setIsSuccess(false), 3000);
      }
    } catch (e) {
      console.error('PDF Export failed:', e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isExporting}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-[#E2D9C3] bg-white px-3.5 py-2 text-xs font-medium text-[#2C221E] shadow-sm transition hover:bg-[#FAF5EE] hover:border-[#C58842] active:scale-[0.99] disabled:opacity-50 ${className}`}
    >
      {isExporting ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin text-[#C58842]" />
          <span>Generating PDF...</span>
        </>
      ) : isSuccess ? (
        <>
          <Check className="h-3.5 w-3.5 text-[#2B7A4B]" />
          <span>Downloaded</span>
        </>
      ) : (
        <>
          <Download className="h-3.5 w-3.5 text-[#6E5D54]" />
          <span>Download Calculation Summary PDF</span>
        </>
      )}
    </button>
  );
}

