import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { useUpsertCategory } from "@/hooks/useAdmin";
import type { Category } from "@/data/categories";

type CategoryForm = Omit<Category, "count">;

const empty = (): CategoryForm => ({
  slug: "",
  name: "",
  nameBn: "",
  description: "",
  image: "",
  accent: "green",
});

export function CategoryFormDialog({
  open,
  onOpenChange,
  category,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
}) {
  const [form, setForm] = useState<CategoryForm>(empty());
  const upsert = useUpsertCategory();

  useEffect(() => {
    setForm(category ?? empty());
  }, [category, open]);

  const set = <K extends keyof CategoryForm>(key: K, value: CategoryForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug || !form.name || !form.image) {
      toast.error("স্লাগ, নাম ও ছবি আবশ্যক");
      return;
    }
    try {
      await upsert.mutateAsync(form);
      toast.success("বিভাগ সংরক্ষিত হয়েছে");
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "সংরক্ষণ ব্যর্থ হয়েছে");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-bn">{category ? "বিভাগ এডিট করুন" : "নতুন বিভাগ"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="font-bn">স্লাগ (URL)</Label>
            <Input value={form.slug} disabled={!!category} onChange={(e) => set("slug", e.target.value)} placeholder="mango" />
          </div>
          <div>
            <Label className="font-bn">নাম (বাংলা)</Label>
            <Input className="font-bn" value={form.nameBn} onChange={(e) => { set("nameBn", e.target.value); set("name", e.target.value); }} />
          </div>
          <div>
            <Label className="font-bn">বিবরণ</Label>
            <Textarea className="font-bn" rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} />
          </div>
          <div>
            <Label className="font-bn">অ্যাকসেন্ট রং</Label>
            <select value={form.accent} onChange={(e) => set("accent", e.target.value as Category["accent"])} className="font-bn h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="green">সবুজ</option>
              <option value="gold">সোনালি</option>
              <option value="lime">লেবু সবুজ</option>
            </select>
          </div>
          <div>
            <Label className="font-bn">ছবি</Label>
            <ImageUploader value={form.image || null} onChange={(url) => set("image", url ?? "")} />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={upsert.isPending} className="font-bn">
              {upsert.isPending ? "সংরক্ষণ হচ্ছে…" : "সংরক্ষণ করুন"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
