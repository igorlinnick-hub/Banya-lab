export type PriceUnit = "flat" | "per_person" | "per_day";

export type AddOn = {
  id: string;
  name: string;
  description?: string;
  price: number;
  perPerson?: boolean;
};

export type ServiceVariant = {
  id: string;
  name: string;
  description?: string;
  price: number;
  priceUnit: PriceUnit;
};

export type Service = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  basePrice: number;
  priceUnit: PriceUnit;
  minPeople?: number;
  maxPeople?: number;
  durationHours?: number;
  schedule?: string;
  hero: string;
  includes: string[];
  addOns: AddOn[];
  variants?: ServiceVariant[];
  contact?: { name: string; instagram?: string };
  calendlyUrl: string;
};

export const CALENDLY = {
  fridayFireworks: "https://calendly.com/maksimzap8/friday-fireworks-boat",
  harborSauna: "https://calendly.com/maksimzap8/harbor-sauna",
  privateRomantic: "https://calendly.com/maksimzap8/private-boat-service",
  oneOnOne: "https://calendly.com/maksimzap8/1-on-1-banya-ritual",
  boatParty: "https://calendly.com/maksimzap8/sunday-boat-party",
  retreat: "https://calendly.com/maksimzap8/banya-lab-retreat",
  oceanCruise: "https://calendly.com/maksimzap8/ocean-cruise",
  kamaainaHarbor: "https://calendly.com/maksimzap8/kama-aina-harbor-banya",
};

const COMMON_ADDONS = {
  food: {
    id: "food-slavic",
    name: "Slavic dishes (made to order)",
    description: "Pierogi, borscht, blini — custom menu on request",
    price: 100,
  } satisfies AddOn,
  liveMusic: {
    id: "live-music",
    name: "Live musician",
    description: "Custom live songs on request",
    price: 100,
  } satisfies AddOn,
  dj: {
    id: "dj",
    name: "DJ set",
    price: 400,
  } satisfies AddOn,
  juices: {
    id: "natural-juices",
    name: "Natural cold-pressed juices",
    price: 12,
    perPerson: true,
  } satisfies AddOn,
  healer: {
    id: "healer-session",
    name: "Full healer session (Ukrainian venik)",
    description: "Maksim's signature healing work with oak/birch veniks",
    price: 250,
  } satisfies AddOn,
  champagne: {
    id: "champagne",
    name: "Champagne bottle",
    price: 120,
  } satisfies AddOn,
  wine: {
    id: "fine-wine",
    name: "Fine wine bottle",
    price: 95,
  } satisfies AddOn,
  fruits: {
    id: "fruit-platter",
    name: "Seasonal fruit platter",
    price: 45,
  } satisfies AddOn,
  roses: {
    id: "roses",
    name: "Rose petals on the boat",
    price: 75,
  } satisfies AddOn,
  sauna: {
    id: "mobile-sauna",
    name: "Mobile banya onboard",
    description: "Hot banya setup on the boat for your session",
    price: 200,
  } satisfies AddOn,
  iceBath: {
    id: "ice-bath",
    name: "Ice bath plunge",
    price: 40,
    perPerson: true,
  } satisfies AddOn,
  massage: {
    id: "massage",
    name: "Massage · Lomi-Lomi or yoga therapy",
    description: "On-site bodywork by a certified practitioner",
    price: 100,
    perPerson: true,
  } satisfies AddOn,
  photographer: {
    id: "photographer",
    name: "Professional photographer",
    description: "Underwater and aerial (drone) coverage of your session",
    price: 200,
  } satisfies AddOn,
  soundHealing: {
    id: "sound-healing",
    name: "Sound healing",
    description: "Guided sound therapy session onboard",
    price: 100,
  } satisfies AddOn,
};

