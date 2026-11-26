import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http')
);

// Fallback-safe client instance
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SavedCalculationRecord {
  id?: string;
  share_id: string;
  calculator_type: 'paypal' | 'stripe' | 'etsy' | 'amazon' | 'shopify' | 'freelance';
  title: string;
  currency: string;
  inputs: Record<string, any>;
  results: Record<string, any>;
  created_at?: string;
}

/**
 * Saves a calculation template either to Supabase or browser localStorage if not configured.
 */
export async function saveCalculationTemplate(data: Omit<SavedCalculationRecord, 'id' | 'created_at'>): Promise<{ success: boolean; shareId: string; error?: string }> {
  try {
    if (supabase && isSupabaseConfigured) {
      const { error } = await supabase.from('saved_calculations').insert([
        {
          share_id: data.share_id,
          calculator_type: data.calculator_type,
          title: data.title,
          currency: data.currency,
          inputs: data.inputs,
          results: data.results,
        },
      ]);

      if (error) {
        console.warn('Supabase save error, falling back to local storage:', error.message);
        fallbackLocalSave(data);
        return { success: true, shareId: data.share_id };
      }
      return { success: true, shareId: data.share_id };
    } else {
      fallbackLocalSave(data);
      return { success: true, shareId: data.share_id };
    }
  } catch (err: any) {
    fallbackLocalSave(data);
    return { success: true, shareId: data.share_id };
  }
}

/**
 * Fetches a saved calculation by share ID
 */
export async function getCalculationTemplate(shareId: string): Promise<SavedCalculationRecord | null> {
  if (!shareId || !/^[a-zA-Z0-9_-]{6,64}$/.test(shareId)) {
    return null;
  }

  try {
    if (supabase && isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('saved_calculations')
        .select('*')
        .eq('share_id', shareId)
        .single();

      if (!error && data) {
        return data as SavedCalculationRecord;
      }
    }
    // Check local storage fallback
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem(`kazcut_calc_${shareId}`);
      if (raw) {
        return JSON.parse(raw);
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Anonymous analytics logging
 */
export async function logCalculationEvent(calculatorType: string, action: string, country = 'GLOBAL') {
  try {
    if (supabase && isSupabaseConfigured) {
      await supabase.from('calculator_analytics').insert([
        {
          calculator_type: calculatorType,
          event_action: action,
          country_code: country,
        },
      ]);
    }
  } catch {
    // Fail silently to never disrupt UX
  }
}

function fallbackLocalSave(data: Omit<SavedCalculationRecord, 'id' | 'created_at'>) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(`kazcut_calc_${data.share_id}`, JSON.stringify({
        ...data,
        created_at: new Date().toISOString(),
      }));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }
}

