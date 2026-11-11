'use client';

import React, { useEffect, useRef } from 'react';

interface AdSenseSlotProps {
  publisherId?: string;
  slotId: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  minHeight?: number;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export default function AdSenseSlot({
  publisherId = process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID,
  slotId,
  format = 'auto',
  className = '',
  minHeight = 90,
}: AdSenseSlotProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    if (!publisherId || isLoadedRef.current) return;

    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        isLoadedRef.current = true;
      }
    } catch (err) {
      console.warn('AdSense slot initialization:', err);
    }
  }, [publisherId, slotId]);

  // If no publisher ID is configured (development or pre-production), render a sleek reserved skeleton
  if (!publisherId) {
    return (
      <aside
        aria-label="Advertisement Placement"
        className={`relative flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-[#E2D9C3] bg-[#FAF5EE]/70 px-4 py-3 text-center text-[#9B8C83] transition ${className}`}
        style={{ minHeight: `${minHeight}px` }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#9B8C83]">
          Advertisement
        </span>
        <span className="mt-0.5 text-[11px] text-[#6E5D54]/70">
          Slot: {slotId} ({format})
        </span>
      </aside>
    );
  }

  return (
    <aside
      ref={adRef}
      aria-label="Advertisement Placement"
      className={`relative w-full overflow-hidden text-center ${className}`}
      style={{ minHeight: `${minHeight}px` }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: `${minHeight}px` }}
        data-ad-client={publisherId}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}

