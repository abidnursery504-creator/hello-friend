import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatBDT } from "@/lib/format";
import { useProducts, useCategories } from "@/hooks/useCatalog";
import { useDeleteProduct } from "@/hooks/useAdmin";
import { ProductFormDialog } from "@/components/admin/ProductFormDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const deleteProduct = useDeleteProduct();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Product | null>(null);

  const filtered = q.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()) || p.nameBn.includes(q))
    : products;

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteProduct.mutateAsync(toDelete.slug);
      toast.success("পণ্য মুছে ফেলা হয়েছে");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "মুছতে ব্যর্থ হয়েছে");
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="পণ্য খুঁজুন…"
            className="font-bn flex-1 bg-transparent text-sm focus:outline-none"
          />
        </div>
        <button
          onClick={() => { setEditing(null); setDialogOpen(true); }}
          className="font-bn inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="size-4" /> নতুন পণ্য
        </button>
      </div>
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-xs tracking-wide text-muted-foreground">
            <tr><th className="font-bn px-4 py-3 text-left">পণ্য</th><th className="font-bn px-4 py-3 text-left">বিভাগ</th><th className="font-bn px-4 py-3 text-right">মূল্য</th><th className="font-bn px-4 py-3 text-center">স্টক</th><th className="px-4 py-3"></th></tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((p) => (
              <tr key={p.slug} className="hover:bg-muted/30">
                <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={p.image} alt="" className="size-10 shrink-0 rounded-lg object-cover" /><div className="min-w-0"><div className="font-bn truncate font-medium">{p.name}</div><div className="font-bn truncate text-xs text-muted-foreground">{p.nameBn}</div></div></div></td>
                <td className="px-4 py-3 capitalize text-muted-foreground">{p.category}</td>
                <td className="font-bn px-4 py-3 text-right font-semibold">{formatBDT(p.price)}</td>
                <td className="px-4 py-3 text-center">{p.inStock ? <span className="font-bn rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">স্টকে আছে</span> : <span className="font-bn rounded-full bg-destructive/10 px-2 py-0.5 text-xs text-destructive">শেষ</span>}</td>
                <td className="px-4 py-3 text-right">
                  <div className="inline-flex gap-1">
                    <button onClick={() => { setEditing(p); setDialogOpen(true); }} aria-label="এডিট" className="grid size-8 place-items-center rounded-lg hover:bg-accent"><Pencil className="size-3.5" /></button>
                    <button onClick={() => setToDelete(p)} aria-label="মুছুন" className="grid size-8 place-items-center rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="size-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProductFormDialog open={dialogOpen} onOpenChange={setDialogOpen} product={editing} categories={categories} />

      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bn">পণ্য মুছবেন?</AlertDialogTitle>
            <AlertDialogDescription className="font-bn">
              "{toDelete?.name}" স্থায়ীভাবে মুছে যাবে। এই কাজ পূর্বাবস্থায় ফেরানো যাবে না।
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="font-bn">বাতিল</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="font-bn bg-destructive hover:bg-destructive/90">মুছুন</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
