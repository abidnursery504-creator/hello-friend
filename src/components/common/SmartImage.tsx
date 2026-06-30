import { useState, type ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  aspect?: "square" | "video" | "4/5" | "3/4" | "auto";
  rounded?: boolean;
};

export function SmartImage({ className, aspect = "auto", rounded = true, alt = "", ...props }: Props) {
  const [loaded, setLoaded] = useState(false);
  const aspectClass =
    aspect === "square" ? "aspect-square"
    : aspect === "video" ? "aspect-video"
    : aspect === "4/5" ? "aspect-[4/5]"
    : aspect === "3/4" ? "aspect-[3/4]"
    : "";

  return (
    <div className={cn("relative overflow-hidden bg-muted/60", aspectClass, rounded && "rounded-2xl", className)}>
      {!loaded && <div className="absolute inset-0 skeleton" />}
      <img
        {...props}
        alt={alt}
        loading={props.loading ?? "lazy"}
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
