// Shared image helpers. Dispatches by host: Unsplash URLs get Unsplash's
// query-param transforms, Cloudinary URLs get Cloudinary's path transforms
// (see ./cloudinary.ts). Local/other URLs pass through unchanged.
import { cloudinaryLqip, cloudinarySrcSet, cloudinaryUrl, isCloudinaryUrl } from "./cloudinary";

export const FALLBACK_IMG =
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=70&auto=format&fit=crop";

/** Tiny blurred LQIP version (for background placeholder). */
export function lqip(src?: string) {
  if (!src) return undefined;
  if (isCloudinaryUrl(src)) return cloudinaryLqip(src);
  if (!/images\.unsplash\.com/.test(src)) return undefined;
  const base = src.split("?")[0];
  return `${base}?w=24&q=20&blur=50&auto=format&fit=crop`;
}

/** Normalize an Unsplash/Cloudinary URL to a given width / quality. */
export function unsplash(src: string, w = 1200, q = 75) {
  if (isCloudinaryUrl(src)) return cloudinaryUrl(src, w, q);
  if (!/images\.unsplash\.com/.test(src)) return src;
  const base = src.split("?")[0];
  return `${base}?w=${w}&q=${q}&auto=format&fit=crop`;
}

/** Build a responsive srcset for Unsplash/Cloudinary URLs. */
export function unsplashSrcSet(src?: string, widths = [400, 640, 800, 1024, 1280, 1600]) {
  if (!src) return undefined;
  if (isCloudinaryUrl(src)) return cloudinarySrcSet(src, widths);
  if (!/images\.unsplash\.com/.test(src)) return undefined;
  const base = src.split("?")[0];
  return widths
    .map((w) => `${base}?w=${w}&q=75&auto=format&fit=crop ${w}w`)
    .join(", ");
}

/** onError handler that swaps to a guaranteed fallback once. */
export function onImgError(e: React.SyntheticEvent<HTMLImageElement>) {
  const el = e.currentTarget;
  if (el.dataset.fallback === "1") return;
  el.dataset.fallback = "1";
  el.removeAttribute("srcset");
  el.src = FALLBACK_IMG;
}
