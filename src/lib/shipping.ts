import type { CartItem } from "@/context/CartContext";

const BULK_QTY_THRESHOLD = 12;
const BULK_CHARGE = 500;

/**
 * Delivery charge rules (agreed with the client):
 * 1. Total quantity across the cart > 12 → flat ৳500, overrides everything else.
 * 2. Otherwise, if every item in the cart is flagged free-delivery → ৳0.
 * 3. Otherwise, the charge is the default delivery charge, unless a
 *    non-free item has a custom delivery charge higher than the default —
 *    in that case the highest custom charge wins.
 */
export function calculateShipping(items: CartItem[], defaultCharge: number): number {
  if (items.length === 0) return 0;

  const totalQty = items.reduce((sum, { qty }) => sum + qty, 0);
  if (totalQty > BULK_QTY_THRESHOLD) return BULK_CHARGE;

  const allFree = items.every(({ product }) => product.freeDelivery);
  if (allFree) return 0;

  const highestCustomCharge = items.reduce((max, { product }) => {
    if (product.freeDelivery || product.customDeliveryCharge == null) return max;
    return Math.max(max, product.customDeliveryCharge);
  }, 0);

  return Math.max(defaultCharge, highestCustomCharge);
}
