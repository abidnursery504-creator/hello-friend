import { useEffect, useState } from "react";
import { toast } from "sonner";
import { friendlyError } from "@/lib/errorMessage";
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
import { Switch } from "@/components/ui/switch";
import { ImageUploader, MultiImageUploader } from "@/components/admin/ImageUploader";
import { useUpsertProduct } from "@/hooks/useAdmin";
import type { Product } from "@/data/products";
import type { Category } from "@/data/categories";

const emptyProduct = (): Product => ({
  slug: "",
  name: "",
  nameBn: "",
  category: "",
  price: 0,
  rating: 4.5,
  reviews: 0,
  image: "",
  gallery: [],
  badges: [],
  shortDescription: "",
  description: "",
  height: "",
  age: "",
  potIncluded: true,
  inStock: true,
  careLevel: "সহজ",
  sunlight: "পূর্ণ রোদ",
  water: "মাঝারি",
  freeDelivery: false,
});

export function ProductFormDialog({
  open,
  onOpenChange,
  product,
  categories,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
  categories: Category[];
}) {
  const [form, setForm] = useState<Product>(emptyProduct());
  const upsert = useUpsertProduct();

  useEffect(() => {
    setForm(product ?? emptyProduct());
  }, [product, open]);

  const set = <K extends keyof Product>(key: K, value: Product[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.slug || !form.name || !form.category || !form.image) {
      toast.error("স্লাগ, নাম, বিভাগ ও ছবি আবশ্যক");
      return;
    }
    try {
      await upsert.mutateAsync(form);
      toast.success("পণ্য সংরক্ষিত হয়েছে");
      onOpenChange(false);
    } catch (err) {
      toast.error(friendlyError(err, "সংরক্ষণ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-bn">{product ? "পণ্য এডিট করুন" : "নতুন পণ্য"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="font-bn">স্লাগ (URL)</Label>
              <Input
                value={form.slug}
                disabled={!!product}
                onChange={(e) => set("slug", e.target.value)}
                placeholder="amrapali-mango-grafted"
              />
            </div>
            <div>
              <Label className="font-bn">বিভাগ</Label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className="font-bn h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="">নির্বাচন করুন</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="font-bn">নাম (বাংলা)</Label>
              <Input
                className="font-bn"
                value={form.nameBn}
                onChange={(e) => {
                  set("nameBn", e.target.value);
                  set("name", e.target.value);
                }}
              />
            </div>
            <div>
              <Label className="font-bn">মূল্য (৳)</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => set("price", Number(e.target.value))}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="font-bn">পুরনো মূল্য (ঐচ্ছিক)</Label>
              <Input
                type="number"
                value={form.oldPrice ?? ""}
                onChange={(e) =>
                  set("oldPrice", e.target.value ? Number(e.target.value) : undefined)
                }
              />
            </div>
            <div>
              <Label className="font-bn">উচ্চতা</Label>
              <Input
                className="font-bn"
                value={form.height}
                onChange={(e) => set("height", e.target.value)}
                placeholder="২-৩ ফুট"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <Label className="font-bn">বয়স</Label>
              <Input
                className="font-bn"
                value={form.age}
                onChange={(e) => set("age", e.target.value)}
                placeholder="১ বছর"
              />
            </div>
            <div>
              <Label className="font-bn">পরিচর্যা</Label>
              <select
                value={form.careLevel}
                onChange={(e) => set("careLevel", e.target.value as Product["careLevel"])}
                className="font-bn h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="সহজ">সহজ</option>
                <option value="মাঝারি">মাঝারি</option>
                <option value="এক্সপার্ট">এক্সপার্ট</option>
              </select>
            </div>
            <div>
              <Label className="font-bn">সূর্যালোক</Label>
              <select
                value={form.sunlight}
                onChange={(e) => set("sunlight", e.target.value as Product["sunlight"])}
                className="font-bn h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                <option value="পূর্ণ রোদ">পূর্ণ রোদ</option>
                <option value="আংশিক ছায়া">আংশিক ছায়া</option>
                <option value="ইনডোর উজ্জ্বল">ইনডোর উজ্জ্বল</option>
              </select>
            </div>
          </div>

          <div>
            <Label className="font-bn">সংক্ষিপ্ত বিবরণ</Label>
            <Input
              className="font-bn"
              value={form.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)}
            />
          </div>
          <div>
            <Label className="font-bn">বিস্তারিত বিবরণ</Label>
            <Textarea
              className="font-bn"
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <Switch checked={form.inStock} onCheckedChange={(v) => set("inStock", v)} />
              <span className="font-bn text-sm">স্টকে আছে</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch checked={form.potIncluded} onCheckedChange={(v) => set("potIncluded", v)} />
              <span className="font-bn text-sm">পাত্র অন্তর্ভুক্ত</span>
            </label>
            <label className="flex items-center gap-2">
              <Switch
                checked={form.freeDelivery ?? false}
                onCheckedChange={(v) => set("freeDelivery", v)}
              />
              <span className="font-bn text-sm">ফ্রি ডেলিভারি</span>
            </label>
          </div>

          <div>
            <Label className="font-bn">কাস্টম ডেলিভারি চার্জ (৳, ঐচ্ছিক)</Label>
            <Input
              type="number"
              disabled={form.freeDelivery}
              value={form.customDeliveryCharge ?? ""}
              onChange={(e) =>
                set("customDeliveryCharge", e.target.value ? Number(e.target.value) : undefined)
              }
              placeholder="খালি রাখলে সাধারণ ডেলিভারি চার্জ প্রযোজ্য হবে"
            />
            <p className="font-bn mt-1 text-xs text-muted-foreground">
              শুধু তখনই কাজ করবে যদি এটি সাধারণ ডেলিভারি চার্জের চেয়ে বেশি হয়।
            </p>
          </div>

          <div>
            <Label className="font-bn">প্রধান ছবি</Label>
            <ImageUploader value={form.image || null} onChange={(url) => set("image", url ?? "")} />
          </div>
          <div>
            <Label className="font-bn">গ্যালারি</Label>
            <MultiImageUploader value={form.gallery} onChange={(urls) => set("gallery", urls)} />
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
