import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Package, ShoppingBag } from "lucide-react";

export const Route = createFileRoute("/account/")({
  component: AccountOverview,
});

function AccountOverview() {
  const tiles = [
    { Icon: Package, t: "0", l: "Active orders", to: "/account/orders" },
    { Icon: ShoppingBag, t: "12", l: "Lifetime orders", to: "/account/orders" },
    { Icon: Heart, t: "5", l: "Wishlist items", to: "/account/wishlist" },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        {tiles.map(({ Icon, t, l, to }) => (
          <Link key={l} to={to} className="rounded-3xl border border-border bg-card p-6 shadow-soft transition hover-lift">
            <Icon className="size-6 text-primary" />
            <div className="mt-3 font-display text-3xl font-bold">{t}</div>
            <div className="text-sm text-muted-foreground">{l}</div>
          </Link>
        ))}
      </div>
      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-lg font-semibold">Welcome back 🌿</h3>
        <p className="mt-2 text-sm text-muted-foreground">Start exploring our new monsoon collection or pick up where you left off.</p>
        <Link to="/shop" className="mt-4 inline-flex rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Browse plants</Link>
      </div>
    </div>
  );
}
