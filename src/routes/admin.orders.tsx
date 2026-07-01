import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { formatBDT } from "@/lib/format";
import { useOrders, useUpdateOrderStatus } from "@/hooks/useAdmin";
import type { OrderStatus } from "@/lib/supabase/mutations";

const statusLabel: Record<OrderStatus, string> = {
  processing: "প্রসেসিং",
  shipped: "শিপড",
  delivered: "ডেলিভার্ড",
  cancelled: "বাতিল",
};

const statusColor: Record<OrderStatus, string> = {
  processing: "bg-gold/15 text-gold-foreground",
  shipped: "bg-primary/10 text-primary",
  delivered: "bg-primary text-primary-foreground",
  cancelled: "bg-destructive/10 text-destructive",
};

export const Route = createFileRoute("/admin/orders")({
  component: AdminOrders,
});

function AdminOrders() {
  const { data: orders = [], isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      await updateStatus.mutateAsync({ orderId, status });
      toast.success("অর্ডার স্ট্যাটাস আপডেট হয়েছে");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "আপডেট ব্যর্থ হয়েছে");
    }
  };

  if (!isLoading && orders.length === 0) {
    return (
      <div className="grid place-items-center rounded-3xl border border-dashed py-24 text-center">
        <p className="font-bn text-muted-foreground">এখনো কোনো অর্ডার আসেনি।</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-xs tracking-wide text-muted-foreground">
          <tr><th className="font-bn px-4 py-3 text-left">অর্ডার</th><th className="font-bn px-4 py-3 text-left">গ্রাহক</th><th className="font-bn px-4 py-3 text-left">শহর</th><th className="font-bn px-4 py-3 text-right">মোট</th><th className="font-bn px-4 py-3 text-left">স্ট্যাটাস</th><th className="font-bn px-4 py-3 text-right">তারিখ</th></tr>
        </thead>
        <tbody className="divide-y">
          {orders.map((o) => (
            <tr key={o.id} className="hover:bg-muted/30">
              <td className="px-4 py-3 font-semibold">{o.order_number}</td>
              <td className="font-bn px-4 py-3">{o.customer_name}</td>
              <td className="font-bn px-4 py-3 text-muted-foreground">{o.shipping_city ?? "—"}</td>
              <td className="font-bn px-4 py-3 text-right font-semibold">{formatBDT(o.total)}</td>
              <td className="px-4 py-3">
                <select
                  value={o.status}
                  onChange={(e) => handleStatusChange(o.id, e.target.value as OrderStatus)}
                  className={`font-bn rounded-full border-0 px-2.5 py-1 text-xs font-medium ${statusColor[o.status]}`}
                >
                  {(Object.keys(statusLabel) as OrderStatus[]).map((s) => (
                    <option key={s} value={s}>{statusLabel[s]}</option>
                  ))}
                </select>
              </td>
              <td className="font-bn px-4 py-3 text-right text-muted-foreground">
                {new Date(o.created_at).toLocaleDateString("bn-BD", { day: "numeric", month: "short" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
