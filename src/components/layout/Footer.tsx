import { Link } from "@tanstack/react-router";
import {
  ArrowRight, Award, Clock, Facebook, Headphones, Instagram, Leaf, Mail,
  MapPin, MessageCircle, Phone, ShieldCheck, Truck, Wallet, Youtube,
} from "lucide-react";
import { site } from "@/data/site";
import { categories } from "@/data/categories";
import { Container } from "@/components/common/Container";

const socialLinks = [
  { Icon: Facebook, href: site.socials.facebook, label: "Facebook" },
  { Icon: Instagram, href: site.socials.instagram, label: "Instagram" },
  { Icon: Youtube, href: site.socials.youtube, label: "YouTube" },
  { Icon: MessageCircle, href: "https://wa.me/8801700000000", label: "WhatsApp" },
];

const trustStrip = [
  { Icon: Truck, t: "৬৪ জেলায় ডেলিভারি", d: "দ্রুত ও নিরাপদ কুরিয়ার" },
  { Icon: Wallet, t: "ক্যাশ অন ডেলিভারি", d: "পণ্য বুঝে পেমেন্ট" },
  { Icon: ShieldCheck, t: "৩০ দিন গ্যারান্টি", d: "লিভিং প্ল্যান্ট গ্যারান্টি" },
  { Icon: Headphones, t: "২৪/৭ সাপোর্ট", d: "সব সময় পাশে আছি" },
];

