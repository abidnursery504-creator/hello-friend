import { useEffect, useState } from "react";
import { Truck } from "lucide-react";
import { toast } from "sonner";
import { friendlyError } from "@/lib/errorMessage";
import { useDefaultDeliveryCharge } from "@/hooks/useCatalog";
import { useUpdateDefaultDeliveryCharge } from "@/hooks/useAdmin";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export function DeliveryChargeCard() {
  const { data: currentCharge } = useDefaultDeliveryCharge();
  const updateCharge = useUpdateDefaultDeliveryCharge();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (currentCharge != null) setValue(String(currentCharge));
  }, [currentCharge]);

  const handleSave = async () => {
    const amount = Number(value);
    if (!Number.isFinite(amount) || amount < 0) {
      toast.error("সঠিক একটি টাকার পরিমাণ দিন");
      return;
    }
    try {
      await updateCharge.mutateAsync(amount);
      toast.success("ডেলিভারি চার্জ আপডেট হয়েছে");
    } catch (err) {
      toast.error(friendlyError(err, "আপডেট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"));
    }
  };

  return (
    <Card>
      <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
        <div className="flex items-center gap-2 sm:w-56">
          <Truck className="size-4 text-primary" />
          <div>
            <Label className="font-bn">সাধারণ ডেলিভারি চার্জ (৳)</Label>
            <p className="font-bn text-xs text-muted-foreground">সব পণ্যে প্রযোজ্য ডিফল্ট চার্জ</p>
          </div>
        </div>
        <Input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="sm:w-40"
        />
        <Button onClick={handleSave} disabled={updateCharge.isPending} className="font-bn">
          {updateCharge.isPending ? "সংরক্ষণ হচ্ছে…" : "সংরক্ষণ করুন"}
        </Button>
      </CardContent>
    </Card>
  );
}
