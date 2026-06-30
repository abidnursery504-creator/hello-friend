import { createFileRoute } from "@tanstack/react-router";
import { ArrowDownRight, ArrowUpRight, DollarSign, Leaf, ShoppingBag, Users } from "lucide-react";
import { formatBDT } from "@/lib/format";
import { products } from "@/data/products";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const stats = [
    { Icon: DollarSign, l: "Revenue (30d)", v: formatBDT(284500), change: "+18.4%", up: true },
    { Icon: ShoppingBag, l: "Orders (30d)", v: "342", change: "+12.1%", up: true },
    { Icon: Leaf, l: "Products live", v: String(products.length), change: "+3", up: true },
    { Icon: Users, l: "Customers", v: "1,284", change: "-1.2%", up: false },
  ];
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ Icon, l, v, change, up }) => (
          <div key={l} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <Icon className="size-5 text-primary" />
              <span className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${up ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"}`}>
                {up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />} {change}
              </span>
            </div>
            <div className="mt-4 font-display text-2xl font-bold">{v}</div>
            <div className="text-xs text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-display text-lg font-semibold">Top performers (30 days)</h3>
        <div className="mt-4 divide-y">
          {products.slice(0, 5).map((p, i) => (
            <div key={p.slug} className="flex items-center gap-4 py-3">
              <span className="grid size-7 place-items-center rounded-full bg-muted text-xs font-semibold">{i + 1}</span>
              <img src={p.image} alt="" className="size-10 shrink-0 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <div className="truncate font-medium">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.reviews} reviews</div>
              </div>
              <div className="font-semibold text-primary">{formatBDT(p.price)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
