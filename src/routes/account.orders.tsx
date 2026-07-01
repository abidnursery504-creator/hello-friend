import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";
import { formatBDT, toBnDigits } from "@/lib/format";
import { useMyOrders } from "@/hooks/useAdmin";
import { Route as AccountRoute } from "./account";

export const Route = createFileRoute("/account/orders")({
  component: Orders,
});

const statusLabel: Record<string, string> = {
  processing: "প্রসেসিং",
  shipped: "শিপড",
  delivered: "ডেলিভারি সম্পন্ন",
  cancelled: "বাতিল",
};

function Orders() {
  const { session } = AccountRoute.useRouteContext();
  const { data: orders = [], isLoading } = useMyOrders(session.id);

  if (!isLoading && orders.length === 0) {
    return (
      <div className="grid place-items-center rounded-3xl border border-dashed py-20 text-center">
        <Package className="mb-3 size-10 text-muted-foreground" />
        <h3 className="font-bn font-display text-lg font-semibold">এখনো কোনো অর্ডার নেই</h3>
        <Link to="/shop" className="font-bn mt-4 inline-flex rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">গাছ দেখুন</Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.id} className="flex flex-col gap-3 rounded-3xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-center">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary"><Package className="size-5" /></span>
          <div className="flex-1 min-w-0">
            <div className="font-semibold">{o.order_number}</div>
            <div className="font-bn text-xs text-muted-foreground">
              {new Date(o.created_at).toLocaleDateString("bn-BD", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>
          <div className="text-right">
            <div className="font-bn font-semibold text-primary">{formatBDT(o.total)}</div>
            <div className={`font-bn text-xs ${o.status === "delivered" ? "text-primary" : o.status === "cancelled" ? "text-destructive" : "text-muted-foreground"}`}>
              {statusLabel[o.status] ?? o.status}
            </div>
          </div>
        </div>
      ))}
      <Link to="/shop" className="font-bn block text-center text-sm text-primary hover:underline">আরও কেনাকাটা করুন</Link>
    </div>
  );
}
