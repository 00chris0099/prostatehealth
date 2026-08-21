// ============================================================
// Catálogo de productos — Import Health Virtual Store
// ============================================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  image: string;
  price: number;
  normalPrice: number;
  savings: number;
  rating: number;
  reviewCount: number;
  badge: string | null;
  badgeType: "popular" | "savings" | "new" | "default";
  desc: string;
  isAvailable: boolean;
  isBestSeller: boolean;
  packId: number;
  landingPage: string;
}

export interface Category {
  id: string;
  label: string;
  icon: "male" | "bone" | "zap" | "shield";
  description: string;
  available: boolean;
  productCount: number;
}

// ─── Productos ────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: "prostacare-1",
    slug: "prostacare-1-pack",
    name: "Prostacare",
    subtitle: "1 Pack — Tratamiento 30 Días",
    category: "salud-masculina",
    categoryLabel: "Salud Masculina",
    image: "/seccion2.png",
    price: 124,
    normalPrice: 190,
    savings: 66,
    rating: 4.9,
    reviewCount: 127,
    badge: "PRUEBA INICIAL",
    badgeType: "default",
    desc: "1 Frasco Cápsulas Saw Palmetto + 1 Sobre Parches Transdérmicos (30 Parches). Fórmula dual de acción rápida para el bienestar prostático.",
    isAvailable: true,
    isBestSeller: false,
    packId: 1,
    landingPage: "/prostacare",
  },
  {
    id: "prostacare-2",
    slug: "prostacare-2-packs",
    name: "Prostacare",
    subtitle: "2 Packs — Tratamiento 60 Días",
    category: "salud-masculina",
    categoryLabel: "Salud Masculina",
    image: "/pack%202.png",
    price: 214,
    normalPrice: 380,
    savings: 166,
    rating: 5.0,
    reviewCount: 243,
    badge: "MÁS POPULAR",
    badgeType: "popular",
    desc: "2 Frascos Cápsulas Saw Palmetto + 2 Sobres Parches Transdérmicos (60 Parches). El tratamiento más recomendado para resultados completos.",
    isAvailable: true,
    isBestSeller: true,
    packId: 2,
    landingPage: "/prostacare",
  },
  {
    id: "prostacare-3",
    slug: "prostacare-3-packs",
    name: "Prostacare",
    subtitle: "3 Packs — Tratamiento 90 Días",
    category: "salud-masculina",
    categoryLabel: "Salud Masculina",
    image: "/pack%203.png",
    price: 314,
    normalPrice: 570,
    savings: 256,
    rating: 4.9,
    reviewCount: 89,
    badge: "MEJOR AHORRO",
    badgeType: "savings",
    desc: "3 Frascos Cápsulas Saw Palmetto + 3 Sobres Parches Transdérmicos (90 Parches). Máximo ahorro para un tratamiento completo y definitivo.",
    isAvailable: true,
    isBestSeller: false,
    packId: 3,
    landingPage: "/prostacare",
  },
  {
    id: "nadplus-1",
    slug: "nadplus-ultimate",
    name: "Liposomal NAD+ Ultimate",
    subtitle: "60 Cápsulas Vegetarianas — 1 Mes",
    category: "energia",
    categoryLabel: "Energía y Vitalidad",
    image: "/nadplus/nadplus-main.svg",
    price: 189,
    normalPrice: 299,
    savings: 110,
    rating: 4.9,
    reviewCount: 287,
    badge: "NUEVO",
    badgeType: "new",
    desc: "Fórmula 10 en 1 con NAD+, Resveratrol, Glutatión y Astaxantina. Tecnología liposomal de alta absorción para energía celular y longevidad.",
    isAvailable: true,
    isBestSeller: false,
    packId: 1,
    landingPage: "/nadplus",
  },
];

// ─── Categorías ────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  {
    id: "salud-masculina",
    label: "Salud Masculina",
    icon: "male",
    description: "Próstata, vitalidad y bienestar masculino",
    available: true,
    productCount: 3,
  },
  {
    id: "articulaciones",
    label: "Articulaciones y Huesos",
    icon: "bone",
    description: "Flexibilidad, movilidad y alivio articular",
    available: false,
    productCount: 0,
  },
  {
    id: "energia",
    label: "Energía y Vitalidad",
    icon: "zap",
    description: "Suplementos para recobrar tu energía diaria",
    available: true,
    productCount: 1,
  },
  {
    id: "inmune",
    label: "Sistema Inmune",
    icon: "shield",
    description: "Fortalece tus defensas naturalmente",
    available: false,
    productCount: 0,
  },
];

// ─── Testimonios globales de la tienda ────────────────────────
export const STORE_TESTIMONIALS = [
  {
    name: "Don Pepe",
    detail: "64 años — Arequipa",
    initials: "DP",
    image: "/perfil/juan.jpg",
    rating: 5,
    quote:
      "Excelente servicio de ImportHealth, me trajeron mi producto hasta la puerta en Arequipa y pagué al recibir. Muy confiable. El repartidor fue super amable.",
  },
  {
    name: "Rosa M.",
    detail: "Esposa de cliente — Trujillo",
    initials: "RM",
    image: null,
    rating: 5,
    quote:
      "Lo pedí para mi esposo que no creía en estas cosas. Llegó en tres días a Trujillo, pagamos al recibirlo y ya nota la diferencia. Vamos a pedir más.",
  },
  {
    name: "Carlos V.",
    detail: "58 años — Lima",
    initials: "CV",
    image: "/perfil/carlos.jpg",
    rating: 5,
    quote:
      "Desconfiaba de comprar por internet, pero el sistema de pago contra entrega me convenció. El producto llegó tal como lo describían. ImportHealth cumple.",
  },
];
