import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "@/components/ui/sonner";
import { PageLayout } from "@/components/layout/PageLayout";

function NotFoundComponent() {
  return (
    <PageLayout>
      <div className="gradient-radial-leaf flex min-h-[70vh] items-center justify-center px-4 py-20">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-6 grid size-24 place-items-center rounded-3xl gradient-primary text-primary-foreground shadow-elegant">
            <span className="font-display text-4xl font-bold">404</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">Page not found</h1>
          <p className="mt-3 text-muted-foreground">
            This corner of our garden is empty. Let's get you back to greener pastures.
          </p>
          <p className="font-bn mt-1 text-sm text-muted-foreground">এই পেইজটি খুঁজে পাওয়া যায়নি।</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition hover:shadow-elegant"
            >
              Back to home
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent"
            >
              Browse plants
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a href="/" className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "All Tree BD Shop — Premium Online Nursery in Bangladesh" },
      { name: "description", content: "Bangladesh's premium online nursery. Buy grafted fruit plants, indoor greens & rare exotics with 64-district cash-on-delivery." },
      { name: "author", content: "All Tree BD Shop" },
      { name: "theme-color", content: "#2E7D32" },
      { property: "og:site_name", content: "All Tree BD Shop" },
      { property: "og:title", content: "All Tree BD Shop — Premium Online Nursery in Bangladesh" },
      { property: "og:description", content: "Grafted fruit plants, indoor greens & rare exotics — delivered across Bangladesh." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <Outlet />
            <Toaster position="top-center" richColors closeButton />
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
