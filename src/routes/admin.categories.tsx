import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { toBnDigits } from "@/lib/format";
import { useCategories } from "@/hooks/useCatalog";
import { useDeleteCategory } from "@/hooks/useAdmin";
import { CategoryFormDialog } from "@/components/admin/CategoryFormDialog";
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
import type { Category } from "@/data/categories";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const { data: categories = [] } = useCategories();
  const deleteCategory = useDeleteCategory();
  const [editing, setEditing] = useState<Category | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Category | null>(null);

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteCategory.mutateAsync(toDelete.slug);
      toast.success("বিভাগ মুছে ফেলা হয়েছে");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "মুছতে ব্যর্থ হয়েছে");
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-bn font-display text-lg font-semibold">বিভাগসমূহ</h3>
        <button
          onClick={() => { setEditing(null); setDialogOpen(true); }}
          className="font-bn inline-flex items-center gap-2 rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
        >
          <Plus className="size-4" /> নতুন বিভাগ
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <div key={c.slug} className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
            <img src={c.image} alt="" className="h-32 w-full object-cover" />
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-bn truncate font-semibold">{c.name}</h4>
                  <p className="font-bn truncate text-xs text-muted-foreground">{c.nameBn}</p>
                </div>
                <span className="font-bn rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">{toBnDigits(c.count)}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={() => { setEditing(c); setDialogOpen(true); }} aria-label="এডিট" className="flex-1 rounded-full border border-border py-2 text-xs hover:bg-accent"><Pencil className="mx-auto size-3.5" /></button>
                <button onClick={() => setToDelete(c)} aria-label="মুছুন" className="flex-1 rounded-full border border-border py-2 text-xs text-destructive hover:bg-destructive/10"><Trash2 className="mx-auto size-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CategoryFormDialog open={dialogOpen} onOpenChange={setDialogOpen} category={editing} />

      <AlertDialog open={!!toDelete} onOpenChange={(open) => !open && setToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-bn">বিভাগ মুছবেন?</AlertDialogTitle>
            <AlertDialogDescription className="font-bn">
              "{toDelete?.name}" স্থায়ীভাবে মুছে যাবে। এই বিভাগের পণ্যগুলো অবিভাগ হয়ে যাবে না — মুছার আগে পণ্যগুলো অন্য বিভাগে সরিয়ে নিন।
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
