import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getSupabaseServiceRoleClient } from "@/lib/supabase/serviceRole.server";

export const Route = createFileRoute("/api/keep-alive")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const expectedSecret = process.env.CRON_SECRET;
        const authHeader = request.headers.get("authorization");
        if (!expectedSecret || authHeader !== `Bearer ${expectedSecret}`) {
          return new Response(JSON.stringify({ ok: false, error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        const supabase = getSupabaseServiceRoleClient();
        const { error } = await supabase.from("products").select("id").limit(1);

        if (error) {
          return new Response(JSON.stringify({ ok: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
