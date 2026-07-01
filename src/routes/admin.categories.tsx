import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { toBnDigits } from "@/lib/format";
import { friendlyError } from "@/lib/errorMessage";
import { useCategories } from "@/hooks/useCatalog";
import { useDeleteCategory } from "@/hooks/useAdmin";
import { CategoryFormDialog } from "@/components/admin/CategoryFormDialog";
import { AdminPageHeader } from "@/components/admin/AdminShell";
import { AdminPagination, usePagination } from "@/components/admin/AdminPagination";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Category } from "@/data/categories";

export const Route = createFileRoute("/admin/categories")({
  component: AdminCategories,
});

const PAGE_SIZE = 12;

function AdminCategories() {
  const { data: categories = [] } = useCategories();
  const deleteCategory = useDeleteCategory();
  const [editing, setEditing] = useState<Category | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Category | null>(null);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!q.trim()) return categories;
    const query = q.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(query) || c.nameBn.includes(q));
  }, [categories, q]);

  const { pageItems, page: currentPage, totalPages } = usePagination(filtered, PAGE_SIZE, page);

  useEffect(() => { setPage(1); }, [q]);

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteCategory.mutateAsync(toDelete.slug);
      toast.success("বিভাগ মুছে ফেলা হয়েছে");
    } catch (err) {
      toast.error(friendlyError(err, "মুছতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"));
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="বিভাগসমূহ"
        subtitle={`মোট ${toBnDigits(categories.length)}টি বিভাগ`}
        actions={
          <Button onClick={() => { setEditing(null); setDialogOpen(true); }} className="font-bn">
            <Plus /> নতুন বিভাগ
          </Button>
        }
      />

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="বিভাগ খুঁজুন…"
              className="font-bn pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pageItems.length === 0 && (
          <p className="font-bn col-span-full py-12 text-center text-muted-foreground">কোনো বিভাগ পাওয়া যায়নি।</p>
        )}
        {pageItems.map((c) => (
          <Card key={c.slug} className="overflow-hidden">
            <img src={c.image} alt="" className="h-32 w-full object-cover" />
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h4 className="font-bn truncate font-semibold">{c.name}</h4>
                  <p className="font-bn truncate text-xs text-muted-foreground">{c.nameBn}</p>
                </div>
                <Badge variant="secondary" className="font-bn shrink-0 bg-primary/10 text-primary hover:bg-primary/10">
                  {toBnDigits(c.count)}
                </Badge>
              </div>
              <div className="mt-3 flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => { setEditing(c); setDialogOpen(true); }}
                  aria-label="এডিট"
                >
                  <Pencil className="size-3.5" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => setToDelete(c)}
                  aria-label="মুছুন"
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Card>
          <AdminPagination
            page={currentPage}
            totalPages={totalPages}
            totalItems={filtered.length}
            onPageChange={setPage}
          />
        </Card>
      )}

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