export const SERVICES: Service[] = [
  {
    id: "friday-fireworks",
    slug: "friday-fireworks",
    name: "Friday Fireworks Boat",
    tagline: "Sunset ocean sauna + Waikiki fireworks",
    description:
      "Every Friday: ocean cruise at sunset, hot banya with Ukrainian veniks, ice bath, and front-row view of the Waikiki fireworks show.",
    basePrice: 99,
    priceUnit: "per_person",
    schedule: "Fridays · sunset to fireworks",
    durationHours: 3,
    hero: "/media/friday-fireworks/hero.jpg",
    includes: [
      "Ocean cruise at sunset",
      "Traditional banya session",
      "Ice bath plunge",
      "Fireworks show viewing",
    ],
    variants: [
      {
        id: "shared",
        name: "Shared boat",
        price: 99,
        priceUnit: "per_person",
      },
      {
        id: "private",
        name: "Private charter",
        description: "Your group only",
        price: 300,
        priceUnit: "per_person",
      },
    ],
    addOns: [
      COMMON_ADDONS.food,
      COMMON_ADDONS.liveMusic,
      COMMON_ADDONS.juices,
      COMMON_ADDONS.healer,
      COMMON_ADDONS.photographer,
      COMMON_ADDONS.soundHealing,
    ],
    calendlyUrl: CALENDLY.fridayFireworks,
  },
  {
    id: "harbor-sauna",
    slug: "harbor-sauna",
    name: "Harbor Sauna Session",
    tagline: "Dockside banya, no cruise — pure healing work",
    description:
      "Two-hour dockside banya with Ukrainian venik healing, ice bath, and natural cold-pressed juices. Groups of 5 or more.",
    basePrice: 30,
    priceUnit: "per_person",
    minPeople: 5,
    durationHours: 2,
    schedule: "By appointment",
    hero: "/media/harbor-sauna/hero.jpg",
    includes: [
      "2-hour banya session",
      "Ukrainian venik healing work",
      "Ice bath plunge",
      "Natural juices",
    ],
    addOns: [
      COMMON_ADDONS.food,
      COMMON_ADDONS.healer,
      COMMON_ADDONS.juices,
      COMMON_ADDONS.massage,
      COMMON_ADDONS.soundHealing,
    ],
    calendlyUrl: CALENDLY.harborSauna,
  },
  {
    id: "honeymoon",
    slug: "honeymoon-private",
    name: "Honeymoon · Private Romantic",
    tagline: "Private sunset cruise for two",
    description:
      "A fully private, romantic ocean experience: sunset, rose petals on the boat, full banya with healing work, champagne, fine wine, fruits, Slavic bites, optional live music.",
    basePrice: 650,
    priceUnit: "flat",
    schedule: "Tuesdays & Thursdays (or by request)",
    durationHours: 3,
    hero: "/media/honeymoon/hero.jpg",
    includes: [
      "Fully private boat",
      "Sunset cruise",
      "Banya with full healing work",
      "Ice bath plunge",
    ],
    addOns: [
      COMMON_ADDONS.champagne,
      COMMON_ADDONS.wine,
      COMMON_ADDONS.fruits,
      { ...COMMON_ADDONS.food, name: "Slavic dishes for two (made to order)" },
      COMMON_ADDONS.liveMusic,
      COMMON_ADDONS.roses,
      COMMON_ADDONS.massage,
      COMMON_ADDONS.photographer,
      COMMON_ADDONS.soundHealing,
    ],
    calendlyUrl: CALENDLY.privateRomantic,
  },
  {
    id: "one-on-one",
    slug: "one-on-one-banya",
    name: "1-on-1 Banya Ritual",
    tagline: "Three hours of deep healing work",
    description:
      "A full 3-hour private ritual with Maksim: Ukrainian venik work, ice bath, cold-pressed juices, and one-on-one healing conversation. The deepest experience we offer.",
    basePrice: 450,
    priceUnit: "flat",
    durationHours: 3,
    schedule: "By appointment",
    hero: "/media/one-on-one/hero.jpg",
    includes: [
      "3 hours private",
      "Venik healing ritual",
      "Ice bath plunge",
      "Cold-pressed juices",
      "1-on-1 coaching conversation",
    ],
    addOns: [
      COMMON_ADDONS.food,
      COMMON_ADDONS.fruits,
      COMMON_ADDONS.massage,
      COMMON_ADDONS.soundHealing,
    ],
    contact: { name: "Maksim", instagram: "https://instagram.com/" },
    calendlyUrl: CALENDLY.oneOnOne,
  },
  {
    id: "ocean-cruise",
    slug: "ocean-cruise",
    name: "Ocean Cruise",
    tagline: "Your boat, your people, your pace",
    description:
      "A straight-up private ocean cruise — no theme, no schedule. Bring your people, pick your add-ons, and build the experience. Sunset, sauna, healer, food, music — it's all a la carte.",
    basePrice: 150,
    priceUnit: "per_person",
    schedule: "By appointment · any day",
    durationHours: 3,
    hero: "/media/ocean-cruise/hero.jpg",
    includes: ["Private charter", "Captain + crew", "Up to 3 hours on the water"],
    variants: [
      {
        id: "shared",
        name: "Join a shared cruise",
        description: "Pool with other guests",
        price: 150,
        priceUnit: "per_person",
      },
      {
        id: "private",
        name: "Private charter (flat)",
        description: "Your group only, up to 12",
        price: 900,
        priceUnit: "flat",
      },
    ],
    addOns: [
      COMMON_ADDONS.sauna,
      COMMON_ADDONS.iceBath,
      COMMON_ADDONS.healer,
      COMMON_ADDONS.massage,
      COMMON_ADDONS.soundHealing,
      COMMON_ADDONS.photographer,
      COMMON_ADDONS.food,
      COMMON_ADDONS.fruits,
      COMMON_ADDONS.juices,
      COMMON_ADDONS.liveMusic,
      COMMON_ADDONS.dj,
      COMMON_ADDONS.champagne,
      COMMON_ADDONS.wine,
      COMMON_ADDONS.roses,
    ],
    calendlyUrl: CALENDLY.oceanCruise,
  },
  {
    id: "boat-party",
    slug: "boat-party",
    name: "Sunday Boat Party",
    tagline: "Two boats · DJ · sauna · sober vibes",
    description:
      "Monthly Sunday boat party: two boats, live DJ, disco, sauna, cold plunge. Alcohol-free — bring your own drinks allowed.",
    basePrice: 59,
    priceUnit: "per_person",
    schedule: "One Sunday per month",
    durationHours: 4,
    hero: "/media/boat-party/hero.jpg",
    includes: [
      "Two boats",
      "DJ + disco",
      "Sauna + ice bath",
      "BYO drinks welcome",
    ],
    variants: [
      {
        id: "standard",
        name: "Standard seat",
        price: 59,
        priceUnit: "per_person",
      },
      {
        id: "vip",
        name: "VIP seat (premium boat)",
        price: 150,
        priceUnit: "per_person",
      },
      {
        id: "group-charter",
        name: "Charter the premium boat (group)",
        description: "Ask at checkout — we'll confirm capacity",
        price: 1800,
        priceUnit: "flat",
      },
    ],
    addOns: [
      COMMON_ADDONS.food,
      COMMON_ADDONS.juices,
      COMMON_ADDONS.dj,
      COMMON_ADDONS.photographer,
    ],
    calendlyUrl: CALENDLY.boatParty,
  },
];

export const RETREAT_ADDONS: AddOn[] = [
  COMMON_ADDONS.food,
  COMMON_ADDONS.liveMusic,
  COMMON_ADDONS.healer,
  COMMON_ADDONS.juices,
  COMMON_ADDONS.fruits,
  COMMON_ADDONS.massage,
  COMMON_ADDONS.soundHealing,
  COMMON_ADDONS.photographer,
];

export const RETREAT = {
  id: "retreat",
  name: "Banya Lab Retreat",
  maxPeople: 12,
  basePrice: 800,
  fullDayPrice: 1000,
  coRetreatMinPeople: 5,
  coRetreatPricePerPerson: 200,
  coRetreatSplit: { host: 0.8, partner: 0.2 },
  addOns: RETREAT_ADDONS,
};

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
