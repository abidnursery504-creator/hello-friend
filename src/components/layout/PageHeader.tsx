import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/common/Container";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; to?: string };

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  align?: "left" | "center";
  bg?: "default" | "gradient";
  children?: ReactNode;
};

export function PageHeader({ title, subtitle, crumbs, actions, align = "left", bg = "gradient", children }: Props) {
  return (
    <section className={cn("relative overflow-hidden border-b border-border/60 pt-12 pb-14 sm:pt-16 sm:pb-20", bg === "gradient" && "gradient-radial-leaf")}>
      <Container>
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-5 flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
            {crumbs.map((c, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {c.to ? <Link to={c.to} className="hover:text-foreground">{c.label}</Link> : <span className="text-foreground">{c.label}</span>}
                {i < crumbs.length - 1 && <ChevronRight className="size-3.5" />}
              </span>
            ))}
          </nav>
        )}
        <div className={cn("flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between", align === "center" && "sm:items-center sm:justify-center sm:text-center")}>
          <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
            <h1 className="font-display text-3xl font-bold text-balance text-foreground sm:text-4xl lg:text-5xl">{title}</h1>
            {subtitle && <p className="mt-3 text-base text-muted-foreground sm:text-lg">{subtitle}</p>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
        {children}
      </Container>
    </section>
  );
}