const cols = [
  {
    title: "শপ",
    links: [
      { label: "সব গাছ", to: "/shop" },
      { label: "সব বিভাগ", to: "/categories" },
      { label: "নতুন এসেছে", to: "/shop" },
      { label: "বেস্ট সেলার", to: "/shop" },
      { label: "অফার", to: "/shop" },
    ],
  },
  {
    title: "প্রতিষ্ঠান",
    links: [
      { label: "আমাদের সম্পর্কে", to: "/about" },
      { label: "ব্লগ", to: "/blog" },
      { label: "গ্যালারি", to: "/gallery" },
      { label: "পরিচর্যা গাইড", to: "/care-guide" },
      { label: "প্রশ্নোত্তর", to: "/faq" },
    ],
  },
  {
    title: "সহায়তা",
    links: [
      { label: "যোগাযোগ", to: "/contact" },
      { label: "অর্ডার ট্র্যাক", to: "/track-order" },
      { label: "শিপিং পলিসি", to: "/shipping-policy" },
      { label: "রিটার্ন পলিসি", to: "/return-policy" },
      { label: "রিভিউ", to: "/reviews" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-[#0E2A14] text-white">
      {/* Decorative glow */}
      <div className="pointer-events-none absolute -top-40 right-0 size-[480px] rounded-full bg-[#2E7D32]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 left-0 size-[440px] rounded-full bg-[#C8A415]/15 blur-3xl" />
      <Leaf aria-hidden="true" className="pointer-events-none absolute -left-6 top-32 size-40 -rotate-12 text-white/[0.04]" />
      <Leaf aria-hidden="true" className="pointer-events-none absolute right-10 bottom-10 size-48 rotate-12 text-white/[0.04]" />

      {/* Trust strip */}
      <div className="relative border-b border-white/10 bg-white/[0.03] backdrop-blur">
        <Container className="grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
          {trustStrip.map(({ Icon, t, d }, i) => (
            <div
              key={t}
              className={`flex items-center gap-3 px-4 ${i < 3 ? "md:border-r md:border-white/10" : ""}`}
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#2E7D32]/20 text-[#A8E29E] ring-1 ring-[#2E7D32]/30">
                <Icon className="size-5" strokeWidth={2.2} />
              </span>
              <div className="min-w-0">
                <p className="font-bn truncate text-sm font-semibold">{t}</p>
                <p className="font-bn truncate text-xs text-white/60">{d}</p>
              </div>
            </div>
          ))}
        </Container>
      </div>

      {/* Main */}
      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr_1.5fr]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#2E7D32] shadow-elegant ring-1 ring-white/10">
                <Leaf className="size-6" />
              </span>
              <div className="leading-tight">
                <div className="font-display text-xl font-extrabold tracking-tight">All Tree BD Shop</div>
                <div className="font-bn text-xs text-white/70">প্রিমিয়াম অনলাইন নার্সারি</div>
              </div>
            </Link>
            <p className="font-bn mt-5 text-sm leading-relaxed text-white/75">
              বাংলাদেশের প্রিমিয়াম অনলাইন নার্সারি — গ্রাফটিং ফল গাছ, ইনডোর গ্রিন ও দুর্লভ বিদেশি চারা, সারা দেশে নিরাপদে ডেলিভারি।
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className="font-bn inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/85 ring-1 ring-white/10">
                <Award className="size-3.5 text-[#E8C547]" /> ৫ বছরের অভিজ্ঞতা
              </span>
              <span className="font-bn inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/85 ring-1 ring-white/10">
                <ShieldCheck className="size-3.5 text-[#A8E29E]" /> ভেরিফায়েড নার্সারি
              </span>
            </div>

            <div className="mt-6">
              <p className="font-bn mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">আমাদের ফলো করুন</p>
              <div className="flex items-center gap-2">
                {socialLinks.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={label}
                    className="grid size-10 place-items-center rounded-full bg-white/8 ring-1 ring-white/10 transition hover:-translate-y-0.5 hover:bg-[#2E7D32] hover:ring-[#2E7D32]"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="grid gap-8 sm:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="font-bn relative mb-5 text-sm font-bold uppercase tracking-wider text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-8 after:rounded-full after:bg-[#C8A415]">
                  {col.title}
                </h4>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        to={l.to}
                        className="font-bn group inline-flex items-center gap-1.5 text-sm text-white/75 transition hover:text-[#E8C547]"
                      >
                        <ArrowRight className="size-3 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                        <span className="-ml-3 group-hover:ml-0 transition-all">{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div>
              <h4 className="font-bn relative mb-5 text-sm font-bold uppercase tracking-wider text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-8 after:rounded-full after:bg-[#C8A415]">
                জনপ্রিয় বিভাগ
              </h4>
              <ul className="space-y-2.5">
                {categories.slice(0, 5).map((c) => (
                  <li key={c.slug}>
                    <Link
                      to="/categories/$slug"
                      params={{ slug: c.slug }}
                      className="font-bn group inline-flex items-center gap-1.5 text-sm text-white/75 transition hover:text-[#E8C547]"
                    >
                      <ArrowRight className="size-3 -translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                      <span className="-ml-3 group-hover:ml-0 transition-all">{c.nameBn}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="font-bn relative mb-5 text-sm font-bold uppercase tracking-wider text-white after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-8 after:rounded-full after:bg-[#C8A415]">
              যোগাযোগ
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg bg-white/5 text-[#A8E29E] ring-1 ring-white/10">
                  <MapPin className="size-4" />
                </span>
                <span className="font-bn text-white/80">{site.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/5 text-[#A8E29E] ring-1 ring-white/10">
                  <Phone className="size-4" />
                </span>
                <a href={`tel:${site.phone}`} className="text-white/80 hover:text-[#E8C547]">{site.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/5 text-[#A8E29E] ring-1 ring-white/10">
                  <Mail className="size-4" />
                </span>
                <a href={`mailto:${site.email}`} className="text-white/80 hover:text-[#E8C547]">{site.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white/5 text-[#A8E29E] ring-1 ring-white/10">
                  <Clock className="size-4" />
                </span>
                <span className="font-bn text-white/80">খোলা: শনি–বৃহঃ, সকাল ৯টা – রাত ৯টা</span>
              </li>
            </ul>

          </div>
        </div>

        {/* Legal bar */}
        <div className="mt-14 rounded-2xl bg-white/5 px-5 py-4 ring-1 ring-white/10">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-end">
            <Link to="/privacy" className="font-bn text-xs text-white/70 hover:text-[#E8C547]">প্রাইভেসি পলিসি</Link>
            <Link to="/terms" className="font-bn text-xs text-white/70 hover:text-[#E8C547]">শর্তাবলি</Link>
            <Link to="/return-policy" className="font-bn text-xs text-white/70 hover:text-[#E8C547]">রিটার্ন</Link>
            <Link to="/shipping-policy" className="font-bn text-xs text-white/70 hover:text-[#E8C547]">শিপিং</Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/65 sm:flex-row">
          <p className="font-bn">© {new Date().getFullYear()} অল ট্রি বিডি শপ। সর্বস্বত্ব সংরক্ষিত।</p>
          <p className="font-bn flex items-center gap-1.5">
            বাংলাদেশে <span className="text-rose-400">❤</span> দিয়ে তৈরি 🇧🇩
          </p>
        </div>
      </Container>
    </footer>
  );
}
