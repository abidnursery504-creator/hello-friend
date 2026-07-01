import { useQuery, type QueryClient } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchProductBySlug,
  fetchProductsByCategory,
  fetchCategories,
  fetchCategoryBySlug,
  fetchTestimonials,
  fetchBlogPosts,
  fetchBlogPostBySlug,
  fetchFaqs,
} from "@/lib/supabase/queries";

export const catalogKeys = {
  products: () => ["products"] as const,
  product: (slug: string) => ["products", slug] as const,
  productsByCategory: (slug: string) => ["products", "category", slug] as const,
  categories: () => ["categories"] as const,
  category: (slug: string) => ["categories", slug] as const,
  testimonials: () => ["testimonials"] as const,
  blogPosts: () => ["blog-posts"] as const,
  blogPost: (slug: string) => ["blog-posts", slug] as const,
  faqs: () => ["faqs"] as const,
};

export const useProducts = () =>
  useQuery({ queryKey: catalogKeys.products(), queryFn: fetchProducts, staleTime: 60_000 });

export const useProduct = (slug: string) =>
  useQuery({ queryKey: catalogKeys.product(slug), queryFn: () => fetchProductBySlug(slug), staleTime: 60_000 });

export const useProductsByCategory = (slug: string) =>
  useQuery({
    queryKey: catalogKeys.productsByCategory(slug),
    queryFn: () => fetchProductsByCategory(slug),
    staleTime: 60_000,
  });

export const useCategories = () =>
  useQuery({ queryKey: catalogKeys.categories(), queryFn: fetchCategories, staleTime: 60_000 });

export const useCategory = (slug: string) =>
  useQuery({ queryKey: catalogKeys.category(slug), queryFn: () => fetchCategoryBySlug(slug), staleTime: 60_000 });

export const useTestimonials = () =>
  useQuery({ queryKey: catalogKeys.testimonials(), queryFn: fetchTestimonials, staleTime: 300_000 });

export const useBlogPosts = () =>
  useQuery({ queryKey: catalogKeys.blogPosts(), queryFn: fetchBlogPosts, staleTime: 60_000 });

export const useBlogPost = (slug: string) =>
  useQuery({ queryKey: catalogKeys.blogPost(slug), queryFn: () => fetchBlogPostBySlug(slug), staleTime: 60_000 });

export const useFaqs = () =>
  useQuery({ queryKey: catalogKeys.faqs(), queryFn: fetchFaqs, staleTime: 300_000 });

// Derived, client-side selectors over the full product list — mirror the
// old src/data/products.ts helper names/behavior.
import type { Product } from "@/data/products";
export const selectBestsellers = (products: Product[]) =>
  products.filter((p) => p.badges?.includes("বেস্ট সেলার"));
export const selectNewArrivals = (products: Product[]) =>
  products.filter((p) => p.badges?.includes("নতুন"));
export const selectByCategory = (products: Product[], slug: string) =>
  products.filter((p) => p.category === slug);

// For route loaders (SSR-friendly: ensures data is in the cache before render).
export const ensureProduct = (qc: QueryClient, slug: string) =>
  qc.ensureQueryData({ queryKey: catalogKeys.product(slug), queryFn: () => fetchProductBySlug(slug) });

export const ensureProducts = (qc: QueryClient) =>
  qc.ensureQueryData({ queryKey: catalogKeys.products(), queryFn: fetchProducts });

export const ensureCategory = (qc: QueryClient, slug: string) =>
  qc.ensureQueryData({ queryKey: catalogKeys.category(slug), queryFn: () => fetchCategoryBySlug(slug) });

export const ensureCategories = (qc: QueryClient) =>
  qc.ensureQueryData({ queryKey: catalogKeys.categories(), queryFn: fetchCategories });

export const ensureBlogPost = (qc: QueryClient, slug: string) =>
  qc.ensureQueryData({ queryKey: catalogKeys.blogPost(slug), queryFn: () => fetchBlogPostBySlug(slug) });

export const ensureBlogPosts = (qc: QueryClient) =>
  qc.ensureQueryData({ queryKey: catalogKeys.blogPosts(), queryFn: fetchBlogPosts });

export const ensureFaqs = (qc: QueryClient) =>
  qc.ensureQueryData({ queryKey: catalogKeys.faqs(), queryFn: fetchFaqs });
