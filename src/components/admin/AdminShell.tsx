import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  ShoppingBag,
  Store,
  Tags,
  Users,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/admin", label: "ড্যাশবোর্ড", Icon: LayoutDashboard, exact: true },
  { to: "/admin/products", label: "পণ্য", Icon: Leaf, exact: false },
  { to: "/admin/categories", label: "বিভাগ", Icon: Tags, exact: false },
  { to: "/admin/orders", label: "অর্ডার", Icon: ShoppingBag, exact: false },
  { to: "/admin/customers", label: "গ্রাহক", Icon: Users, exact: false },
] as const;

const crumbLabel: Record<string, string> = {
  "/admin": "ড্যাশবোর্ড",
  "/admin/products": "পণ্য",
  "/admin/categories": "বিভাগ",
  "/admin/orders": "অর্ডার",
  "/admin/customers": "গ্রাহক",
};

function initials(name?: string | null) {
  if (!name) return "A";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function BrandMark() {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-soft">
      <Leaf className="size-4" />
    </span>
  );
}

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <>
      {nav.map(({ to, label, Icon, exact }) => {
        const active = exact ? pathname === to : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "font-bn flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
              active ? "bg-primary/10 text-primary" : "text-foreground hover:bg-accent",
            )}
          >
            <Icon className="size-4" />
            {label}
          </Link>
        );
      })}
    </>
  );
}

export function AdminShell({
  session,
  onLogout,
  children,
}: {
  session: { fullName: string | null; email: string | null };
  onLogout: () => void;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currentLabel = crumbLabel[pathname] ?? "ড্যাশবোর্ড";
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => { setMobileNavOpen(false); }, [pathname]);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex items-center gap-2.5 border-b border-border px-4 py-4">
          <Link to="/admin" className="flex items-center gap-2.5">
            <BrandMark />
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="font-display truncate text-sm font-bold">All Tree BD</span>
              <span className="text-[11px] text-muted-foreground">Admin Console</span>
            </div>
          </Link>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          <p className="font-bn px-3 pb-2 text-xs font-medium text-muted-foreground">পরিচালনা</p>
          <NavLinks pathname={pathname} />
        </nav>
        <div className="border-t border-border p-3">
          <Link
            to="/"
            className="font-bn flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
          >
            <Store className="size-4" /> সাইট দেখুন
          </Link>
        </div>
      </aside>

      {/* Mobile slide-out nav */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              key="admin-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
              onClick={() => setMobileNavOpen(false)}
            />
            <motion.aside
              key="admin-nav-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.2 }}
              className="fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col bg-sidebar shadow-elegant lg:hidden"
            >
              <div className="flex items-center justify-between border-b border-border px-4 py-4">
                <Link to="/admin" className="flex items-center gap-2.5" onClick={() => setMobileNavOpen(false)}>
                  <BrandMark />
                  <div className="flex min-w-0 flex-col leading-tight">
                    <span className="font-display truncate text-sm font-bold">All Tree BD</span>
                    <span className="text-[11px] text-muted-foreground">Admin Console</span>
                  </div>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="মেনু বন্ধ করুন"
                  className="grid size-9 place-items-center rounded-xl text-foreground hover:bg-accent"
                >
                  <X className="size-5" />
                </button>
              </div>
              <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
                <p className="font-bn px-3 pb-2 text-xs font-medium text-muted-foreground">পরিচালনা</p>
                <NavLinks pathname={pathname} onNavigate={() => setMobileNavOpen(false)} />
              </nav>
              <div className="border-t border-border p-3">
                <Link
                  to="/"
                  onClick={() => setMobileNavOpen(false)}
                  className="font-bn flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-accent"
                >
                  <Store className="size-4" /> সাইট দেখুন
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main column */}
      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur">
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="মেনু খুলুন"
            className="grid size-9 shrink-0 place-items-center rounded-xl text-foreground hover:bg-accent lg:hidden"
          >
            <Menu className="size-5" />
          </button>

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden sm:block">
                <BreadcrumbLink asChild className="font-bn">
                  <Link to="/admin">অ্যাডমিন</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden sm:block" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-bn">{currentLabel}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 pr-3 text-sm transition hover:bg-accent">
                  <Avatar className="size-7">
                    <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">
                      {initials(session.fullName || session.email)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-bn hidden max-w-35 truncate font-medium sm:inline">
                    {session.fullName || session.email}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-bn">
                  <div className="truncate">{session.fullName || "অ্যাডমিন"}</div>
                  <div className="truncate text-xs font-normal text-muted-foreground">{session.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="font-bn">
                  <Link to="/">
                    <Store className="mr-2 size-4" /> সাইট দেখুন
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="font-bn text-destructive focus:text-destructive" onClick={onLogout}>
                  <LogOut className="mr-2 size-4" /> লগআউট
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}

export function AdminPageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h1 className="font-bn font-display text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {subtitle && <p className="font-bn mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
