import { createClient } from "@supabase/supabase-js";

// @ts-ignore
const rawUrl = import.meta.env.VITE_SUPABASE_URL || "";
// @ts-ignore
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Sanitize the URL in case it has /rest/v1 or /rest/v1/ appended
let supabaseUrl = rawUrl.trim();
if (supabaseUrl.endsWith("/rest/v1/")) {
  supabaseUrl = supabaseUrl.slice(0, -9);
} else if (supabaseUrl.endsWith("/rest/v1")) {
  supabaseUrl = supabaseUrl.slice(0, -8);
}

// Ensure no trailing slash
if (supabaseUrl.endsWith("/")) {
  supabaseUrl = supabaseUrl.slice(0, -1);
}

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes("your_supabase_project_url_here") || supabaseAnonKey.includes("your_supabase_anon_key_here")) {
  throw new Error(
    "Supabase configuration is missing or holds placeholder credentials. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set correctly in your environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
