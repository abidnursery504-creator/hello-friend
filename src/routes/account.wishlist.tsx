import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useProducts } from "@/hooks/useCatalog";
import { ProductCard } from "@/components/common/ProductCard";

export const Route = createFileRoute("/account/wishlist")({
  component: WishlistPage,
});

function WishlistPage() {
  const { slugs } = useWishlist();
  const { data: products = [] } = useProducts();
  const items = products.filter((p) => slugs.includes(p.slug));
  if (items.length === 0) {
    return (
      <div className="grid place-items-center rounded-3xl border border-dashed py-20 text-center">
        <Heart className="mb-3 size-10 text-muted-foreground" />
        <h3 className="font-bn font-display text-lg font-semibold">আপনার ইচ্ছার তালিকা খালি</h3>
        <p className="font-bn mt-1 text-sm text-muted-foreground">যেকোনো গাছের হৃদয় আইকনে চাপ দিয়ে এখানে সংরক্ষণ করুন।</p>
        <Link to="/shop" className="font-bn mt-4 inline-flex rounded-full gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">গাছ দেখুন</Link>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3">
      {items.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
    </div>
  );
}
