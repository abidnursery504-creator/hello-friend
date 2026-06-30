export const site = {
  name: "All Tree BD Shop",
  nameBn: "অনলাইনে গাছের চারা বিক্রয়",
  tagline: "Your trusted partner for hobby & rooftop gardens in Bangladesh",
  taglineBn: "আপনার শখের ছাদ বাগানের বিশ্বস্ত সঙ্গী",
  descriptionBn:
    "🌿 আপনার শখের ছাদ বাগানের বিশ্বস্ত সঙ্গী।\n✅ জিও ব্যাগ সেটআপ করা রেডি মাতৃ গাছ।\n🍎 উন্নত জাতের ফলের চারা।\n🚚 সারা বাংলাদেশে কুরিয়ারে ডেলিভারি।",
  description:
    "Your trusted partner for hobby & rooftop gardens. Ready geo-bag setup mother plants, premium grafted fruit saplings, and nationwide courier delivery across Bangladesh.",
  phone: "01839-208687",
  phoneAlt: "01838-208687",
  whatsapp: "01839-208687",
  email: "ibrahimhossain362840@gmail.com",
  address: "Puran Bogra, Rajshahi, Bangladesh",
  addressBn: "পুরান বগুড়া, রাজশাহী, বাংলাদেশ",
  socials: {
    facebook: "https://facebook.com/Alltreebd1Shop",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
  },
  currency: "৳",
  shipping: {
    freeAbove: 1500,
    flatFee: 120,
  },
  trustBadges: [
    { label: "Cash on Delivery", labelBn: "ক্যাশ অন ডেলিভারি", icon: "wallet" },
    { label: "Healthy Plants", labelBn: "স্বাস্থ্যকর গাছ", icon: "leaf" },
    { label: "Premium Quality", labelBn: "প্রিমিয়াম মান", icon: "award" },
    { label: "Nationwide Delivery", labelBn: "সারা দেশে ডেলিভারি", icon: "truck" },
    { label: "Expert Support", labelBn: "এক্সপার্ট সাপোর্ট", icon: "headphones" },
  ],
  ctas: {
    primary: "অর্ডার করুন এখনই",
    primaryEn: "Order Now",
    secondary: "চারা দেখুন",
    secondaryEn: "Explore Plants",
    call: "এখনই কল করুন",
    callEn: "Call Now",
    whatsapp: "হোয়াটসঅ্যাপে অর্ডার",
    whatsappEn: "Order on WhatsApp",
  },
};

export type Testimonial = {
  name: string;
  role: string;
  city: string;
  rating: number;
  text: string;
  avatar: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Rashed Khan",
    role: "Rooftop Gardener",
    city: "Dhaka",
    rating: 5,
    text: "The Amrapali mango sapling fruited in 18 months on my rooftop. Packaging was museum-grade — every leaf intact.",
    avatar: "https://i.pravatar.cc/120?img=12",
  },
  {
    name: "Sumaiya Akter",
    role: "Plant Collector",
    city: "Chattogram",
    rating: 5,
    text: "Finally a Bangladeshi nursery that respects rare varieties. My Bedana litchi arrived stronger than I imagined.",
    avatar: "https://i.pravatar.cc/120?img=45",
  },
  {
    name: "Tanvir Hossain",
    role: "Farm Owner",
    city: "Rangpur",
    rating: 5,
    text: "Ordered 40 grafted guava saplings for my farm. Zero loss. Customer support replied in Bangla within minutes.",
    avatar: "https://i.pravatar.cc/120?img=33",
  },
  {
    name: "Nusrat Jahan",
    role: "Home Decorator",
    city: "Sylhet",
    rating: 5,
    text: "Monstera looks like the catalog photo. The ceramic pot upgrade was worth every taka.",
    avatar: "https://i.pravatar.cc/120?img=47",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
};

export const posts: BlogPost[] = [
  {
    slug: "rooftop-mango-guide",
    title: "Grow Mango on Your Rooftop: A Complete Bangladesh Guide",
    excerpt:
      "Variety selection, pot size, drainage and the 3 mistakes that kill 80% of rooftop mango saplings.",
    cover: "https://images.unsplash.com/photo-1591735026282-bb24fd6c0451?w=1600&q=80",
    author: "Md. Imran",
    date: "Jun 12, 2026",
    readTime: "8 min",
    category: "Care Guide",
    content:
      "Rooftop mango cultivation is booming in Dhaka. Pick a dwarf grafted variety like Amrapali or Bari-4. Use a 24-inch pot with 30% sand, 40% compost, 30% topsoil. Mulch the top. Water deeply twice a week — never daily.",
  },
  {
    slug: "monsoon-plant-care",
    title: "Monsoon Plant Care: Surviving Bangladesh's Heaviest Rains",
    excerpt:
      "Drainage hacks, fungal prevention and the right time to feed your fruit plants this season.",
    cover: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1600&q=80",
    author: "Sumaiya Karim",
    date: "Jun 02, 2026",
    readTime: "6 min",
    category: "Seasonal",
    content:
      "Monsoon is the easiest time to transplant — but the hardest time to keep plants alive. Elevate pots, add neem cake, switch to potassium-heavy feed.",
  },
  {
    slug: "indoor-plants-beginners",
    title: "5 Indoor Plants That Won't Die On You",
    excerpt:
      "Snake plant, ZZ, pothos and friends — the foolproof starter kit for new plant parents.",
    cover: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=1600&q=80",
    author: "Nusrat J.",
    date: "May 22, 2026",
    readTime: "5 min",
    category: "Indoor",
    content:
      "If you've killed a cactus, this list is for you. Each of these plants tolerates weeks of neglect and still looks like a magazine cover.",
  },
];

export const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);

export const faqs = [
  {
    q: "How are plants delivered across Bangladesh?",
    a: "We use specialized plant couriers with shock-proof crates. Inside Dhaka 24-48 hours, outside Dhaka 2-4 days. Every plant is photographed before dispatch.",
  },
  {
    q: "Do you offer a survival guarantee?",
    a: "Yes — 7-day delivery-condition guarantee plus a 30-day living guarantee on grafted fruit plants when our care plan is followed.",
  },
  {
    q: "Can I pay cash on delivery?",
    a: "Absolutely. Cash on Delivery is available across all 64 districts of Bangladesh.",
  },
  {
    q: "Which plants fruit fastest in pots?",
    a: "Dwarf grafted mango (Amrapali), Thai pink guava, seedless lemon and red dragon fruit all fruit within 8-18 months in pots.",
  },
  {
    q: "Do you ship internationally?",
    a: "Not yet — we ship within Bangladesh only. International phytosanitary shipping is on our 2027 roadmap.",
  },
];
