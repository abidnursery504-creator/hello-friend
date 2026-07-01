import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Plus } from "lucide-react";
import { toast } from "sonner";
import { friendlyError } from "@/lib/errorMessage";
import { useAddresses, useUpsertAddress, useDeleteAddress, useSetDefaultAddress } from "@/hooks/useAdmin";
import { Route as AccountRoute } from "./account";
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

export const Route = createFileRoute("/account/addresses")({
  component: Addresses,
});

function Addresses() {
  const { session } = AccountRoute.useRouteContext();
  const { data: addresses = [] } = useAddresses(session.id);
  const upsert = useUpsertAddress(session.id);
  const remove = useDeleteAddress(session.id);
  const setDefault = useSetDefaultAddress(session.id);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ label: "", line: "", city: "", district: "", phone: "" });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await upsert.mutateAsync({ userId: session.id, isDefault: addresses.length === 0, ...form });
      toast.success("ঠিকানা যোগ হয়েছে");
      setOpen(false);
      setForm({ label: "", line: "", city: "", district: "", phone: "" });
    } catch (err) {
      toast.error(friendlyError(err, "যোগ করতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"));
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((a) => (
          <div key={a.id} className="rounded-3xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div className="font-bn flex items-center gap-2 font-semibold"><MapPin className="size-4 text-primary" /> {a.label}</div>
              {a.is_default && <span className="font-bn rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">ডিফল্ট</span>}
            </div>
            <p className="font-bn mt-3 text-sm text-muted-foreground">{a.line}, {a.city}, {a.district}</p>
            <p className="font-bn text-sm text-muted-foreground">{a.phone}</p>
            <div className="font-bn mt-4 flex gap-2 text-sm">
              {!a.is_default && (
                <button onClick={() => setDefault.mutate(a.id)} className="rounded-full border border-border px-4 py-1.5 hover:bg-accent">ডিফল্ট করুন</button>
              )}
              <button onClick={() => remove.mutate(a.id)} className="rounded-full border border-border px-4 py-1.5 text-destructive hover:bg-destructive/10">মুছুন</button>
            </div>
          </div>
        ))}
        <button onClick={() => setOpen(true)} className="font-bn grid place-items-center rounded-3xl border-2 border-dashed border-border p-8 text-sm text-muted-foreground transition hover:border-primary hover:text-primary">
          <Plus className="mb-2 size-6" /> নতুন ঠিকানা যোগ করুন
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-bn">নতুন ঠিকানা</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <Label className="font-bn">লেবেল</Label>
              <Input className="font-bn" required value={form.label} onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))} placeholder="বাসা / অফিস" />
            </div>
            <div>
              <Label className="font-bn">বিস্তারিত ঠিকানা</Label>
              <Input className="font-bn" required value={form.line} onChange={(e) => setForm((f) => ({ ...f, line: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-bn">শহর</Label>
                <Input className="font-bn" required value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))} />
              </div>
              <div>
                <Label className="font-bn">জেলা</Label>
                <Input className="font-bn" required value={form.district} onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))} />
              </div>
            </div>
            <div>
              <Label className="font-bn">ফোন</Label>
              <Input required value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} />
            </div>
            <DialogFooter>
              <Button type="submit" disabled={upsert.isPending} className="font-bn">
                {upsert.isPending ? "যোগ হচ্ছে…" : "যোগ করুন"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
