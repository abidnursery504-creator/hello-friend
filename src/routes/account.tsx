import { createFileRoute, Link, Outlet, redirect, useRouterState } from "@tanstack/react-router";
import { Heart, Home, LogOut, MapPin, Package, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { getSession, signOut } from "@/lib/supabase/auth.server";
import { useInvalidateSession } from "@/hooks/useSession";
import { useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/account")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/login" });
    return { session };
  },
  head: () => ({
    meta: [{ title: "আমার একাউন্ট — অল ট্রি বিডি শপ" }, { name: "robots", content: "noindex" }],
  }),
  component: AccountLayout,
});

const nav = [
  { to: "/account", label: "ওভারভিউ", Icon: Home, exact: true },
  { to: "/account/orders", label: "অর্ডার", Icon: Package, exact: false },
  { to: "/account/wishlist", label: "ইচ্ছার তালিকা", Icon: Heart, exact: false },
  { to: "/account/addresses", label: "ঠিকানা", Icon: MapPin, exact: false },
] as const;

function AccountLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { session } = Route.useRouteContext();
  const router = useRouter();
  const invalidateSession = useInvalidateSession();
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "একাউন্ট" }]}
        title="আমার একাউন্ট"
        subtitle="অর্ডার, পছন্দের তালিকা ও ঠিকানা পরিচালনা করুন।"
      />
      <Container className="grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-3xl border border-border bg-card p-3 shadow-soft lg:sticky lg:top-28">
          <div className="flex items-center gap-3 rounded-2xl bg-primary/5 p-3">
            <span className="grid size-10 place-items-center rounded-full gradient-primary text-primary-foreground"><User className="size-4" /></span>
            <div className="min-w-0 flex-1">
              <div className="font-bn truncate text-sm font-semibold">{session.fullName || session.email}</div>
              <button
                onClick={async () => { await signOut(); invalidateSession(); router.invalidate(); }}
                className="font-bn inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
              >
                <LogOut className="size-3" /> লগআউট
              </button>
            </div>
          </div>
          <nav className="mt-2 space-y-0.5">
            {nav.map(({ to, label, Icon, exact }) => {
              const active = exact ? pathname === to : pathname.startsWith(to);
              return (
                <Link key={to} to={to} className={cn("font-bn flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition", active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent")}>
                  <Icon className="size-4" /> {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div>
          <Outlet />
        </div>
      </Container>
    </PageLayout>
  );
}
