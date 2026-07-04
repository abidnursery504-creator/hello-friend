import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { formatBDT, toBnDigits } from "@/lib/format";
import { friendlyError } from "@/lib/errorMessage";
import { useProducts, useCategories } from "@/hooks/useCatalog";
import { useDeleteProduct } from "@/hooks/useAdmin";
import { ProductFormDialog } from "@/components/admin/ProductFormDialog";
import { DeliveryChargeCard } from "@/components/admin/DeliveryChargeCard";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/admin/products")({
  component: AdminProducts,
});

function AdminProducts() {
  const { data: products = [] } = useProducts();
  const { data: categories = [] } = useCategories();
  const deleteProduct = useDeleteProduct();
  const [q, setQ] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const PAGE_SIZE = 15;

  const categoryNameBySlug = useMemo(
    () => new Map(categories.map((c) => [c.slug, c.name])),
    [categories],
  );

  const filtered = useMemo(() => {
    let list = products;
    if (categoryFilter !== "all") list = list.filter((p) => p.category === categoryFilter);
    if (q.trim()) {
      const query = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(query) || p.nameBn.includes(q));
    }
    return list;
  }, [products, categoryFilter, q]);

  const { pageItems, page: currentPage, totalPages } = usePagination(filtered, PAGE_SIZE, page);

  useEffect(() => {
    setPage(1);
  }, [q, categoryFilter]);

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteProduct.mutateAsync(toDelete.slug);
      toast.success("পণ্য মুছে ফেলা হয়েছে");
    } catch (err) {
      toast.error(friendlyError(err, "মুছতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"));
    } finally {
      setToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="পণ্য"
        subtitle={`মোট ${toBnDigits(products.length)}টি পণ্য`}
        actions={
          <Button
            onClick={() => {
              setEditing(null);
              setDialogOpen(true);
            }}
            className="font-bn"
          >
            <Plus /> নতুন পণ্য
          </Button>
        }
      />

      <DeliveryChargeCard />

      <Card>
        <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="পণ্য খুঁজুন…"
              className="font-bn pl-9"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="font-bn w-full sm:w-56">
              <SelectValue placeholder="বিভাগ নির্বাচন" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all" className="font-bn">
                সব বিভাগ
              </SelectItem>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug} className="font-bn">
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-bn">পণ্য</TableHead>
              <TableHead className="font-bn">বিভাগ</TableHead>
              <TableHead className="font-bn text-right">মূল্য</TableHead>
              <TableHead className="font-bn text-center">স্টক</TableHead>
              <TableHead className="text-right"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageItems.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="font-bn h-32 text-center text-muted-foreground">
                  কোনো পণ্য পাওয়া যায়নি।
                </TableCell>
              </TableRow>
            ) : (
              pageItems.map((p) => (
                <TableRow key={p.slug}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt=""
                        className="size-10 shrink-0 rounded-lg object-cover"
                      />
                      <div className="min-w-0">
                        <div className="font-bn truncate font-medium">{p.name}</div>
                        <div className="font-bn truncate text-xs text-muted-foreground">
                          {p.nameBn}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-bn text-muted-foreground">
                    <div>{categoryNameBySlug.get(p.category) ?? p.category}</div>
                    {p.freeDelivery ? (
                      <div className="text-xs text-primary">ফ্রি ডেলিভারি</div>
                    ) : p.customDeliveryCharge != null ? (
                      <div className="text-xs text-gold-foreground">
                        কাস্টম চার্জ: {formatBDT(p.customDeliveryCharge)}
                      </div>
                    ) : null}
                  </TableCell>
                  <TableCell className="font-bn text-right font-semibold">
                    {formatBDT(p.price)}
                  </TableCell>
                  <TableCell className="text-center">
                    {p.inStock ? (
                      <Badge
                        variant="secondary"
                        className="font-bn bg-primary/10 text-primary hover:bg-primary/10"
                      >
                        স্টকে আছে
                      </Badge>
                    ) : (
                      <Badge variant="destructive" className="font-bn">
                        শেষ
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="inline-flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditing(p);
                          setDialogOpen(true);
                        }}
                        aria-label="এডিট"
                      >
                        <Pencil className="size-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setToDelete(p)}
                        aria-label="মুছুন"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <AdminPagination
          page={currentPage}
          totalPages={totalPages}
          totalItems={filtered.length}
          onPageChange={setPage}
        />
      </Card>

      <ProductFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editing}
        categories={categories}
      />

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
            <AlertDialogAction
              onClick={handleDelete}
              className="font-bn bg-destructive hover:bg-destructive/90"
            >
              মুছুন
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
