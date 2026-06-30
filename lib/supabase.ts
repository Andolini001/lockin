import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let cachedClient: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    if (typeof window !== "undefined") {
      console.warn("LOCKIN Supabase не настроен. Приложение работает в mock-режиме.");
    }

    return null;
  }

  if (!cachedClient) {
    cachedClient = createClient(supabaseUrl as string, supabaseAnonKey as string);
  }

  return cachedClient;
}

export const supabase = getSupabaseClient();
