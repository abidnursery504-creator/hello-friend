import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  aspect?: "square" | "video" | "4/5" | "3/4" | "auto";
  rounded?: boolean;
  sizes?: string;
  priority?: boolean;
};

/** Build a responsive srcset for Unsplash-style URLs that accept a `w=` query param. */
function buildSrcSet(src?: string) {
  if (!src) return undefined;
  if (!/[?&]w=/.test(src) && !/images\.unsplash\.com/.test(src)) return undefined;
  const widths = [320, 480, 640, 800, 1024, 1280, 1600, 1920];
  try {
    return widths
      .map((w) => {
        const u = src.replace(/([?&])w=\d+/, `$1w=${w}`);
        const out = /[?&]w=/.test(u) ? u : `${u}${u.includes("?") ? "&" : "?"}w=${w}&auto=format&fit=crop`;
        return `${out} ${w}w`;
      })
      .join(", ");
  } catch {
    return undefined;
  }
}

export function SmartImage({
  className,
  aspect = "auto",
  rounded = true,
  alt = "",
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  priority = false,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const aspectClass =
    aspect === "square" ? "aspect-square"
    : aspect === "video" ? "aspect-video"
    : aspect === "4/5" ? "aspect-[4/5]"
    : aspect === "3/4" ? "aspect-[3/4]"
    : "";

  const srcSet = buildSrcSet(typeof props.src === "string" ? props.src : undefined);

  return (
    <div className={cn("relative overflow-hidden bg-muted/60", aspectClass, rounded && "rounded-2xl", className)}>
      {!loaded && <div className="absolute inset-0 skeleton" aria-hidden="true" />}
      <img
        {...props}
        alt={alt}
        srcSet={props.srcSet ?? srcSet}
        sizes={props.sizes ?? sizes}
        loading={priority ? "eager" : (props.loading ?? "lazy")}
        fetchPriority={priority ? "high" : (props.fetchPriority ?? "auto")}
        decoding="async"
        onLoad={(e) => { setLoaded(true); props.onLoad?.(e); }}
        className={cn(
          "h-full w-full object-cover transition-all duration-700 will-change-transform",
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0",
        )}
      />
    </div>
  );
}
