import type { Product } from "../types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Aurum Chronograph Classic Two-Tone",
    category: "watches",
    categoryLabel: "Watches",
    brand: "Aurum Horology",
    description:
      "A classic Swiss automatic chronograph timepiece featuring 18K yellow gold accents, tachymeter bezel, deep charcoal dial, and brushed stainless steel jubilee bracelet. Procured via authorized Dubai Mall horology stockists with certificate of authenticity.",
    image: "/images/hero-watch.jpg",
    gallery: [
      "/images/hero-watch.jpg",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80",
    ],
    referenceUrl: "https://www.thedubaimall.com",
    priceNote: "Price on request",
    indicativePriceAED: 4850,
    variants: {
      colors: ["Two-Tone Gold & Steel", "All Steel Charcoal", "Rose Gold Edition"],
      sizes: ["40mm", "42mm"],
    },
    details: [
      "Movement: Automatic Swiss Chronograph",
      "Case: 40mm Stainless Steel & 18K Yellow Gold Bezel",
      "Dial: Sunburst Charcoal with Gold Indices",
      "Glass: Scratch-resistant Sapphire Crystal",
      "Included: Original Presentation Box & International Warranty Card",
    ],
    deliveryEstimate: "7–14 business days via insured air express",
  },
  {
    id: "p2",
    name: "Speedmaster Professional Co-Axial Master",
    category: "watches",
    categoryLabel: "Watches",
    brand: "Omega",
    description:
      "The legendary Moonwatch. Sourced directly from Dubai flagship boutiques with worldwide manufacturer guarantee, serial registration, and protective transportation seals.",
    image: "https://images.unsplash.com/photo-1547996160-71dfabb1d898?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547996160-71dfabb1d898?auto=format&fit=crop&w=1000&q=80",
      "/images/hero-watch.jpg",
    ],
    referenceUrl: "https://www.omega.com",
    priceNote: "Price on request",
    indicativePriceAED: 28500,
    variants: {
      sizes: ["42mm Hesalite", "42mm Sapphire Sandwich"],
    },
    details: [
      "Calibre: Manual-winding Omega Calibre 3861",
      "Certification: METAS Master Chronometer",
      "Bracelet: Five-arched-links brushed stainless steel",
      "Water Resistance: 5 bar (50 metres)",
    ],
    deliveryEstimate: "7–21 business days upon quote approval",
  },
  {
    id: "p3",
    name: "Classic Beige & Taupe Calfskin Top-Handle",
    category: "bags-accessories",
    categoryLabel: "Bags & Accessories",
    brand: "Maison Privée",
    description:
      "Handcrafted grained Italian calfskin handbag featuring signature lock hardware, structured silhouette, top handle, and detachable crossbody strap in timeless sand taupe.",
    image: "/images/hero-bag.jpg",
    gallery: [
      "/images/hero-bag.jpg",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80",
    ],
    referenceUrl: "https://www.bloomingdales.ae",
    priceNote: "Price on request",
    indicativePriceAED: 3600,
    variants: {
      colors: ["Biscotto & Ivory", "Noir Gold", "Etoupe Grain"],
    },
    details: [
      "Material: 100% Grained Calf Leather",
      "Hardware: Polished Gold-tone Brass with Padlock & Key Clochette",
      "Lining: Suede Microfiber Interior with Zip Compartment",
      "Origin: Made in Italy, sourced in UAE",
    ],
    deliveryEstimate: "7–14 business days",
  },
  {
    id: "p4",
    name: "Mini Jodie Woven Intrecciato Leather Bag",
    category: "bags-accessories",
    categoryLabel: "Bags & Accessories",
    brand: "Bottega Veneta",
    description:
      "Iconic soft nappa leather mini hobo bag crafted with signature Intrecciato weave, rounded shape, and knotted top handle. Procured in Dubai luxury department stores.",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80",
      "/images/hero-bag.jpg",
    ],
    priceNote: "Price on request",
    indicativePriceAED: 9200,
    variants: {
      colors: ["Caramel", "Almond", "Black", "Travertine Olive"],
    },
    details: [
      "Iconic Intrecciato lambskin weave",
      "Single compartment with zip closure",
      "Dimensions: 23cm x 28cm x 8cm",
      "Full boutique packaging and dust bag included",
    ],
    deliveryEstimate: "7–21 business days",
  },
  {
    id: "p5",
    name: "Ayala Dubai Eau de Parfum Niche Fragrance",
    category: "beauty-skincare",
    categoryLabel: "Beauty & Skincare",
    brand: "Ayala Parfums",
    description:
      "Warm amber, rare Taif rose, oud wood, and soft golden vanilla. Bottled in heavy fluted crystal glass with a solid brass cap. An authentic Gulf signature scent.",
    image: "/images/hero-perfume.jpg",
    gallery: [
      "/images/hero-perfume.jpg",
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1000&q=80",
    ],
    priceNote: "Price on request",
    indicativePriceAED: 890,
    variants: {
      sizes: ["100ml Eau de Parfum", "50ml Travel Extrait"],
    },
    details: [
      "Concentration: High Extrait 25%",
      "Top Notes: Bergamot, Pink Peppercorn, Cardamom",
      "Heart: Arabian Taif Rose, Golden Amber Resin",
      "Base: Cambodian Oud, Vanilla Pod, Cashmere Woods",
    ],
    deliveryEstimate: "7–14 business days",
  },
  {
    id: "p6",
    name: "Baccarat Rouge 540 Extrait de Parfum",
    category: "beauty-skincare",
    categoryLabel: "Beauty & Skincare",
    brand: "Maison Francis Kurkdjian",
    description:
      "Sourced from authorized Dubai luxury fragrance boutiques. The luminous amber floral fragrance in its highest concentration.",
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80",
      "/images/hero-perfume.jpg",
    ],
    priceNote: "Price on request",
    indicativePriceAED: 1850,
    variants: {
      sizes: ["70ml", "200ml"],
    },
    details: [
      "Grand Floridian Jasmine, Saffron, Bitter Almond, Cedarwood, Ambergris",
      "100% Genuine batch verified with receipt",
      "Pristine factory cellophane seal",
    ],
    deliveryEstimate: "7–21 business days",
  },
  {
    id: "p7",
    name: "Pure Linen & Cashmere Tailored Suit Set",
    category: "clothing",
    categoryLabel: "Clothing",
    brand: "Atelier Dubai",
    description:
      "Bespoke lightweight Italian linen outerwear trench and knit sweater set. Designed for warm climates with effortless luxury drape.",
    image: "/images/bento-clothing.jpg",
    gallery: [
      "/images/bento-clothing.jpg",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80",
    ],
    priceNote: "Price on request",
    indicativePriceAED: 2400,
    variants: {
      sizes: ["IT 46 / S", "IT 48 / M", "IT 50 / L", "IT 52 / XL"],
      colors: ["Sand Ivory", "Desert Beige", "Oatmeal Melange"],
    },
    details: [
      "100% Normandy Linen & Fine Cashmere Blend",
      "Unlined construction for breathable comfort",
      "Horn button detailing and matching sash belt",
    ],
    deliveryEstimate: "7–21 business days",
  },
  {
    id: "p8",
    name: "Summer Charms Suede Loafers",
    category: "shoes",
    categoryLabel: "Shoes",
    brand: "Loro Piana",
    description:
      "Water-repellent unlined suede loafers adorned with mini engraved charms. Procured directly from Dubai boutique stock.",
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80",
      "/images/bento-shoes.jpg",
    ],
    priceNote: "Price on request",
    indicativePriceAED: 3950,
    variants: {
      sizes: ["EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"],
      colors: ["Warm Sand", "Navy Melange", "Olive Taupe"],
    },
    details: [
      "Calfskin suede with special stain-resistant finish",
      "Signature non-slip latex sole with LP monogram",
      "Supplied with branded shoe bags and original packaging",
    ],
    deliveryEstimate: "7–21 business days",
  },
  {
    id: "p9",
    name: "Handcrafted Minimalist Italian Leather Sneakers",
    category: "shoes",
    categoryLabel: "Shoes",
    brand: "Made in Italy Studio",
    description:
      "Pristine white nappa leather low-top court sneakers with perforated side details, gold foil embossing, and butter-soft leather interior.",
    image: "/images/bento-shoes.jpg",
    gallery: [
      "/images/bento-shoes.jpg",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1000&q=80",
    ],
    priceNote: "Price on request",
    indicativePriceAED: 1450,
    variants: {
      sizes: ["EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44"],
      colors: ["Optic White / Gold", "Ivory Off-White"],
    },
    details: [
      "100% Full-grain Italian Nappa Leather",
      "Margom vulcanized rubber outsole",
      "Handmade in Civitanova Marche, Italy",
    ],
    deliveryEstimate: "7–14 business days",
  },
  {
    id: "p10",
    name: "Luxury Insulated Travel Flask & Tumbler 750ml",
    category: "bottles-essentials",
    categoryLabel: "Bottles & Essentials",
    brand: "Equator Studio",
    description:
      "Double-walled vacuum insulated titanium and stainless steel travel vessel. Preserves beverages hot for 18h and icy cold for 28h with zero condensation.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=1000&q=80",
    ],
    priceNote: "Price on request",
    indicativePriceAED: 380,
    variants: {
      colors: ["Matte Dune Sand", "Brushed Graphite", "Olive Moss"],
    },
    details: [
      "Medical-grade 18/8 Pro Stainless Steel",
      "BPA & Phthalate-free leakproof screw cap",
      "Compatible with car cup holders and carry clips",
    ],
    deliveryEstimate: "7–14 business days",
  },
  {
    id: "p11",
    name: "Aarke Carbonator 3 Sparkling Water Maker",
    category: "bottles-essentials",
    categoryLabel: "Bottles & Essentials",
    brand: "Aarke",
    description:
      "Seamless stainless steel enclosure sparkling water maker sourced from Dubai department stores. Includes BPA-free PET carbonation bottle.",
    image: "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&w=1000&q=80",
    ],
    priceNote: "Price on request",
    indicativePriceAED: 1100,
    variants: {
      colors: ["Matte Sand", "Polished Steel", "Black Chrome"],
    },
    details: [
      "Precision safety valve system",
      "Cordless operation with standard 60L gas cylinder compatibility",
      "Compact footprint: 414 x 153 x 258 mm",
    ],
    deliveryEstimate: "7–21 business days",
  },
  {
    id: "p12",
    name: "Aesthetic Hydrating Essence & Glow Concentrate",
    category: "beauty-skincare",
    categoryLabel: "Beauty & Skincare",
    brand: "Botanique Dubai",
    description:
      "Hyaluronic multi-molecular serum and peptide glow concentrate formulated for environmental skin defense and radiant hydration.",
    image: "https://images.unsplash.com/photo-1608248597359-0097ff479ce8?auto=format&fit=crop&w=1000&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608248597359-0097ff479ce8?auto=format&fit=crop&w=1000&q=80",
    ],
    priceNote: "Price on request",
    indicativePriceAED: 460,
    variants: {
      sizes: ["50ml Bottle with Dropper"],
    },
    details: [
      "Triple hyaluronic complex with niacinamide",
      "Dermatologically tested, cruelty-free, fragrance-free",
      "Protected in amber UV-filtering glass",
    ],
    deliveryEstimate: "7–14 business days",
  },
];
