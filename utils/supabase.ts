import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "Supabase environment variables are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file."
  );
}

// Create a mock client for development when env vars are missing
const createMockClient = () => {
  return {
    auth: {
      signUp: () =>
        Promise.resolve({
          data: null,
          error: { message: "Supabase not configured" },
        }),
      signInWithPassword: () =>
        Promise.resolve({
          data: null,
          error: { message: "Supabase not configured" },
        }),
      getSession: () =>
        Promise.resolve({ data: { session: null }, error: null }),
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signInWithOAuth: () =>
        Promise.resolve({
          data: { provider: null, url: null },
          error: { message: "Supabase not configured" },
        }),
    },
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({
        data: null,
        error: { message: "Supabase not configured" },
      }),
      update: () => ({
        data: null,
        error: { message: "Supabase not configured" },
      }),
      delete: () => ({
        data: null,
        error: { message: "Supabase not configured" },
      }),
    }),
  };
};

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: {
          persistSession: true, // ✅ store session in localStorage
          autoRefreshToken: true, // ✅ refresh token automatically
          detectSessionInUrl: true,
        },
      })
    : createMockClient();
