'use client';

import React from 'react';
import { BookmarkCheck, X } from 'lucide-react';

interface LoadedTemplateBannerProps {
  title: string | null;
  onDismiss: () => void;
}

/**
 * Displays a compact notice when a calculator was pre-filled via a `?template=` share link.
 */
export default function LoadedTemplateBanner({
  title,
  onDismiss,
}: LoadedTemplateBannerProps) {
  if (!title) return null;

  return (
    <div
      role="status"
      className="flex items-center justify-between gap-3 rounded-lg border border-[#C58842]/40 bg-[#FAF5EE] px-4 py-2.5 text-xs text-[#2C221E]"
    >
      <div className="flex items-center gap-2">
        <BookmarkCheck className="h-4 w-4 shrink-0 text-[#C58842]" />
        <span>
          Loaded shared calculation: <strong className="font-semibold">{title}</strong>
        </span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss loaded template notice"
        className="rounded p-0.5 text-[#6E5D54] hover:bg-[#EFEAD8] hover:text-[#2C221E]"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

