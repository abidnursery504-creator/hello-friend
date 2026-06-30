import { cn } from "@/lib/utils";
import { Container } from "./Container";
import type { ReactNode } from "react";

type Props = {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
  containerClassName?: string;
  children: ReactNode;
  bg?: "default" | "muted" | "gradient";
};

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  containerClassName,
  children,
  bg = "default",
}: Props) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 sm:py-20 lg:py-28",
        bg === "muted" && "bg-muted/40",
        bg === "gradient" && "gradient-radial-leaf",
        className,
      )}
    >
      <Container className={containerClassName}>
        {(eyebrow || title || subtitle) && (
          <div
            className={cn(
              "mb-10 max-w-2xl sm:mb-14",
              align === "center" && "mx-auto text-center",
            )}
          >
            {eyebrow && (
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary">
                <span className="inline-block size-1.5 rounded-full bg-primary" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="font-display text-3xl font-bold text-balance text-foreground sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
