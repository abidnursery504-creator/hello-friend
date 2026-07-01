import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSupabaseServerClient } from "./server";

const orderItemSchema = z.object({
  slug: z.string(),
  name: z.string(),
  image: z.string(),
  price: z.number(),
  qty: z.number().int().positive(),
});

const createOrderSchema = z.object({
  customerName: z.string().min(1),
  customerPhone: z.string().min(1),
  customerEmail: z.string().email().optional().or(z.literal("")),
  shippingAddress: z.string().min(1),
  shippingCity: z.string().optional(),
  shippingDistrict: z.string().optional(),
  shippingNote: z.string().optional(),
  items: z.array(orderItemSchema).min(1),
  subtotal: z.number(),
  shippingFee: z.number(),
  total: z.number(),
});

export const createOrder = createServerFn({ method: "POST" })
  .validator(createOrderSchema)
  .handler(async ({ data }) => {
    const supabase = getSupabaseServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: order, error } = await supabase
      .from("orders")
      .insert({
        user_id: user?.id ?? null,
        customer_name: data.customerName,
        customer_phone: data.customerPhone,
        customer_email: data.customerEmail || null,
        shipping_address: data.shippingAddress,
        shipping_city: data.shippingCity || null,
        shipping_district: data.shippingDistrict || null,
        shipping_note: data.shippingNote || null,
        subtotal: data.subtotal,
        shipping_fee: data.shippingFee,
        total: data.total,
      })
      .select("id, order_number")
      .single();

    if (error) throw new Error(error.message);

    const { error: itemsError } = await supabase.from("order_items").insert(
      data.items.map((item) => ({
        order_id: order.id,
        product_slug: item.slug,
        product_name: item.name,
        product_image: item.image,
        unit_price: item.price,
        qty: item.qty,
      })),
    );

    if (itemsError) throw new Error(itemsError.message);

    return { orderNumber: order.order_number };
  });
