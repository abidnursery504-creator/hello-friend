// Cloudinary helpers: unsigned client-side upload + responsive URL builders.
// Mirrors the shape of the Unsplash helpers in ./img.ts.

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

export const isCloudinaryUrl = (src?: string) =>
  !!src && /res\.cloudinary\.com/.test(src);

/** Normalize a Cloudinary delivery URL to a given width/quality via f_auto,q_auto transforms. */
export function cloudinaryUrl(src: string, w = 1200, q: number | "auto" = "auto") {
  if (!isCloudinaryUrl(src)) return src;
  const marker = "/upload/";
  const idx = src.indexOf(marker);
  if (idx === -1) return src;
  const head = src.slice(0, idx + marker.length);
  const tail = src.slice(idx + marker.length);
  return `${head}f_auto,q_${q},w_${w},c_limit/${tail}`;
}

export function cloudinarySrcSet(src?: string, widths = [400, 640, 800, 1024, 1280, 1600]) {
  if (!src || !isCloudinaryUrl(src)) return undefined;
  return widths.map((w) => `${cloudinaryUrl(src, w)} ${w}w`).join(", ");
}

export function cloudinaryLqip(src?: string) {
  if (!src || !isCloudinaryUrl(src)) return undefined;
  return cloudinaryUrl(src, 24, 20);
}

export type CloudinaryUploadResult = {
  secure_url: string;
  public_id: string;
};

/** Unsigned upload straight from the browser — no API secret needed. */
export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  const form = new FormData();
  form.append("file", file);
  form.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Cloudinary upload failed (${res.status}): ${body}`);
  }

  return res.json();
}
