import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";
import { FloatingLeaves } from "./FloatingLeaves";
import { RouteLoader } from "./RouteLoader";
import { PageTransition } from "./PageTransition";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <FloatingLeaves />
      <RouteLoader />
      <Navbar />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
