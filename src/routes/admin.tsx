import { createFileRoute, Link, Outlet, redirect, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Leaf, ShoppingBag, Tags, Users } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";
import { getSession } from "@/lib/supabase/auth.server";

export const Route = createFileRoute("/admin")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.role !== "admin") throw redirect({ to: "/account" });
    return { session };
  },
  head: () => ({
    meta: [{ title: "অ্যাডমিন — অল ট্রি বিডি শপ" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "ড্যাশবোর্ড", Icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "পণ্য", Icon: Leaf, exact: false },
  { to: "/admin/categories", label: "বিভাগ", Icon: Tags, exact: false },
  { to: "/admin/orders", label: "অর্ডার", Icon: ShoppingBag, exact: false },
  { to: "/admin/customers", label: "গ্রাহক", Icon: Users, exact: false },
] as const;

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { session } = Route.useRouteContext();
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "অ্যাডমিন" }]}
        title="অ্যাডমিন ড্যাশবোর্ড"
        subtitle="আপনার নার্সারি পরিচালনা — পণ্য, বিভাগ, অর্ডার ও গ্রাহক।"
      />
      <Container className="grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-3xl border border-border bg-card p-3 shadow-soft lg:sticky lg:top-28">
          <div className="rounded-2xl bg-primary/5 p-4">
            <div className="font-bn text-xs tracking-wide text-muted-foreground">লগইন করেছেন</div>
            <div className="font-bn truncate font-semibold">{session.fullName || session.email}</div>
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
        <div><Outlet /></div>
      </Container>
    </PageLayout>
  );
}
