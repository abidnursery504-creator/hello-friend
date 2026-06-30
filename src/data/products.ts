export type Product = {
  slug: string;
  name: string;
  nameBn: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  gallery: string[];
  badges?: ("বেস্ট সেলার" | "নতুন" | "লিমিটেড" | "গ্রাফটিং" | "অর্গানিক")[];
  shortDescription: string;
  description: string;
  height: string;
  age: string;
  potIncluded: boolean;
  inStock: boolean;
  careLevel: "সহজ" | "মাঝারি" | "এক্সপার্ট";
  sunlight: "পূর্ণ রোদ" | "আংশিক ছায়া" | "ইনডোর উজ্জ্বল";
  water: "কম" | "মাঝারি" | "বেশি";
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?w=1200&q=80&auto=format&fit=crop`;

// Locally generated AI product photos, keyed by slug.
const PRODUCT_IMAGES = import.meta.glob(
  "../assets/products/*.jpg",
  { eager: true, query: "?url", import: "default" },
) as Record<string, string>;
const productImg = (slug: string): string | null => {
  const entry = Object.entries(PRODUCT_IMAGES).find(([k]) => k.endsWith(`/${slug}.jpg`));
  return entry ? entry[1] : null;
};

export const products: Product[] = [
  {
    slug: "amrapali-mango-grafted",
    name: "আম্রপালি আম (গ্রাফটিং)",
    nameBn: "আম্রপালি আম (গ্রাফটিং)",
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
    badges: ["বেস্ট সেলার", "গ্রাফটিং"],
    shortDescription: "বামন, উচ্চ ফলনশীল আম — ২ বছরে ফল দেয়।",
    description:
      "আম্রপালি একটি বামন, নিয়মিত ফলদায়ক হাইব্রিড আম। মিষ্টি, আঁশহীন ও গাঢ় কমলা শাঁস। ছাদ ও ছোট বাগানের জন্য আদর্শ। বোম্বাই রুটস্টকে গ্রাফটিং করা — দ্রুত ফল দেয়।",
    height: "২.৫ – ৩ ফুট",
    age: "১২ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "haribhanga-mango",
    name: "হাঁড়িভাঙ্গা আম",
    nameBn: "হাঁড়িভাঙ্গা আম",
    category: "mango",
    price: 780,
    rating: 4.8,
    reviews: 142,
    image: img("photo-1591735026282-bb24fd6c0451"),
    gallery: [img("photo-1591735026282-bb24fd6c0451")],
    badges: ["গ্রাফটিং"],
    shortDescription: "রংপুরের ঐতিহ্যবাহী সুগন্ধি আম।",
    description:
      "রংপুরের আসল হাঁড়িভাঙ্গা। বড়, আঁশহীন, প্রচণ্ড মিষ্টি ও সুগন্ধি ফল। মাতৃ গাছ থেকে গ্রাফটিং করা চারা।",
    height: "৩ – ৩.৫ ফুট",
    age: "১৪ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "seedless-lemon",
    name: "বীজহীন লেবু",
    nameBn: "বীজহীন লেবু",
    category: "citrus",
    price: 420,
    oldPrice: 520,
    rating: 4.7,
    reviews: 89,
    image: img("photo-1591287083773-9a52902db5f0"),
    gallery: [img("photo-1591287083773-9a52902db5f0")],
    badges: ["বেস্ট সেলার"],
    shortDescription: "সারা বছর রসালো লেবু, বীজ নেই।",
    description:
      "কম্প্যাক্ট, কাঁটাবিহীন জাত — সারা বছর ফল দেয়। পাতলা খোসা, প্রচুর রস ও বীজহীন। রান্নাঘরের বাগানের জন্য আদর্শ।",
    height: "১.৫ – ২ ফুট",
    age: "৮ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "darjeeling-orange",
    name: "দার্জিলিং কমলা",
    nameBn: "দার্জিলিং কমলা",
    category: "citrus",
    price: 950,
    rating: 4.6,
    reviews: 54,
    image: img("photo-1582979512210-99b6a53386f9"),
    gallery: [img("photo-1582979512210-99b6a53386f9")],
    badges: ["লিমিটেড", "গ্রাফটিং"],
    shortDescription: "মিষ্টি, সহজে খোসা ছাড়ানো পাহাড়ি কমলা।",
    description:
      "দার্জিলিং অঞ্চলের মাতৃ গাছ থেকে চাষ। মিষ্টি-টক রসালো কমলা, ঢিলেঢালা খোসা। শীতল আবহাওয়ায় ভালো জন্মায়।",
    height: "২ – ২.৫ ফুট",
    age: "১৬ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "মাঝারি",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "thai-pink-guava",
    name: "থাই পিংক পেয়ারা",
    nameBn: "থাই পিংক পেয়ারা",
    category: "guava",
    price: 380,
    rating: 4.8,
    reviews: 167,
    image: img("photo-1633380110125-f6e685676160"),
    gallery: [img("photo-1633380110125-f6e685676160")],
    badges: ["বেস্ট সেলার", "অর্গানিক"],
    shortDescription: "গোলাপি শাঁসের মুচমুচে পেয়ারা, প্রচুর ফলন।",
    description:
      "প্রাণবন্ত থাই জাত — গোলাপি শাঁস, মুচমুচে গঠন, খুব মিষ্টি। রোপণের ৮ মাসের মধ্যেই ফল দেওয়া শুরু করে।",
    height: "২ – ২.৫ ফুট",
    age: "১০ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "bedana-litchi",
    name: "বেদানা লিচু",
    nameBn: "বেদানা লিচু",
    category: "litchi",
    price: 1200,
    oldPrice: 1450,
    rating: 4.9,
    reviews: 73,
    image: img("photo-1629828874514-e1ad6f1de1f5"),
    gallery: [img("photo-1629828874514-e1ad6f1de1f5")],
    badges: ["লিমিটেড", "গ্রাফটিং"],
    shortDescription: "ছোট বীজ, মোটা শাঁসের প্রিমিয়াম লিচু।",
    description:
      "সবচেয়ে প্রিমিয়াম লিচু জাত — অত্যন্ত ছোট বীজ, মোটা রসালো শাঁস, গাঢ় লাল খোসা। এয়ার-লেয়ারিং করা যেন প্রকৃত ফল হয়।",
    height: "২.৫ – ৩ ফুট",
    age: "১৮ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "মাঝারি",
    sunlight: "পূর্ণ রোদ",
    water: "বেশি",
  },
  {
    slug: "red-dragon-fruit",
    name: "রেড ড্রাগন ফল",
    nameBn: "রেড ড্রাগন ফল",
    category: "tropical",
    price: 550,
    rating: 4.7,
    reviews: 198,
    image: img("photo-1610917040803-1fccf9623064"),
    gallery: [img("photo-1610917040803-1fccf9623064")],
    badges: ["বেস্ট সেলার", "নতুন"],
    shortDescription: "উজ্জ্বল লাল শাঁসের অ্যান্টিঅক্সিডেন্ট সমৃদ্ধ সুপারফল।",
    description:
      "স্ব-পরাগায়িত রেড-শাঁস ড্রাগন ফলের কাটিং। খরা সহিষ্ণু, ১২–১৪ মাসে ফল দেয়। বেটালেইন ও অ্যান্টিঅক্সিডেন্টে ভরপুর।",
    height: "১.৫ – ২ ফুট",
    age: "৬ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "কম",
  },
  {
    slug: "rambutan",
    name: "রাম্বুটান",
    nameBn: "রাম্বুটান",
    category: "tropical",
    price: 1450,
    rating: 4.6,
    reviews: 41,
    image: img("photo-1591287083773-9a52902db5f0"),
    gallery: [img("photo-1591287083773-9a52902db5f0")],
    badges: ["লিমিটেড", "গ্রাফটিং"],
    shortDescription: "মিষ্টি, লিচু-সদৃশ দক্ষিণ-পূর্ব এশিয়ার দুর্লভ ফল।",
    description:
      "মালয়েশিয়ার মাতৃ গাছ থেকে দুর্লভ গ্রাফটিং রাম্বুটান। লিচুর মতো মিষ্টি স্বচ্ছ শাঁস, কাঁটাযুক্ত লাল খোসা।",
    height: "২.৫ – ৩ ফুট",
    age: "২০ মাস",
    potIncluded: true,
    inStock: false,
    careLevel: "এক্সপার্ট",
    sunlight: "পূর্ণ রোদ",
    water: "বেশি",
  },
  {
    slug: "monstera-deliciosa",
    name: "মনস্টেরা ডেলিসিওসা",
    nameBn: "মনস্টেরা ডেলিসিওসা",
    category: "indoor",
    price: 890,
    oldPrice: 1100,
    rating: 4.9,
    reviews: 312,
    image: img("photo-1485955900006-10f4d324d411"),
    gallery: [img("photo-1485955900006-10f4d324d411")],
    badges: ["বেস্ট সেলার"],
    shortDescription: "আইকনিক স্প্লিট-লিফ স্টেটমেন্ট গাছ।",
    description:
      "ইনস্টাগ্রামে বিখ্যাত মূল গাছ। বড় ছিদ্রযুক্ত পাতা, দ্রুত বাড়ে, কম থেকে উজ্জ্বল পরোক্ষ আলো সহ্য করে।",
    height: "১.৫ – ২ ফুট",
    age: "১০ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "ইনডোর উজ্জ্বল",
    water: "মাঝারি",
  },
  {
    slug: "snake-plant",
    name: "স্নেক প্ল্যান্ট",
    nameBn: "স্নেক প্ল্যান্ট",
    category: "indoor",
    price: 320,
    rating: 4.8,
    reviews: 421,
    image: img("photo-1593482892290-f54927ae1bb6"),
    gallery: [img("photo-1593482892290-f54927ae1bb6")],
    badges: ["বেস্ট সেলার", "অর্গানিক"],
    shortDescription: "প্রায় অবিনাশী বায়ু পরিশোধক।",
    description:
      "NASA-স্বীকৃত বায়ু পরিশোধক। অযত্ন, কম আলো ও কম পানিতেও বাঁচে। রাতে অক্সিজেন ছাড়ে।",
    height: "১ – ১.৫ ফুট",
    age: "৮ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "ইনডোর উজ্জ্বল",
    water: "কম",
  },
  {
    slug: "desi-rose",
    name: "দেশি গোলাপ (মিশ্র রঙ)",
    nameBn: "দেশি গোলাপ (মিশ্র রঙ)",
    category: "flowering",
    price: 250,
    rating: 4.5,
    reviews: 188,
    image: img("photo-1490750967868-88aa4486c946"),
    gallery: [img("photo-1490750967868-88aa4486c946")],
    badges: ["নতুন"],
    shortDescription: "সুগন্ধি ঐতিহ্যবাহী গোলাপ, সারা বছর ফোটে।",
    description:
      "শক্ত দেশি গোলাপ — তীব্র সুগন্ধ এবং নিরন্তর ফুল। মিশ্র গোলাপি, লাল ও সাদা রঙে পাওয়া যায়।",
    height: "১ – ১.৫ ফুট",
    age: "৬ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  {
    slug: "tulsi-krishna",
    name: "কৃষ্ণ তুলসী",
    nameBn: "কৃষ্ণ তুলসী",
    category: "herbs",
    price: 120,
    rating: 4.9,
    reviews: 267,
    image: img("photo-1466692476868-aef1dfb1e735"),
    gallery: [img("photo-1466692476868-aef1dfb1e735")],
    badges: ["বেস্ট সেলার", "অর্গানিক"],
    shortDescription: "পবিত্র ভেষজ গাছ, রোগ প্রতিরোধ বাড়ায়।",
    description:
      "আসল কৃষ্ণ তুলসী — গাঢ় বেগুনি পাতা। তীব্র সুগন্ধ, প্রচলিত ঔষধ ও দৈনন্দিন চা-তে ব্যবহৃত।",
    height: "০.৮ – ১ ফুট",
    age: "৪ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  },
  // ── More Mango (8) ──
  ...mk("mango", [
    ["bari-4-mango", "বারি-৪ আম", 720, "photo-1605027990121-cbae9e0642db", "বারোমাসি, দেরিতে পাকা মিষ্টি আম।"],
    ["langra-mango", "ল্যাংড়া আম", 690, "photo-1591735026282-bb24fd6c0451", "ঐতিহ্যবাহী সুগন্ধি ল্যাংড়া জাত।"],
    ["fazli-mango", "ফজলি আম", 760, "photo-1553279768-865429fa0078", "বড় আকারের রাজশাহীর ঐতিহ্য।"],
    ["himsagar-mango", "হিমসাগর আম", 820, "photo-1591735026282-bb24fd6c0451", "মিষ্টি, আঁশহীন প্রিমিয়াম জাত।"],
    ["gopalbhog-mango", "গোপালভোগ আম", 700, "photo-1605027990121-cbae9e0642db", "প্রথম পাকা সুগন্ধি আম।"],
    ["katimon-mango", "কাটিমন আম (বারোমাসি)", 950, "photo-1553279768-865429fa0078", "সারা বছর ফল দেয়।"],
    ["banana-mango", "ব্যানানা আম", 880, "photo-1591735026282-bb24fd6c0451", "কলার মত লম্বা দুর্লভ জাত।"],
    ["miyazaki-mango", "মিয়াজাকি আম", 2500, "photo-1605027990121-cbae9e0642db", "জাপানের বিশ্বখ্যাত প্রিমিয়াম আম।"],
  ]),
  // ── More Citrus (8) ──
  ...mk("citrus", [
    ["malta-orange", "মাল্টা", 480, "photo-1591287083773-9a52902db5f0", "রসালো বারোমাসি মাল্টা।"],
    ["kagzi-lemon", "কাগজি লেবু", 280, "photo-1582979512210-99b6a53386f9", "পাতলা খোসা, বেশি রস।"],
    ["pomelo", "জাম্বুরা", 550, "photo-1591287083773-9a52902db5f0", "মিষ্টি লাল শাঁসের জাম্বুরা।"],
    ["mandarin-orange", "চায়না কমলা", 720, "photo-1582979512210-99b6a53386f9", "ছোট মিষ্টি কমলা।"],
    ["kaffir-lime", "কাফির লাইম", 380, "photo-1591287083773-9a52902db5f0", "সুগন্ধি পাতা ও ফল।"],
    ["bari-lemon-1", "বারি লেবু-১", 320, "photo-1582979512210-99b6a53386f9", "উচ্চ ফলনশীল দেশি জাত।"],
    ["grape-fruit", "গ্রেপফ্রুট", 620, "photo-1591287083773-9a52902db5f0", "গোলাপি শাঁসের সাইট্রাস।"],
    ["nagpur-orange", "নাগপুর কমলা", 850, "photo-1582979512210-99b6a53386f9", "ভারতের বিখ্যাত মিষ্টি কমলা।"],
  ]),
  // ── More Guava (9) ──
  ...mk("guava", [
    ["bari-guava-2", "বারি পেয়ারা-২", 320, "photo-1633380110125-f6e685676160", "দেশি উচ্চ ফলনশীল জাত।"],
    ["seedless-guava", "বীজহীন পেয়ারা", 450, "photo-1633380110125-f6e685676160", "নরম, বীজহীন মিষ্টি জাত।"],
    ["red-flesh-guava", "লাল শাঁস পেয়ারা", 480, "photo-1633380110125-f6e685676160", "গাঢ় লাল শাঁস, ভিটামিন-সমৃদ্ধ।"],
    ["kazi-guava", "কাজি পেয়ারা", 290, "photo-1633380110125-f6e685676160", "বড় আকারের দেশি জাত।"],
    ["thai-7-guava", "থাই-৭ পেয়ারা", 420, "photo-1633380110125-f6e685676160", "মুচমুচে ও মিষ্টি।"],
    ["apple-guava", "আপেল পেয়ারা", 460, "photo-1633380110125-f6e685676160", "আপেলের মত গোলাকার পেয়ারা।"],
    ["taiwan-pink-guava", "তাইওয়ান পিংক", 510, "photo-1633380110125-f6e685676160", "তাইওয়ানি গোলাপি শাঁস।"],
    ["lalit-guava", "ললিত পেয়ারা", 380, "photo-1633380110125-f6e685676160", "ভারতীয় লাল-গোলাপি জাত।"],
    ["vietnam-super-guava", "ভিয়েতনাম সুপার", 540, "photo-1633380110125-f6e685676160", "বড় ফল, দ্রুত ফলন।"],
  ]),
  // ── More Litchi (9) ──
  ...mk("litchi", [
    ["china-3-litchi", "চায়না-৩ লিচু", 950, "photo-1629828874514-e1ad6f1de1f5", "জনপ্রিয় মিষ্টি লিচু।"],
    ["bombai-litchi", "বোম্বাই লিচু", 880, "photo-1629828874514-e1ad6f1de1f5", "প্রথম পাকা ঐতিহ্যবাহী জাত।"],
    ["mozaffarpur-litchi", "মুজাফফরপুর লিচু", 1050, "photo-1629828874514-e1ad6f1de1f5", "বিহারের বিখ্যাত জাত।"],
    ["vietnam-longan", "ভিয়েতনাম লংগান", 1350, "photo-1629828874514-e1ad6f1de1f5", "দুর্লভ মিষ্টি লংগান।"],
    ["madras-litchi", "মাদ্রাজি লিচু", 920, "photo-1629828874514-e1ad6f1de1f5", "মাঝারি আকারের সুমিষ্ট।"],
    ["thai-longan", "থাই লংগান", 1280, "photo-1629828874514-e1ad6f1de1f5", "থাইল্যান্ডের মিষ্টি লংগান।"],
    ["green-litchi", "সবুজ লিচু", 1100, "photo-1629828874514-e1ad6f1de1f5", "দুর্লভ সবুজ খোসার জাত।"],
    ["kim-cheng-longan", "কিম চেং লংগান", 1450, "photo-1629828874514-e1ad6f1de1f5", "প্রিমিয়াম তাইওয়ান লংগান।"],
    ["calcuttia-litchi", "কলকাত্তি লিচু", 980, "photo-1629828874514-e1ad6f1de1f5", "মোটা শাঁসের কলকাতা জাত।"],
  ]),
  // ── More Tropical (8) ──
  ...mk("tropical", [
    ["white-dragon-fruit", "সাদা ড্রাগন ফল", 480, "photo-1610917040803-1fccf9623064", "সাদা শাঁসের ড্রাগন।"],
    ["yellow-dragon-fruit", "হলুদ ড্রাগন ফল", 750, "photo-1610917040803-1fccf9623064", "দুর্লভ হলুদ জাত।"],
    ["mangosteen", "ম্যাঙ্গোস্টিন", 1850, "photo-1610917040803-1fccf9623064", "‘ফলের রানী’ — দক্ষিণ-পূর্ব এশিয়ার দুর্লভ।"],
    ["durian", "ডুরিয়ান", 2200, "photo-1610917040803-1fccf9623064", "‘ফলের রাজা’, তীব্র গন্ধ।"],
    ["passion-fruit", "প্যাশন ফল", 380, "photo-1610917040803-1fccf9623064", "টক-মিষ্টি জুসি ফল।"],
    ["avocado", "অ্যাভোকাডো", 1250, "photo-1610917040803-1fccf9623064", "স্বাস্থ্যকর হাস জাত।"],
    ["star-fruit", "কামরাঙা", 320, "photo-1610917040803-1fccf9623064", "তারকা আকৃতির বাংলার ফল।"],
    ["jabuticaba", "জাবোটিকাবা", 1650, "photo-1610917040803-1fccf9623064", "কান্ডে ফল ধরা ব্রাজিলিয়ান।"],
  ]),
  // ── More Indoor (8) ──
  ...mk("indoor", [
    ["zz-plant", "জেডজেড প্ল্যান্ট", 450, "photo-1593482892290-f54927ae1bb6", "অযত্ন-সহিষ্ণু চকচকে পাতা।"],
    ["peace-lily", "পিস লিলি", 380, "photo-1485955900006-10f4d324d411", "সাদা ফুল, বায়ু পরিশোধক।"],
    ["pothos-golden", "গোল্ডেন পোথোস", 220, "photo-1485955900006-10f4d324d411", "লতানো সহজ ইনডোর গাছ।"],
    ["fiddle-leaf-fig", "ফিডল লিফ ফিগ", 1450, "photo-1485955900006-10f4d324d411", "স্টেটমেন্ট বড় পাতার গাছ।"],
    ["areca-palm", "এরিকা পাম", 650, "photo-1485955900006-10f4d324d411", "ঘরের জন্য বায়ু পরিশোধক পাম।"],
    ["spider-plant", "স্পাইডার প্ল্যান্ট", 250, "photo-1593482892290-f54927ae1bb6", "সহজ যত্ন, বেবি প্ল্যান্ট দেয়।"],
    ["rubber-plant", "রাবার প্ল্যান্ট", 520, "photo-1485955900006-10f4d324d411", "চকচকে গাঢ় সবুজ পাতা।"],
    ["philodendron-pink", "ফিলোডেনড্রন পিংক", 1850, "photo-1485955900006-10f4d324d411", "দুর্লভ গোলাপি ভ্যারিগেটেড।"],
  ]),
  // ── More Flowering (9) ──
  ...mk("flowering", [
    ["english-rose", "ইংলিশ রোজ", 480, "photo-1490750967868-88aa4486c946", "বড় ফুল, মিষ্টি সুগন্ধ।"],
    ["bougainvillea", "বাগানবিলাস", 320, "photo-1490750967868-88aa4486c946", "রঙিন বারোমাসি লতা।"],
    ["hibiscus-red", "লাল জবা", 220, "photo-1490750967868-88aa4486c946", "ঐতিহ্যবাহী দেশি জবা।"],
    ["jasmine-arabian", "আরবি বেলি", 280, "photo-1490750967868-88aa4486c946", "তীব্র সুগন্ধি সাদা ফুল।"],
    ["adenium", "অ্যাডেনিয়াম", 650, "photo-1490750967868-88aa4486c946", "ডেজার্ট রোজ, বনসাই উপযোগী।"],
    ["plumeria", "কাঠগোলাপ", 420, "photo-1490750967868-88aa4486c946", "হাওয়াইয়ান সুগন্ধি ফুল।"],
    ["marigold-african", "আফ্রিকান গাঁদা", 150, "photo-1490750967868-88aa4486c946", "বড় হলুদ-কমলা ফুল।"],
    ["champa-flower", "চাঁপা", 380, "photo-1490750967868-88aa4486c946", "সুবাসিত হলুদ চাঁপা ফুল।"],
    ["dahlia", "ডালিয়া", 320, "photo-1490750967868-88aa4486c946", "বড় শীতকালীন ফুল।"],
  ]),
  // ── More Herbs (9) ──
  ...mk("herbs", [
    ["mint-pudina", "পুদিনা", 80, "photo-1466692476868-aef1dfb1e735", "রান্নাঘরের জন্য সহজ ভেষজ।"],
    ["curry-leaf", "কারি পাতা", 180, "photo-1466692476868-aef1dfb1e735", "দক্ষিণ ভারতীয় রান্নার মসলা।"],
    ["black-pepper", "কালো গোলমরিচ", 420, "photo-1466692476868-aef1dfb1e735", "লতানো মসলা গাছ।"],
    ["aloe-vera", "এলোভেরা", 150, "photo-1466692476868-aef1dfb1e735", "ত্বক ও স্বাস্থ্য উপকারী।"],
    ["lemongrass", "লেমনগ্রাস", 120, "photo-1466692476868-aef1dfb1e735", "সুগন্ধি চা ও ওষুধি ঘাস।"],
    ["ashwagandha", "অশ্বগন্ধা", 220, "photo-1466692476868-aef1dfb1e735", "আয়ুর্বেদিক শক্তিদায়ক ভেষজ।"],
    ["bay-leaf", "তেজপাতা", 280, "photo-1466692476868-aef1dfb1e735", "রান্নার সুগন্ধি পাতা।"],
    ["stevia", "স্টেভিয়া", 240, "photo-1466692476868-aef1dfb1e735", "প্রাকৃতিক মিষ্টি পাতা।"],
    ["neem", "নিম", 180, "photo-1466692476868-aef1dfb1e735", "ঔষধি জীবাণুনাশক গাছ।"],
  ]),
];

function mk(
  category: string,
  rows: [string, string, number, string, string][],
): Product[] {
  return rows.map(([slug, name, price, photoId, desc]) => ({
    slug,
    name,
    nameBn: name,
    category,
    price,
    rating: 4.5 + ((slug.length % 5) / 10),
    reviews: 40 + (slug.length * 7) % 220,
    image: img(photoId),
    gallery: [img(photoId)],
    shortDescription: desc,
    description: desc,
    height: "১.৫ – ২.৫ ফুট",
    age: "৮ – ১২ মাস",
    potIncluded: true,
    inStock: true,
    careLevel: "সহজ",
    sunlight: "পূর্ণ রোদ",
    water: "মাঝারি",
  }));
}


export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCategory = (slug: string) =>
  products.filter((p) => p.category === slug);

export const bestsellers = () =>
  products.filter((p) => p.badges?.includes("বেস্ট সেলার"));

export const newArrivals = () =>
  products.filter((p) => p.badges?.includes("নতুন"));
