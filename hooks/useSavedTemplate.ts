'use client';

import { useEffect, useRef, useState } from 'react';
import { z } from 'zod';
import { getCalculationTemplate, SavedCalculationRecord } from '@/lib/supabase';

interface UseSavedTemplateOptions<T> {
  calculatorType: SavedCalculationRecord['calculator_type'];
  schema: z.ZodType<T>;
  onApply: (inputs: T) => void;
}

/**
 * Loads and validates a saved calculation template from the `?template=` query parameter.
 * Reads `window.location.search` in an effect so statically prerendered pages need no Suspense wrapper.
 */
export function useSavedTemplate<T>({
  calculatorType,
  schema,
  onApply,
}: UseSavedTemplateOptions<T>) {
  const [loadedTitle, setLoadedTitle] = useState<string | null>(null);
  const onApplyRef = useRef(onApply);
  onApplyRef.current = onApply;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const templateId = new URLSearchParams(window.location.search).get('template');
    if (!templateId) return;

    let cancelled = false;

    getCalculationTemplate(templateId).then((record) => {
      if (cancelled || !record || record.calculator_type !== calculatorType) return;

      const parsed = schema.safeParse(record.inputs);
      if (!parsed.success) return;

      onApplyRef.current(parsed.data);
      setLoadedTitle(record.title || 'Saved Calculation');
    });

    return () => {
      cancelled = true;
    };
  }, [calculatorType, schema]);

  return {
    loadedTemplateTitle: loadedTitle,
    dismissLoadedTemplate: () => setLoadedTitle(null),
  };
}

