import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env.js";

let client: SupabaseClient | null = null;

export function getSupabase() {
  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_ROLE) return null;
  if (!client) {
    client = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE, {
      auth: { persistSession: false }
    });
  }
  return client;
}
