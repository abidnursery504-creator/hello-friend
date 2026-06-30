import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { MobileHome } from "@/components/mobile/MobileHome";
import { DesktopHome } from "@/components/desktop/DesktopHome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All Tree BD Shop — Premium Online Nursery in Bangladesh" },
      { name: "description", content: "Shop grafted mango, litchi, lemon and rare tropical plants. 64-district cash on delivery & a 30-day living guarantee." },
      { property: "og:title", content: "All Tree BD Shop — Premium Online Nursery" },
      { property: "og:description", content: "Grafted fruit plants & indoor greens, delivered fresh across Bangladesh." },
      { property: "og:image", content: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1600&q=80" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <PageLayout>
      <MobileHome />
      <div className="hidden lg:block">
        <DesktopHome />
      </div>
    </PageLayout>
  );
}
