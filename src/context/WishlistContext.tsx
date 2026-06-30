import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const KEY = "atb_wishlist_v1";

type WishCtx = {
  slugs: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  clear: () => void;
};

const Ctx = createContext<WishCtx | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setSlugs(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(slugs)); } catch {}
  }, [slugs]);

  const has = useCallback((slug: string) => slugs.includes(slug), [slugs]);
  const toggle = useCallback((slug: string) =>
    setSlugs((prev) => prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]), []);
  const clear = useCallback(() => setSlugs([]), []);

  const value = useMemo(() => ({ slugs, has, toggle, clear }), [slugs, has, toggle, clear]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useWishlist = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
};
