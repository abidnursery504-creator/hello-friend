import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Plus } from "lucide-react";

export const Route = createFileRoute("/account/addresses")({
  component: Addresses,
});

const sample = [
  { label: "Home", line: "House 12, Road 4, Dhanmondi, Dhaka", phone: "+880 1700-000000", default: true },
  { label: "Office", line: "Plot 7, Gulshan-2, Dhaka", phone: "+880 1700-000000" },
];

function Addresses() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {sample.map((a) => (
          <div key={a.label} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold"><MapPin className="size-4 text-primary" /> {a.label}</div>
              {a.default && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-primary">Default</span>}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{a.line}</p>
            <p className="text-sm text-muted-foreground">{a.phone}</p>
            <div className="mt-4 flex gap-2 text-sm">
              <button className="rounded-full border border-border px-4 py-1.5 hover:bg-accent">Edit</button>
              {!a.default && <button className="rounded-full border border-border px-4 py-1.5 hover:bg-accent">Set default</button>}
            </div>
          </div>
        ))}
        <button className="grid place-items-center rounded-3xl border-2 border-dashed border-border p-8 text-sm text-muted-foreground transition hover:border-primary hover:text-primary">
          <Plus className="mb-2 size-6" /> Add new address
        </button>
      </div>
    </div>
  );
}
