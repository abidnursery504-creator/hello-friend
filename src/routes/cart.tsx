import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { useCart } from "@/context/CartContext";
import { formatBDT, toBnDigits } from "@/lib/format";
import { calculateShipping } from "@/lib/shipping";
import { useDefaultDeliveryCharge } from "@/hooks/useCatalog";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "আপনার কার্ট — অল ট্রি বিডি শপ" },
      { name: "description", content: "আপনার কার্টের গাছগুলো দেখুন এবং চেকআউটে যান।" },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const { data: defaultDeliveryCharge = 0 } = useDefaultDeliveryCharge();
  const shipping = calculateShipping(items, defaultDeliveryCharge);
  const total = subtotal + shipping;

  return (
    <PageLayout>
      <PageHeader
        crumbs={[{ label: "হোম", to: "/" }, { label: "কার্ট" }]}
        title="আপনার কার্ট"
        subtitle={`${toBnDigits(items.length)}টি পণ্য প্রস্তুত।`}
      />
      <Container className="py-12">
        {items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-dashed py-20 text-center">
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
              <ShoppingBag className="size-6" />
            </div>
            <h2 className="font-bn text-xl font-semibold">আপনার কার্ট খালি</h2>
            <p className="font-bn mt-1 text-sm text-muted-foreground">
              আমাদের বেস্ট সেলার দিয়ে শুরু করুন — ২৪–৪৮ ঘণ্টায় ঘরে পৌঁছে যাবে।
            </p>
            <Link
              to="/shop"
              className="font-bn mt-6 inline-flex rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
            >
              গাছ দেখুন
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {items.map(({ product, qty }) => (
                <div
                  key={product.slug}
                  className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 sm:flex-row sm:items-center"
                >
                  <Link
                    to="/products/$slug"
                    params={{ slug: product.slug }}
                    className="block w-full shrink-0 sm:w-32"
                  >
                    <SmartImage src={product.image} alt={product.name} aspect="square" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      to="/products/$slug"
                      params={{ slug: product.slug }}
                      className="font-bn font-display text-lg font-semibold hover:text-primary"
                    >
                      {product.name}
                    </Link>
                    <p className="font-bn text-sm text-muted-foreground">{product.nameBn}</p>
                    <div className="font-bn mt-1 text-sm text-primary font-semibold">
                      {formatBDT(product.price)}
                    </div>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border p-1">
                      <button
                        onClick={() => setQty(product.slug, qty - 1)}
                        aria-label="কমান"
                        className="grid size-8 place-items-center rounded-full hover:bg-accent"
                      >
                        <Minus className="size-3.5" />
                      </button>
                      <span className="font-bn min-w-7 text-center text-lg font-bold leading-normal text-foreground">
                        {toBnDigits(qty)}
                      </span>
                      <button
                        onClick={() => setQty(product.slug, qty + 1)}
                        aria-label="বাড়ান"
                        className="grid size-8 place-items-center rounded-full hover:bg-accent"
                      >
                        <Plus className="size-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bn font-bold">{formatBDT(product.price * qty)}</span>
                      <button
                        onClick={() => remove(product.slug)}
                        aria-label="মুছুন"
                        className="grid size-9 place-items-center rounded-full text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-28">
              <h3 className="font-bn font-display text-lg font-semibold">অর্ডার সামারি</h3>
              <dl className="font-bn mt-5 space-y-3 text-base">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">সাবটোটাল</dt>
                  <dd className="font-bold tabular-nums text-foreground">{formatBDT(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">ডেলিভারি</dt>
                  <dd className="font-bold tabular-nums text-foreground">
                    {shipping === 0 ? (
                      <span className="text-primary">ফ্রি</span>
                    ) : (
                      formatBDT(shipping)
                    )}
                  </dd>
                </div>
                <div className="flex justify-between border-t pt-3 text-lg">
                  <dt className="font-semibold">মোট</dt>
                  <dd className="font-display text-2xl font-bold tabular-nums text-primary">
                    {formatBDT(total)}
                  </dd>
                </div>
              </dl>
              <Link
                to="/checkout"
                className="font-bn mt-6 flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant"
              >
                চেকআউট করুন
              </Link>
              <Link
                to="/shop"
                className="font-bn mt-2 block text-center text-xs text-muted-foreground hover:text-foreground"
              >
                আরও কেনাকাটা করুন
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </PageLayout>
  );
}
