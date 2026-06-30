import { createFileRoute } from "@tanstack/react-router";
import { formatBDT } from "@/lib/format";

const sample = [
  { name: "Rashed Khan", city: "Dhaka", orders: 14, spent: 28400, joined: "Jan 2025" },
  { name: "Sumaiya Akter", city: "Chattogram", orders: 8, spent: 16200, joined: "Mar 2025" },
  { name: "Tanvir Hossain", city: "Rangpur", orders: 21, spent: 54300, joined: "Oct 2024" },
  { name: "Nusrat Jahan", city: "Sylhet", orders: 5, spent: 8900, joined: "Apr 2025" },
];

export const Route = createFileRoute("/admin/customers")({
  component: () => (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
          <tr><th className="px-4 py-3 text-left">Customer</th><th className="px-4 py-3 text-left">City</th><th className="px-4 py-3 text-right">Orders</th><th className="px-4 py-3 text-right">Lifetime spend</th><th className="px-4 py-3 text-right">Joined</th></tr>
        </thead>
        <tbody className="divide-y">
          {sample.map((c) => (
            <tr key={c.name} className="hover:bg-muted/30">
              <td className="px-4 py-3 font-semibold">{c.name}</td>
              <td className="px-4 py-3 text-muted-foreground">{c.city}</td>
              <td className="px-4 py-3 text-right">{c.orders}</td>
              <td className="px-4 py-3 text-right font-semibold text-primary">{formatBDT(c.spent)}</td>
              <td className="px-4 py-3 text-right text-muted-foreground">{c.joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
});
