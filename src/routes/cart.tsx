import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/common/Container";
import { SmartImage } from "@/components/common/SmartImage";
import { useCart } from "@/context/CartContext";
import { formatBDT } from "@/lib/format";
import { site } from "@/data/site";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Your Cart — All Tree BD Shop" }, { name: "description", content: "Review the plants in your cart and proceed to checkout." }],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();
  const shipping = subtotal === 0 ? 0 : subtotal >= site.shipping.freeAbove ? 0 : site.shipping.flatFee;
  const total = subtotal + shipping;

  return (
    <PageLayout>
      <PageHeader crumbs={[{ label: "Home", to: "/" }, { label: "Cart" }]} title="Your cart" subtitle={`${items.length} item${items.length === 1 ? "" : "s"} ready to bloom.`} />
      <Container className="py-12">
        {items.length === 0 ? (
          <div className="mx-auto max-w-md rounded-3xl border border-dashed py-20 text-center">
            <div className="mx-auto mb-4 grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary"><ShoppingBag className="size-6" /></div>
            <h2 className="font-display text-xl font-semibold">Your cart is empty</h2>
            <p className="mt-1 text-sm text-muted-foreground">Start with our bestsellers — they'll be on your doorstep in 24-48 hours.</p>
            <Link to="/shop" className="mt-6 inline-flex rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft">Browse plants</Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
            <div className="space-y-4">
              {items.map(({ product, qty }) => (
                <div key={product.slug} className="flex flex-col gap-4 rounded-3xl border border-border bg-card p-4 sm:flex-row sm:items-center">
                  <Link to="/products/$slug" params={{ slug: product.slug }} className="block w-full shrink-0 sm:w-32">
                    <SmartImage src={product.image} alt={product.name} aspect="square" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to="/products/$slug" params={{ slug: product.slug }} className="font-display text-lg font-semibold hover:text-primary">{product.name}</Link>
                    <p className="font-bn text-sm text-muted-foreground">{product.nameBn}</p>
                    <div className="mt-1 text-sm text-primary font-semibold">{formatBDT(product.price)}</div>
                  </div>
                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <div className="inline-flex items-center gap-2 rounded-full border border-border p-1">
                      <button onClick={() => setQty(product.slug, qty - 1)} aria-label="Decrease" className="grid size-8 place-items-center rounded-full hover:bg-accent"><Minus className="size-3.5" /></button>
                      <span className="min-w-6 text-center text-sm font-semibold">{qty}</span>
                      <button onClick={() => setQty(product.slug, qty + 1)} aria-label="Increase" className="grid size-8 place-items-center rounded-full hover:bg-accent"><Plus className="size-3.5" /></button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">{formatBDT(product.price * qty)}</span>
                      <button onClick={() => remove(product.slug)} aria-label="Remove" className="grid size-9 place-items-center rounded-full text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-3xl border border-border bg-card p-6 shadow-soft lg:sticky lg:top-28">
              <h3 className="font-display text-lg font-semibold">Order summary</h3>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-medium">{formatBDT(subtotal)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="font-medium">{shipping === 0 ? <span className="text-primary">Free</span> : formatBDT(shipping)}</dd></div>
                {subtotal > 0 && subtotal < site.shipping.freeAbove && (
                  <p className="rounded-xl bg-gold/15 p-3 text-xs text-gold-foreground">Add {formatBDT(site.shipping.freeAbove - subtotal)} more for free delivery.</p>
                )}
                <div className="flex justify-between border-t pt-3 text-base"><dt className="font-semibold">Total</dt><dd className="font-display text-xl font-bold text-primary">{formatBDT(total)}</dd></div>
              </dl>
              <Link to="/checkout" className="mt-6 flex w-full items-center justify-center gap-2 rounded-full gradient-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant">
                Proceed to checkout
              </Link>
              <Link to="/shop" className="mt-2 block text-center text-xs text-muted-foreground hover:text-foreground">Continue shopping</Link>
            </aside>
          </div>
        )}
      </Container>
    </PageLayout>
  );
}
