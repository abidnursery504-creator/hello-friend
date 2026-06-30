export type Category = {
  slug: string;
  name: string;
  nameBn: string;
  description: string;
  image: string;
  count: number;
  accent: "green" | "gold" | "lime";
};

export const categories: Category[] = [
  {
    slug: "mango",
    name: "Mango Plants",
    nameBn: "আমের চারা",
    description: "Premium grafted mango varieties — Amrapali, Haribhanga, Banganapalli.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=1200&q=80&auto=format&fit=crop",
    count: 24,
    accent: "gold",
  },
  {
    slug: "citrus",
    name: "Citrus & Lemon",
    nameBn: "লেবু ও কমলা",
    description: "Seedless lemon, Darjeeling orange, Malta, and Kagzi lime saplings.",
    image: "https://images.unsplash.com/photo-1591287083773-9a52902db5f0?w=1200&q=80&auto=format&fit=crop",
    count: 18,
    accent: "lime",
  },
  {
    slug: "guava",
    name: "Guava",
    nameBn: "পেয়ারা",
    description: "Thai pink, Bari-2, seedless and red-flesh varieties.",
    image: "https://images.unsplash.com/photo-1633380110125-f6e685676160?w=1200&q=80&auto=format&fit=crop",
    count: 12,
    accent: "green",
  },
  {
    slug: "litchi",
    name: "Litchi & Longan",
    nameBn: "লিচু ও লংগান",
    description: "Bombai, China-3, Bedana and rare Vietnamese longan.",
    image: "https://images.unsplash.com/photo-1629828874514-e1ad6f1de1f5?w=1200&q=80&auto=format&fit=crop",
    count: 9,
    accent: "green",
  },
  {
    slug: "tropical",
    name: "Tropical Exotics",
    nameBn: "বিদেশী ফল",
    description: "Dragon fruit, rambutan, mangosteen, durian — collector grade.",
    image: "https://images.unsplash.com/photo-1610917040803-1fccf9623064?w=1200&q=80&auto=format&fit=crop",
    count: 15,
    accent: "gold",
  },
  {
    slug: "indoor",
    name: "Indoor & Decor",
    nameBn: "ইনডোর গাছ",
    description: "Air-purifying plants for home, balcony and office spaces.",
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1200&q=80&auto=format&fit=crop",
    count: 32,
    accent: "green",
  },
  {
    slug: "flowering",
    name: "Flowering",
    nameBn: "ফুলের চারা",
    description: "Rose, hibiscus, bougainvillea and seasonal bloomers.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80&auto=format&fit=crop",
    count: 21,
    accent: "gold",
  },
  {
    slug: "herbs",
    name: "Herbs & Spices",
    nameBn: "ভেষজ ও মসলা",
    description: "Tulsi, mint, curry leaf, black pepper and medicinal herbs.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&q=80&auto=format&fit=crop",
    count: 14,
    accent: "lime",
  },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
