import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, fetchMyOrders, fetchCustomers, fetchAddresses } from "@/lib/supabase/queries";
import { catalogKeys } from "./useCatalog";
import {
  upsertProduct,
  deleteProduct,
  upsertCategory,
  deleteCategory,
  updateOrderStatus,
  upsertAddress,
  deleteAddress,
  setDefaultAddress,
  type ProductInput,
  type CategoryInput,
  type OrderStatus,
  type AddressInput,
} from "@/lib/supabase/mutations";

export const adminKeys = {
  orders: () => ["orders"] as const,
  myOrders: (userId: string) => ["orders", "mine", userId] as const,
  customers: () => ["customers"] as const,
  addresses: (userId: string) => ["addresses", userId] as const,
};

export const useOrders = () => useQuery({ queryKey: adminKeys.orders(), queryFn: fetchOrders });

export const useMyOrders = (userId: string) =>
  useQuery({ queryKey: adminKeys.myOrders(userId), queryFn: () => fetchMyOrders(userId), enabled: !!userId });

export const useCustomers = () => useQuery({ queryKey: adminKeys.customers(), queryFn: fetchCustomers });

export function useUpsertProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: ProductInput) => upsertProduct(p),
    onSuccess: () => qc.invalidateQueries({ queryKey: catalogKeys.products() }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => deleteProduct(slug),
    onSuccess: () => qc.invalidateQueries({ queryKey: catalogKeys.products() }),
  });
}

export function useUpsertCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (c: CategoryInput) => upsertCategory(c),
    onSuccess: () => qc.invalidateQueries({ queryKey: catalogKeys.categories() }),
  });
}

export function useDeleteCategory() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => deleteCategory(slug),
    onSuccess: () => qc.invalidateQueries({ queryKey: catalogKeys.categories() }),
  });
}

export function useUpdateOrderStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: OrderStatus }) => updateOrderStatus(orderId, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.orders() }),
  });
}

export const useAddresses = (userId: string) =>
  useQuery({ queryKey: adminKeys.addresses(userId), queryFn: () => fetchAddresses(userId), enabled: !!userId });

export function useUpsertAddress(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (a: AddressInput) => upsertAddress(a),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.addresses(userId) }),
  });
}

export function useDeleteAddress(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteAddress(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.addresses(userId) }),
  });
}

export function useSetDefaultAddress(userId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => setDefaultAddress(userId, id),
    onSuccess: () => qc.invalidateQueries({ queryKey: adminKeys.addresses(userId) }),
  });
}
