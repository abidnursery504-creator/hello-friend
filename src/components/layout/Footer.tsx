import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Leaf, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { toast } from "sonner";
import { site } from "@/data/site";
import { categories } from "@/data/categories";
import { Container } from "@/components/common/Container";

const socialLinks = [
  { Icon: Facebook, href: site.socials.facebook, label: "Facebook" },
  { Icon: Instagram, href: site.socials.instagram, label: "Instagram" },
  { Icon: Youtube, href: site.socials.youtube, label: "YouTube" },
];

const cols = [
  {
    title: "Shop",
    links: [
      { label: "All Plants", to: "/shop" },
      { label: "Categories", to: "/categories" },
      { label: "New Arrivals", to: "/shop?sort=new" },
      { label: "Bestsellers", to: "/shop?sort=bestseller" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Care Guide", to: "/care-guide" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", to: "/account" },
      { label: "My Orders", to: "/account/orders" },
      { label: "Wishlist", to: "/account/wishlist" },
      { label: "Addresses", to: "/account/addresses" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden border-t bg-primary-dark text-primary-foreground">
      <div className="pointer-events-none absolute -top-32 right-0 size-[420px] rounded-full bg-primary-light/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-0 size-[380px] rounded-full bg-gold/20 blur-3xl" />

      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_3fr_1.4fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/10 backdrop-blur">
                <Leaf className="size-6" />
              </span>
              <div className="leading-tight">
                <div className="font-display text-lg font-bold">All Tree BD Shop</div>
                <div className="font-bn text-xs opacity-80">অনলাইনে গাছের চারা বিক্রয়</div>
              </div>
            </Link>
            <p className="mt-5 text-sm opacity-80">
              Bangladesh's premium online nursery — grafted fruit plants, indoor greens & rare exotics, hand-delivered to all 64 districts.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer noopener" aria-label={label} className="grid size-10 place-items-center rounded-full bg-white/10 transition hover:bg-gold hover:text-gold-foreground">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-8 sm:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] opacity-90">{col.title}</h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm opacity-75 transition hover:opacity-100 hover:text-gold">{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] opacity-90">Top Categories</h4>
              <ul className="space-y-2.5">
                {categories.slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link to="/categories/$slug" params={{ slug: c.slug }} className="text-sm opacity-75 transition hover:opacity-100 hover:text-gold">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] opacity-90">Get in touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
                <span className="opacity-85">{site.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-gold" />
                <a href={`tel:${site.phone}`} className="opacity-85 hover:opacity-100">{site.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-gold" />
                <a href={`mailto:${site.email}`} className="opacity-85 hover:opacity-100">{site.email}</a>
              </li>
            </ul>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                toast.success("Subscribed — check your inbox for tips 🌱");
                form.reset();
              }}
              className="mt-6"
            >
              <label htmlFor="footer-newsletter" className="text-xs uppercase tracking-[0.18em] opacity-80">Plant tips · weekly</label>
              <div className="mt-2 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 backdrop-blur">
                <input id="footer-newsletter" name="email" type="email" required placeholder="your@email.com" className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-white/50 focus:outline-none" />
                <button type="submit" className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-gold-foreground transition hover:brightness-110">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs opacity-75 sm:flex-row">
          <p>© {new Date().getFullYear()} All Tree BD Shop. All rights reserved.</p>
          <p className="font-bn">তৈরি করা হয়েছে ভালোবাসা দিয়ে, বাংলাদেশে 🇧🇩</p>
        </div>
      </Container>
    </footer>
  );
}
