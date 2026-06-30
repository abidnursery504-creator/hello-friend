import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Heart, Home, MapPin, Package, User } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [{ title: "My Account — All Tree BD Shop" }, { name: "robots", content: "noindex" }],
  }),
  component: AccountLayout,
});

const nav = [
  { to: "/account", label: "Overview", Icon: Home, exact: true },
  { to: "/account/orders", label: "Orders", Icon: Package, exact: false },
  { to: "/account/wishlist", label: "Wishlist", Icon: Heart, exact: false },
  { to: "/account/addresses", label: "Addresses", Icon: MapPin, exact: false },
] as const;

function AccountLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "Home", to: "/" }, { label: "Account" }]}
        title="My account"
        subtitle="Manage your orders, wishlist and addresses."
      />
      <Container className="grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
        <aside className="h-fit rounded-3xl border border-border bg-card p-3 shadow-soft lg:sticky lg:top-28">
          <div className="flex items-center gap-3 rounded-2xl bg-primary/5 p-3">
            <span className="grid size-10 place-items-center rounded-full gradient-primary text-primary-foreground"><User className="size-4" /></span>
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold">Guest user</div>
              <Link to="/login" className="text-xs text-primary hover:underline">Sign in</Link>
            </div>
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
        <div>
          <Outlet />
        </div>
      </Container>
    </PageLayout>
  );
}
