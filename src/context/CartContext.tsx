import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/data/products";

export type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  subtotal: number;
  totalQty: number;
};

const Ctx = createContext<CartCtx | null>(null);

const KEY = "atb_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? localStorage.getItem(KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items]);

  const add = useCallback((p: Product, qty = 1) => {
    setItems((prev) => {
      const i = prev.findIndex((x) => x.product.slug === p.slug);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: next[i].qty + qty };
        return next;
      }
      return [...prev, { product: p, qty }];
    });
  }, []);

  const remove = useCallback((slug: string) =>
    setItems((prev) => prev.filter((x) => x.product.slug !== slug)), []);

  const setQty = useCallback((slug: string, qty: number) =>
    setItems((prev) => prev.map((x) =>
      x.product.slug === slug ? { ...x, qty: Math.max(1, qty) } : x
    )), []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((s, x) => s + x.product.price * x.qty, 0),
    [items],
  );
  const totalQty = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items]);

  const value = useMemo(
    () => ({ items, add, remove, setQty, clear, subtotal, totalQty }),
    [items, add, remove, setQty, clear, subtotal, totalQty],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
