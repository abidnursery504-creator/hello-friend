import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Leaf, Package, ShoppingBag, Tags, Users } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — All Tree BD Shop" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Dashboard", Icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "Products", Icon: Leaf, exact: false },
  { to: "/admin/categories", label: "Categories", Icon: Tags, exact: false },
  { to: "/admin/orders", label: "Orders", Icon: ShoppingBag, exact: false },
  { to: "/admin/customers", label: "Customers", Icon: Users, exact: false },
] as const;

function AdminLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: "Admin" }]}
        title="Admin dashboard"
        subtitle="Manage your nursery — products, categories, orders and customers."
      />
      <Container className="grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-3xl border border-border bg-card p-3 shadow-soft lg:sticky lg:top-28">
          <div className="rounded-2xl bg-primary/5 p-4">
            <div className="text-xs uppercase tracking-wide text-muted-foreground">Logged in as</div>
            <div className="font-semibold">Admin · Demo</div>
          </div>
          <nav className="mt-2 space-y-0.5">
            {nav.map(({ to, label, Icon, exact }) => {
              const active = exact ? pathname === to : pathname.startsWith(to);
              return (
                <Link key={to} to={to} className={cn("flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition", active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent")}>
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
