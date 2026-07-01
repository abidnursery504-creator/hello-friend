import { createFileRoute } from "@tanstack/react-router";
import { formatBDT, toBnDigits } from "@/lib/format";
import { useCustomers } from "@/hooks/useAdmin";

export const Route = createFileRoute("/admin/customers")({
  component: AdminCustomers,
});

function AdminCustomers() {
  const { data: customers = [], isLoading } = useCustomers();

  if (!isLoading && customers.length === 0) {
    return (
      <div className="grid place-items-center rounded-3xl border border-dashed py-24 text-center">
        <p className="font-bn text-muted-foreground">এখনো কোনো গ্রাহক নেই — প্রথম অর্ডারের পর এখানে দেখা যাবে।</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-xs tracking-wide text-muted-foreground">
          <tr><th className="font-bn px-4 py-3 text-left">গ্রাহক</th><th className="font-bn px-4 py-3 text-left">শহর</th><th className="font-bn px-4 py-3 text-right">অর্ডার</th><th className="font-bn px-4 py-3 text-right">মোট খরচ</th><th className="font-bn px-4 py-3 text-right">প্রথম অর্ডার</th></tr>
        </thead>
        <tbody className="divide-y">
          {customers.map((c) => (
            <tr key={c.customer_key} className="hover:bg-muted/30">
              <td className="font-bn px-4 py-3 font-semibold">{c.name}</td>
              <td className="font-bn px-4 py-3 text-muted-foreground">{c.city ?? "—"}</td>
              <td className="font-bn px-4 py-3 text-right">{toBnDigits(c.order_count)}</td>
              <td className="font-bn px-4 py-3 text-right font-semibold text-primary">{formatBDT(c.total_spent)}</td>
              <td className="font-bn px-4 py-3 text-right text-muted-foreground">
                {new Date(c.first_order_at).toLocaleDateString("bn-BD", { year: "numeric", month: "short" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
