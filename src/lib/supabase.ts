import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && key);

export const supabase = isSupabaseConfigured
  ? createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export function digitsOnly(value: string) {
  return (value || '').replace(/[^0-9]/g, '');
}

export function whatsappUrl(number: string, message: string) {
  const n = digitsOnly(number);
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}
