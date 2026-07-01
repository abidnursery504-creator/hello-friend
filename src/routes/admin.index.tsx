import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Leaf, ShoppingBag, Users } from "lucide-react";
import { formatBDT, toBnDigits } from "@/lib/format";
import { useProducts } from "@/hooks/useCatalog";
import { useOrders, useCustomers } from "@/hooks/useAdmin";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data: products = [] } = useProducts();
  const { data: orders = [] } = useOrders();
  const { data: customers = [] } = useCustomers();

  const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0);
  const topProducts = [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 5);

  const stats = [
    { Icon: DollarSign, l: "মোট আয়", v: formatBDT(revenue) },
    { Icon: ShoppingBag, l: "মোট অর্ডার", v: toBnDigits(orders.length) },
    { Icon: Leaf, l: "চলমান পণ্য", v: toBnDigits(products.length) },
    { Icon: Users, l: "গ্রাহক", v: toBnDigits(customers.length) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(({ Icon, l, v }) => (
          <div key={l} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <Icon className="size-5 text-primary" />
            <div className="font-bn mt-4 font-display text-2xl font-bold">{v}</div>
            <div className="font-bn text-xs text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
        <h3 className="font-bn font-display text-lg font-semibold">শীর্ষ পণ্য (রিভিউ অনুযায়ী)</h3>
        {topProducts.length === 0 ? (
          <p className="font-bn mt-4 text-sm text-muted-foreground">কোনো পণ্য পাওয়া যায়নি।</p>
        ) : (
          <div className="mt-4 divide-y">
            {topProducts.map((p, i) => (
              <div key={p.slug} className="flex items-center gap-4 py-3">
                <span className="font-bn grid size-7 place-items-center rounded-full bg-muted text-xs font-semibold">{toBnDigits(i + 1)}</span>
                <img src={p.image} alt="" className="size-10 shrink-0 rounded-xl object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-bn truncate font-medium">{p.name}</div>
                  <div className="font-bn text-xs text-muted-foreground">{toBnDigits(p.reviews)}টি রিভিউ</div>
                </div>
                <div className="font-bn font-semibold text-primary">{formatBDT(p.price)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
