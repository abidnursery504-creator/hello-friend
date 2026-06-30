import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Truck } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { useCart } from "@/context/CartContext";
import { formatBDT } from "@/lib/format";
import { site } from "@/data/site";
import { toast } from "sonner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "Checkout — All Tree BD Shop" }, { name: "robots", content: "noindex" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const shipping = subtotal >= site.shipping.freeAbove ? 0 : items.length ? site.shipping.flatFee : 0;
  const total = subtotal + shipping;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    clear();
    toast.success("Order placed! We'll call you within 30 minutes to confirm.");
  };

  if (done) {
    return (
      <PageLayout>
        <Container className="py-24 text-center">
          <CheckCircle2 className="mx-auto size-16 text-primary" />
          <h1 className="mt-6 font-display text-3xl font-bold">Order placed!</h1>
          <p className="mt-2 text-muted-foreground">A confirmation will reach you on WhatsApp shortly.</p>
          <p className="font-bn mt-1 text-sm text-muted-foreground">আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।</p>
          <button onClick={() => navigate({ to: "/" })} className="mt-8 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground">Back to home</button>
        </Container>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} title="Checkout" subtitle="Cash on delivery available across 64 districts." />
      <Container className="py-12">
        <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <Card title="Contact details">
              <Field label="Full name" required><input required className={fieldCls} placeholder="Md. Imran Hossain" /></Field>
              <Field label="Phone (WhatsApp)" required><input required type="tel" className={fieldCls} placeholder="+880 1XXX-XXXXXX" /></Field>
              <Field label="Email (optional)"><input type="email" className={fieldCls} placeholder="you@email.com" /></Field>
            </Card>

            <Card title="Delivery address">
              <Field label="Street address" required><input required className={fieldCls} placeholder="House 12, Road 4, Dhanmondi" /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City" required><input required className={fieldCls} placeholder="Dhaka" /></Field>
                <Field label="District" required>
                  <select required className={fieldCls} defaultValue="">
                    <option value="" disabled>Select district</option>
                    {["Dhaka", "Chattogram", "Rajshahi", "Khulna", "Sylhet", "Barishal", "Rangpur", "Mymensingh"].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="Notes (optional)"><textarea rows={3} className={fieldCls} placeholder="Landmarks, preferred delivery time…" /></Field>
            </Card>

            <Card title="Payment method">
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-primary bg-primary/5 p-4">
                <input type="radio" name="pay" defaultChecked className="mt-1 accent-primary" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 font-semibold"><Truck className="size-4 text-primary" /> Cash on Delivery</div>
                  <p className="mt-1 text-sm text-muted-foreground">Pay when your plants arrive. Available across all 64 districts.</p>
                </div>
              </label>
            </Card>
          </div>

          <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-28">
            <h3 className="font-display text-lg font-semibold">Your order</h3>
            <ul className="mt-4 space-y-3">
              {items.length === 0 && <p className="text-sm text-muted-foreground">Your cart is empty.</p>}
              {items.map(({ product, qty }) => (
                <li key={product.slug} className="flex items-center gap-3">
                  <SmartImage src={product.image} alt={product.name} aspect="square" className="size-14 shrink-0 rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">× {qty}</p>
                  </div>
                  <span className="text-sm font-semibold">{formatBDT(product.price * qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatBDT(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{shipping === 0 ? <span className="text-primary">Free</span> : formatBDT(shipping)}</dd></div>
              <div className="flex justify-between border-t pt-2 text-base"><dt className="font-semibold">Total</dt><dd className="font-display text-xl font-bold text-primary">{formatBDT(total)}</dd></div>
            </dl>
            <button type="submit" disabled={items.length === 0} className="mt-6 w-full rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant disabled:opacity-50">
              Place order
            </button>
          </aside>
        </form>
      </Container>
    </PageLayout>
  );
}

const fieldCls = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}
