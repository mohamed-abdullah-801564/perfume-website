export type Product = {
  slug: string;
  name: string;
  shortName: string;
  price: string;
  priceValue: number;
  category: string;
  collectionTags: string[];
  thumbnailSrc: string;
  featuredSrc: string;
  detailSrc: string;
  detailAlt: string;
  description: string;
  sizes: string[];
  steps: string[];
  faqs: string[];
};

export type Collection = {
  slug: string;
  label: string;
  category: string;
  cardImage: string;
  heroImage: string;
  alt: string;
};

const defaultFaqs = [
  "Is this product suitable for daily use?",
  "Can it be used by all age groups?",
  "Is this made with traditional ingredients?",
  "How should I store this product?",
  "How often should I use it?",
];

export const products: Product[] = [
  {
    slug: "rosemary-oil",
    name: "Rosemary Oil",
    shortName: "Rosemary oil",
    price: "₹ 240",
    priceValue: 240,
    category: "Oils",
    collectionTags: ["New Arrivals"],
    thumbnailSrc: "/images/product-2-68e613.png",
    featuredSrc: "/images/product-rosemary-62e953.png",
    detailSrc: "/images/product-rosemary-62e953.png",
    detailAlt: "Anna Valam Rosemary Oil bottle",
    description:
      "A botanical hair oil crafted with rosemary care to nourish the scalp, support stronger-looking hair, and bring a fresh herbal ritual into everyday wellness.",
    sizes: ["100ml", "200ml", "500ml"],
    steps: [
      "Apply a small amount to the scalp and hair lengths.",
      "Massage gently for a few minutes.",
      "Leave for 30 minutes or overnight before washing.",
      "Use two to three times a week.",
    ],
    faqs: defaultFaqs,
  },
  {
    slug: "multigrain-health-mix",
    name: "Multigrain Health Mix",
    shortName: "Health mix",
    price: "₹ 180",
    priceValue: 180,
    category: "Health mixes",
    collectionTags: ["New Arrivals"],
    thumbnailSrc: "/images/product-1-2b9d79.png",
    featuredSrc: "/images/multigrain health mix.png",
    detailSrc: "/images/multigrain health mix.png",
    detailAlt: "Anna Valam Multigrain Health Mix pouch",
    description:
      "A traditional wellness blend made with grains and millets for a nourishing breakfast ritual with natural energy, fiber, and everyday comfort.",
    sizes: ["250g", "500g", "1kg"],
    steps: [
      "Mix two spoons of powder in water or milk.",
      "Stir well and cook on low heat.",
      "Add palm sugar or salt as preferred.",
      "Serve warm as a breakfast meal.",
    ],
    faqs: defaultFaqs,
  },
  {
    slug: "glowing-face-pack",
    name: "Herbal Wellness Glowing Face Pack",
    shortName: "Face pack",
    price: "₹ 190",
    priceValue: 190,
    category: "Face packs",
    collectionTags: ["On Sale"],
    thumbnailSrc: "/images/product-3.png",
    featuredSrc: "/images/card-product.png",
    detailSrc: "/images/card-product.png",
    detailAlt: "Anna Valam Glowing Face Pack pouch",
    description:
      "A herbal face pack made with skin-friendly botanicals to support a natural glow, purifying care, and a gentle traditional skincare ritual.",
    sizes: ["100g", "250g", "500g"],
    steps: [
      "Mix one spoon of powder with rose water or curd.",
      "Apply an even layer on clean skin.",
      "Leave for 10 to 15 minutes.",
      "Rinse gently and pat dry.",
    ],
    faqs: defaultFaqs,
  },
  {
    slug: "black-rice-porridge-mix",
    name: "Karuppukavuni Kanji Mix / Black Rice Porridge Mix",
    shortName: "Wellness mix",
    price: "₹ 260",
    priceValue: 260,
    category: "Health mixes",
    collectionTags: ["On Sale"],
    thumbnailSrc: "/images/product-4-784bf1.png",
    featuredSrc: "/images/karuppukavuni kanji mix black rice porridge mix.png",
    detailSrc: "/images/karuppukavuni kanji mix black rice porridge mix.png",
    detailAlt: "Anna Valam Karuppukavuni Kanji Mix pouch",
    description:
      "Traditional health blend made with ancient rice varieties, millets, and horse gram to support natural wellness, healthy digestion, energy, and weight management. Rich in fiber, iron, and essential nutrients, it is a wholesome and nourishing breakfast choice for all age groups.",
    sizes: ["250g", "500g", "1kg"],
    steps: [
      "Mix two spoons of powder in water.",
      "Add a pinch of salt and pepper.",
      "Stir well and cook for five minutes on low heat.",
      "Consume warm as a breakfast meal.",
    ],
    faqs: defaultFaqs,
  },
];

export const categoryOrder = ["Oils", "Health mixes", "Face packs"];

export const collections: Collection[] = [
  {
    slug: "health-mix",
    label: "Health Mix",
    category: "Health mixes",
    cardImage: "/brand-images/Rectangle 26.png",
    heroImage: "/brand-images/Rectangle 26.png",
    alt: "Health mix preparation",
  },
  {
    slug: "face-packs",
    label: "Face packs",
    category: "Face packs",
    cardImage: "/brand-images/Rectangle 28.png",
    heroImage: "/brand-images/Rectangle 28.png",
    alt: "Face pack being applied",
  },
  {
    slug: "oils",
    label: "Oils",
    category: "Oils",
    cardImage: "/brand-images/Rectangle 27.png",
    heroImage: "/brand-images/Rectangle 27.png",
    alt: "Hair oil care",
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getFirstProductByCategory(category: string) {
  return products.find((product) => product.category === category);
}

export function getCollectionBySlug(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProductsByCategory(category: string) {
  return products.filter((product) => product.category === category);
}
