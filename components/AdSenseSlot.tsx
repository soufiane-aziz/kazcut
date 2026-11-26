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

  // Do not render empty placeholder boxes when no publisher ID is configured
  if (!publisherId) {
    return null;
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

