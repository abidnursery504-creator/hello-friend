import { createFileRoute } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { categories } from "@/data/categories";

export const Route = createFileRoute("/admin/categories")({
  component: () => (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Categories</h3>
        <button className="inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"><Plus className="size-4" /> New category</button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.slug} className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <img src={c.image} alt="" className="h-32 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="truncate font-semibold">{c.name}</h4>
                  <p className="font-bn truncate text-xs text-muted-foreground">{c.nameBn}</p>
                </div>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{c.count}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-full border border-border py-2 text-xs hover:bg-accent"><Pencil className="mx-auto size-3.5" /></button>
                <button className="flex-1 rounded-full border border-border py-2 text-xs text-destructive hover:bg-destructive/10"><Trash2 className="mx-auto size-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
