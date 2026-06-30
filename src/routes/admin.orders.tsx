import { createFileRoute } from "@tanstack/react-router";
import { formatBDT } from "@/lib/format";

const sample = [
  { id: "ATB-10312", customer: "Rashed Khan", city: "Dhaka", total: 1290, status: "Processing", date: "Jun 28" },
  { id: "ATB-10311", customer: "Sumaiya Akter", city: "Chattogram", total: 2840, status: "Shipped", date: "Jun 27" },
  { id: "ATB-10310", customer: "Tanvir Hossain", city: "Rangpur", total: 4520, status: "Delivered", date: "Jun 25" },
  { id: "ATB-10309", customer: "Nusrat Jahan", city: "Sylhet", total: 890, status: "Delivered", date: "Jun 24" },
  { id: "ATB-10308", customer: "Imran Ali", city: "Khulna", total: 1560, status: "Cancelled", date: "Jun 23" },
];

const statusColor: Record<string, string> = {
  Processing: "bg-gold/15 text-gold-foreground",
  Shipped: "bg-primary/10 text-primary",
  Delivered: "bg-primary text-primary-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
};

export const Route = createFileRoute("/admin/orders")({
  component: () => (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
          <tr><th className="px-4 py-3 text-left">Order</th><th className="px-4 py-3 text-left">Customer</th><th className="px-4 py-3 text-left">City</th><th className="px-4 py-3 text-right">Total</th><th className="px-4 py-3 text-left">Status</th><th className="px-4 py-3 text-right">Date</th></tr>
        </thead>
        <tbody className="divide-y">
          {sample.map((o) => (
            <tr key={o.id} className="hover:bg-muted/30">
              <td className="px-4 py-3 font-semibold">{o.id}</td>
              <td className="px-4 py-3">{o.customer}</td>
              <td className="px-4 py-3 text-muted-foreground">{o.city}</td>
              <td className="px-4 py-3 text-right font-semibold">{formatBDT(o.total)}</td>
              <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[o.status]}`}>{o.status}</span></td>
              <td className="px-4 py-3 text-right text-muted-foreground">{o.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
});
