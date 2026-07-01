import { createServerClient } from "@supabase/ssr";
import { getCookies, setCookie } from "@tanstack/start-server-core";

/** Fresh-per-request server client; only call from within a createServerFn handler. */
export function getSupabaseServerClient() {
  return createServerClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return Object.entries(getCookies()).map(([name, value]) => ({ name, value }));
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            setCookie(name, value, options);
          }
        },
      },
    },
  );
}
