import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle2, LogIn, Truck } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { useCart } from "@/context/CartContext";
import { formatBDT, toBnDigits } from "@/lib/format";
import { site } from "@/data/site";
import { toast } from "sonner";
import { createOrder } from "@/lib/supabase/orders.server";
import { useSession } from "@/hooks/useSession";
import { friendlyError } from "@/lib/errorMessage";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [{ title: "চেকআউট — অল ট্রি বিডি শপ" }, { name: "robots", content: "noindex" }],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const { data: session, isLoading: sessionLoading } = useSession();
  const [done, setDone] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const shipping = subtotal >= site.shipping.freeAbove ? 0 : items.length ? site.shipping.flatFee : 0;
  const total = subtotal + shipping;

  const [form, setForm] = useState({
    name: "", phone: "", email: "", address: "", city: "", district: "", note: "",
  });
  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const mutation = useMutation({
    mutationFn: () =>
      createOrder({
        data: {
          customerName: form.name,
          customerPhone: form.phone,
          customerEmail: form.email,
          shippingAddress: form.address,
          shippingCity: form.city,
          shippingDistrict: form.district,
          shippingNote: form.note,
          items: items.map(({ product, qty }) => ({
            slug: product.slug, name: product.name, image: product.image, price: product.price, qty,
          })),
          subtotal,
          shippingFee: shipping,
          total,
        },
      }),
    onSuccess: (res) => {
      setOrderNumber(res.orderNumber);
      setDone(true);
      clear();
      toast.success("অর্ডার সফল হয়েছে! ৩০ মিনিটের মধ্যে আমরা কল দিয়ে নিশ্চিত করব।");
    },
    onError: (err: Error) => toast.error(friendlyError(err, "অর্ডার ব্যর্থ হয়েছে। আবার চেষ্টা করুন।")),
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (done) {
    return (
      <PageLayout>
        <Container className="py-24 text-center">
          <CheckCircle2 className="mx-auto size-16 text-primary" />
          <h1 className="font-bn mt-6 text-3xl font-bold">অর্ডার সফল হয়েছে!</h1>
          <p className="font-bn mt-2 text-muted-foreground">অর্ডার নম্বর: {orderNumber} · শীঘ্রই হোয়াটসঅ্যাপে নিশ্চিতকরণ পাবেন।</p>
          <button onClick={() => navigate({ to: "/" })} className="font-bn mt-8 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground">হোমে ফিরে যান</button>
        </Container>
      </PageLayout>
    );
  }

  if (!sessionLoading && !session) {
    return (
      <PageLayout>
        <Container className="py-24 text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-primary/10 text-primary">
            <LogIn className="size-7" />
          </div>
          <h1 className="font-bn mt-6 text-2xl font-bold">অর্ডার করতে লগইন করুন</h1>
          <p className="font-bn mt-2 text-muted-foreground">অর্ডার ট্র্যাক করতে ও নিরাপদ চেকআউটের জন্য প্রথমে একাউন্টে লগইন বা তৈরি করুন।</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/login" search={{ redirect: "/checkout" }} className="font-bn rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
              লগইন করুন
            </Link>
            <Link to="/register" className="font-bn rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground hover:bg-accent">
              একাউন্ট তৈরি করুন
            </Link>
          </div>
        </Container>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "হোম", to: "/" }, { label: "কার্ট", to: "/cart" }, { label: "চেকআউট" }]} title="চেকআউট" subtitle="৬৪ জেলায় ক্যাশ অন ডেলিভারি সুবিধা।" />
      <Container className="py-12">
        <form onSubmit={submit} className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <Card title="যোগাযোগের তথ্য">
              <Field label="পুরো নাম" required><input required className={fieldCls} placeholder="মো. ইমরান হোসেন" value={form.name} onChange={set("name")} /></Field>
              <Field label="ফোন (হোয়াটসঅ্যাপ)" required><input required type="tel" className={fieldCls} placeholder="+৮৮০ ১XXX-XXXXXX" value={form.phone} onChange={set("phone")} /></Field>
              <Field label="ইমেইল (ঐচ্ছিক)"><input type="email" className={fieldCls} placeholder="you@email.com" value={form.email} onChange={set("email")} /></Field>
            </Card>

            <Card title="ডেলিভারি ঠিকানা">
              <Field label="বিস্তারিত ঠিকানা" required><input required className={fieldCls} placeholder="বাড়ি ১২, রোড ৪, ধানমন্ডি" value={form.address} onChange={set("address")} /></Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="শহর/উপজেলা" required><input required className={fieldCls} placeholder="ঢাকা" value={form.city} onChange={set("city")} /></Field>
                <Field label="জেলা" required>
                  <select required className={fieldCls} value={form.district} onChange={set("district")}>
                    <option value="" disabled>জেলা নির্বাচন করুন</option>
                    {["ঢাকা", "চট্টগ্রাম", "রাজশাহী", "খুলনা", "সিলেট", "বরিশাল", "রংপুর", "ময়মনসিংহ"].map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
              </div>
              <Field label="অতিরিক্ত নোট (ঐচ্ছিক)"><textarea rows={3} className={fieldCls} placeholder="ল্যান্ডমার্ক, পছন্দের সময়…" value={form.note} onChange={set("note")} /></Field>
            </Card>

            <Card title="পেমেন্ট পদ্ধতি">
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border-2 border-primary bg-primary/5 p-4">
                <input type="radio" name="pay" defaultChecked className="mt-1 accent-primary" />
                <div className="flex-1">
                  <div className="font-bn flex items-center gap-2 font-semibold"><Truck className="size-4 text-primary" /> ক্যাশ অন ডেলিভারি</div>
                  <p className="font-bn mt-1 text-sm text-muted-foreground">গাছ হাতে পেয়ে পেমেন্ট করুন। সারা বাংলাদেশের ৬৪ জেলায় উপলব্ধ।</p>
                </div>
              </label>
            </Card>
          </div>

          <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-28">
            <h3 className="font-bn font-display text-lg font-semibold">আপনার অর্ডার</h3>
            <ul className="mt-4 space-y-3">
              {items.length === 0 && <p className="font-bn text-sm text-muted-foreground">আপনার কার্ট খালি।</p>}
              {items.map(({ product, qty }) => (
                <li key={product.slug} className="flex items-center gap-3">
                  <SmartImage src={product.image} alt={product.name} aspect="square" className="size-14 shrink-0 rounded-xl" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bn truncate text-sm font-medium">{product.name}</p>
                    <p className="font-bn text-xs text-muted-foreground">× {toBnDigits(qty)}</p>
                  </div>
                  <span className="font-bn text-sm font-semibold">{formatBDT(product.price * qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="font-bn mt-5 space-y-2 border-t pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted-foreground">সাবটোটাল</dt><dd>{formatBDT(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">ডেলিভারি</dt><dd>{shipping === 0 ? <span className="text-primary">ফ্রি</span> : formatBDT(shipping)}</dd></div>
              <div className="flex justify-between border-t pt-2 text-base"><dt className="font-semibold">মোট</dt><dd className="font-display text-xl font-bold text-primary">{formatBDT(total)}</dd></div>
            </dl>
            <button type="submit" disabled={items.length === 0 || mutation.isPending} className="font-bn mt-6 w-full rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant disabled:opacity-50">
              {mutation.isPending ? "অর্ডার হচ্ছে…" : "অর্ডার নিশ্চিত করুন"}
            </button>
          </aside>
        </form>
      </Container>
    </PageLayout>
  );
}

const fieldCls = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 font-bn";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h3 className="font-bn font-display text-lg font-semibold">{title}</h3>
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-bn mb-1.5 block text-xs font-medium tracking-wide text-muted-foreground">
        {label} {required && <span className="text-destructive">*</span>}
      </span>
      {children}
    </label>
  );
}
