export type Product = {
  slug: string;
  name: string;
  nameBn: string;
  category: string; // category slug
  price: number; // BDT
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  badges?: ("Bestseller" | "New" | "Limited" | "Grafted" | "Organic")[];
  shortDescription: string;
  description: string;
  height: string;
  age: string;
  potIncluded: boolean;
  inStock: boolean;
  careLevel: "Easy" | "Moderate" | "Expert";
  sunlight: "Full Sun" | "Partial Shade" | "Indoor Bright";
  water: "Low" | "Moderate" | "High";
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

export const products: Product[] = [
  {
    slug: "amrapali-mango-grafted",
    name: "Amrapali Mango (Grafted)",
    nameBn: "আম্রপালি আম",
    category: "mango",
    price: 650,
    oldPrice: 850,
    rating: 4.9,
    reviews: 218,
    image: img("photo-1553279768-865429fa0078"),
    gallery: [
      img("photo-1553279768-865429fa0078"),
      img("photo-1591735026282-bb24fd6c0451"),
      img("photo-1605027990121-cbae9e0642db"),
    ],
    badges: ["Bestseller", "Grafted"],
    shortDescription: "Dwarf, high-yield mango — fruits in 2 years.",
    description:
      "Amrapali is a dwarf, regular-bearing hybrid mango that produces sweet, fibreless fruits with a deep orange flesh. Perfect for rooftops and small gardens. Grafted on Bombai rootstock for early fruiting.",
    height: "2.5 - 3 ft",
    age: "12 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Easy",
    sunlight: "Full Sun",
    water: "Moderate",
  },
  {
    slug: "haribhanga-mango",
    name: "Haribhanga Mango",
    nameBn: "হাঁড়িভাঙ্গা আম",
    category: "mango",
    price: 780,
    rating: 4.8,
    reviews: 142,
    image: img("photo-1591735026282-bb24fd6c0451"),
    gallery: [img("photo-1591735026282-bb24fd6c0451")],
    badges: ["Grafted"],
    shortDescription: "Rangpur's heritage mango with rich aroma.",
    description:
      "Authentic Haribhanga from Rangpur. Large fibreless fruits, intensely sweet with a heady aroma. Grafted saplings from mother plants.",
    height: "3 - 3.5 ft",
    age: "14 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Easy",
    sunlight: "Full Sun",
    water: "Moderate",
  },
  {
    slug: "seedless-lemon",
    name: "Seedless Lemon",
    nameBn: "বীজহীন লেবু",
    category: "citrus",
    price: 420,
    oldPrice: 520,
    rating: 4.7,
    reviews: 89,
    image: img("photo-1591287083773-9a52902db5f0"),
    gallery: [img("photo-1591287083773-9a52902db5f0")],
    badges: ["Bestseller"],
    shortDescription: "Year-round juicy lemons, no seeds.",
    description:
      "Compact, thorn-less variety that fruits year-round. Thin-skinned, intensely juicy lemons with no seeds — perfect for kitchen gardens.",
    height: "1.5 - 2 ft",
    age: "8 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Easy",
    sunlight: "Full Sun",
    water: "Moderate",
  },
  {
    slug: "darjeeling-orange",
    name: "Darjeeling Orange",
    nameBn: "দার্জিলিং কমলা",
    category: "citrus",
    price: 950,
    rating: 4.6,
    reviews: 54,
    image: img("photo-1582979512210-99b6a53386f9"),
    gallery: [img("photo-1582979512210-99b6a53386f9")],
    badges: ["Limited", "Grafted"],
    shortDescription: "Sweet, easy-peel hill oranges.",
    description:
      "Grown from Darjeeling-region mother stock. Sweet-tart juicy oranges with loose, easy-peel skin. Thrives in cool climates.",
    height: "2 - 2.5 ft",
    age: "16 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Moderate",
    sunlight: "Full Sun",
    water: "Moderate",
  },
  {
    slug: "thai-pink-guava",
    name: "Thai Pink Guava",
    nameBn: "থাই পিংক পেয়ারা",
    category: "guava",
    price: 380,
    rating: 4.8,
    reviews: 167,
    image: img("photo-1633380110125-f6e685676160"),
    gallery: [img("photo-1633380110125-f6e685676160")],
    badges: ["Bestseller", "Organic"],
    shortDescription: "Crisp, pink-flesh guava, prolific bearer.",
    description:
      "Vigorous Thai variety with pink flesh, crunchy texture and very sweet flavor. Starts fruiting within 8 months of planting.",
    height: "2 - 2.5 ft",
    age: "10 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Easy",
    sunlight: "Full Sun",
    water: "Moderate",
  },
  {
    slug: "bedana-litchi",
    name: "Bedana Litchi",
    nameBn: "বেদানা লিচু",
    category: "litchi",
    price: 1200,
    oldPrice: 1450,
    rating: 4.9,
    reviews: 73,
    image: img("photo-1629828874514-e1ad6f1de1f5"),
    gallery: [img("photo-1629828874514-e1ad6f1de1f5")],
    badges: ["Limited", "Grafted"],
    shortDescription: "Tiny-seed, thick-flesh premium litchi.",
    description:
      "The most premium litchi variety — extremely small seed, thick juicy flesh, deep red skin. Air-layered for true-to-type fruiting.",
    height: "2.5 - 3 ft",
    age: "18 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Moderate",
    sunlight: "Full Sun",
    water: "High",
  },
  {
    slug: "red-dragon-fruit",
    name: "Red Dragon Fruit",
    nameBn: "রেড ড্রাগন ফল",
    category: "tropical",
    price: 550,
    rating: 4.7,
    reviews: 198,
    image: img("photo-1610917040803-1fccf9623064"),
    gallery: [img("photo-1610917040803-1fccf9623064")],
    badges: ["Bestseller", "New"],
    shortDescription: "Vivid red flesh, antioxidant-rich superfruit.",
    description:
      "Self-pollinating red-flesh dragon fruit cutting. Drought tolerant, fruits within 12-14 months. High in betalains and antioxidants.",
    height: "1.5 - 2 ft",
    age: "6 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Easy",
    sunlight: "Full Sun",
    water: "Low",
  },
  {
    slug: "rambutan",
    name: "Rambutan",
    nameBn: "রাম্বুটান",
    category: "tropical",
    price: 1450,
    rating: 4.6,
    reviews: 41,
    image: img("photo-1591287083773-9a52902db5f0"),
    gallery: [img("photo-1591287083773-9a52902db5f0")],
    badges: ["Limited", "Grafted"],
    shortDescription: "Sweet, lychee-like Southeast-Asian gem.",
    description:
      "Rare grafted rambutan from Malaysian mother plants. Sweet translucent flesh similar to lychee with a spiky red shell.",
    height: "2.5 - 3 ft",
    age: "20 months",
    potIncluded: true,
    inStock: false,
    careLevel: "Expert",
    sunlight: "Full Sun",
    water: "High",
  },
  {
    slug: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    nameBn: "মনস্টেরা ডেলিসিওসা",
    category: "indoor",
    price: 890,
    oldPrice: 1100,
    rating: 4.9,
    reviews: 312,
    image: img("photo-1485955900006-10f4d324d411"),
    gallery: [img("photo-1485955900006-10f4d324d411")],
    badges: ["Bestseller"],
    shortDescription: "Iconic split-leaf statement plant.",
    description:
      "The original Insta-famous plant. Large fenestrated leaves, fast growing, tolerates low to bright indirect light.",
    height: "1.5 - 2 ft",
    age: "10 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Easy",
    sunlight: "Indoor Bright",
    water: "Moderate",
  },
  {
    slug: "snake-plant",
    name: "Snake Plant (Sansevieria)",
    nameBn: "স্নেক প্ল্যান্ট",
    category: "indoor",
    price: 320,
    rating: 4.8,
    reviews: 421,
    image: img("photo-1593482892290-f54927ae1bb6"),
    gallery: [img("photo-1593482892290-f54927ae1bb6")],
    badges: ["Bestseller", "Organic"],
    shortDescription: "Near-indestructible air purifier.",
    description:
      "NASA-certified air purifier. Tolerates neglect, low light and infrequent watering. Releases oxygen at night.",
    height: "1 - 1.5 ft",
    age: "8 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Easy",
    sunlight: "Indoor Bright",
    water: "Low",
  },
  {
    slug: "desi-rose",
    name: "Desi Rose (Mixed Colors)",
    nameBn: "দেশি গোলাপ",
    category: "flowering",
    price: 250,
    rating: 4.5,
    reviews: 188,
    image: img("photo-1490750967868-88aa4486c946"),
    gallery: [img("photo-1490750967868-88aa4486c946")],
    badges: ["New"],
    shortDescription: "Fragrant heirloom roses, year-round bloom.",
    description:
      "Hardy desi rose with rich fragrance and continuous blooming. Available in mixed pink, red and white shades.",
    height: "1 - 1.5 ft",
    age: "6 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Easy",
    sunlight: "Full Sun",
    water: "Moderate",
  },
  {
    slug: "tulsi-krishna",
    name: "Krishna Tulsi",
    nameBn: "কৃষ্ণ তুলসী",
    category: "herbs",
    price: 120,
    rating: 4.9,
    reviews: 267,
    image: img("photo-1466692476868-aef1dfb1e735"),
    gallery: [img("photo-1466692476868-aef1dfb1e735")],
    badges: ["Bestseller", "Organic"],
    shortDescription: "Sacred medicinal herb, immunity booster.",
    description:
      "Authentic Krishna Tulsi with dark purple leaves. Strong aroma, used in traditional medicine and daily wellness teas.",
    height: "0.8 - 1 ft",
    age: "4 months",
    potIncluded: true,
    inStock: true,
    careLevel: "Easy",
    sunlight: "Full Sun",
    water: "Moderate",
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const bestsellers = () =>
  products.filter((p) => p.badges?.includes("Bestseller"));

export const newArrivals = () =>
  products.filter((p) => p.badges?.includes("New"));
