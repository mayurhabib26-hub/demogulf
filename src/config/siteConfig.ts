import type { DestinationCountry, ProductCategory } from "../types";

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  itemCountLabel: string;
  gridSpan: string;
}

export const siteConfig = {
  brand: {
    name: "THE GULF STORE",
    tagline: "Personal Shopping • Dubai to Your Doorstep",
    monogram: "TGS",
    logoPath: "/tgs-logo.jpg",
    slogan: "You choose it. We bring it home.",
    description:
      "A personal shopping and international product sourcing company based in Dubai. Customers tell us what they want—watches, clothing, shoes, bags, cosmetics, or everyday essentials—by submitting a link, photo, or description. We confirm availability, provide an itemised quotation, purchase approved items in Dubai boutiques, and arrange secure delivery.",
    instagramHandle: "@thegulfstore.pk",
    instagramUrl: "https://instagram.com/thegulfstore.pk",
    // Configured business WhatsApp number (pre-filled message supported)
    whatsappNumber: "+971509876543",
    whatsappDisplay: "+971 50 987 6543",
    whatsappDefaultMessage:
      "Hello The Gulf Store team! I would like to inquire about sourcing an item from Dubai.",
    email: "concierge@thegulfstore.pk",
  },

  announcement: "Your favourites from Dubai, delivered to Pakistan.",

  // Configurable delivery route system
  delivery: {
    initialOrigin: "Dubai, United Arab Emirates",
    initialDestination: "Pakistan",
    // Owner review flag: screenshot mentions 7-21 days
    transitEstimateDays: "7–21 business days",
    deliveryNotice:
      "Estimated transit is typically 7–21 business days once items are purchased in Dubai and pass inspection. Actual transit depends on customs clearance and local carrier operations.",
    needsOwnerConfirmation: true, // Marked for owner review
  },

  supportedCountries: [
    {
      code: "PK",
      name: "Pakistan",
      supported: true,
      transitEstimateDays: "7–21 business days (Owner confirmation pending)",
      cities: [
        "Karachi",
        "Lahore",
        "Islamabad",
        "Rawalpindi",
        "Faisalabad",
        "Multan",
        "Peshawar",
        "Sialkot",
        "Gujranwala",
        "Quetta",
      ],
      notes: "Primary active delivery route. Door-to-door delivery available.",
    },
    {
      code: "AE",
      name: "United Arab Emirates",
      supported: true,
      transitEstimateDays: "1–3 business days",
      cities: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah"],
      notes: "Local domestic courier delivery.",
    },
    {
      code: "SA",
      name: "Saudi Arabia",
      supported: false,
      transitEstimateDays: "Route opening soon — Enquire for private air consignment",
      cities: ["Riyadh", "Jeddah", "Dammam"],
      notes: "Enquiry only. Commercial clearance route currently in setup.",
    },
    {
      code: "QA",
      name: "Qatar",
      supported: false,
      transitEstimateDays: "Enquire for availability",
      cities: ["Doha"],
      notes: "Enquiry only.",
    },
    {
      code: "GB",
      name: "United Kingdom",
      supported: false,
      transitEstimateDays: "Enquire for international courier availability",
      cities: ["London", "Manchester", "Birmingham"],
      notes: "Private courier quotes available on special request.",
    },
  ] as DestinationCountry[],

  categories: [
    {
      id: "watches",
      name: "Watches",
      shortDescription: "Luxury Swiss timepieces, chronographs, and everyday watches sourced directly from Dubai boutiques.",
      longDescription: "From certified horological boutiques in The Dubai Mall to Mall of the Emirates, we source authenticated timepieces with full warranty documentation.",
      image: "/images/hero-watch.jpg",
      itemCountLabel: "Horology",
      gridSpan: "col-span-1 md:col-span-2 lg:col-span-4",
    },
    {
      id: "clothing",
      name: "Clothing",
      shortDescription: "Curated designer fashion, luxury outerwear, linen staples, and limited-run ready-to-wear.",
      longDescription: "Source pieces from regional flagship stores, seasonal collections, and luxury brand outlets unavailable locally.",
      image: "/images/bento-clothing.jpg",
      itemCountLabel: "Apparel",
      gridSpan: "col-span-1 md:col-span-1 lg:col-span-2",
    },
    {
      id: "shoes",
      name: "Shoes",
      shortDescription: "Exclusive sneakers, Italian leather loafers, and designer footwear in your exact verified size.",
      longDescription: "Sourced from Level Shoes, Dubai Mall, and official brand flagships with box, dust bags, and authentication.",
      image: "/images/bento-shoes.jpg",
      itemCountLabel: "Footwear",
      gridSpan: "col-span-1 md:col-span-1 lg:col-span-2",
    },
    {
      id: "bags-accessories",
      name: "Bags and Accessories",
      shortDescription: "Classic leather bags, statement accessories, jewelry, and luxury small leather goods.",
      longDescription: "Direct boutique procurement of bags, belts, wallets, and sunglasses with pristine store packaging.",
      image: "/images/hero-bag.jpg",
      itemCountLabel: "Leather Goods",
      gridSpan: "col-span-1 md:col-span-2 lg:col-span-4",
    },
    {
      id: "beauty-skincare",
      name: "Beauty and Skincare",
      shortDescription: "Niche Arabian fragrances, French perfumery, aesthetic serums, and luxury cosmetics.",
      longDescription: "Authentic Dubai duty-free and luxury beauty department store exclusives, carefully packed for international transport.",
      image: "/images/hero-perfume.jpg",
      itemCountLabel: "Perfumes & Care",
      gridSpan: "col-span-1 md:col-span-2 lg:col-span-3",
    },
    {
      id: "bottles-essentials",
      name: "Bottles and Everyday Essentials",
      shortDescription: "Premium insulated hydration vessels, tumblers, travel accessories, and lifestyle essentials.",
      longDescription: "Everyday luxury essentials and trending international products procured and inspected before shipment.",
      image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80",
      itemCountLabel: "Lifestyle",
      gridSpan: "col-span-1 md:col-span-1 lg:col-span-3",
    },
  ] as CategoryInfo[],

  // Service benefits (Spotlight Cards)
  serviceBenefits: [
    {
      id: "sourcing",
      title: "Help finding the right product",
      description:
        "Whether you have an exact SKU link, an Instagram screenshot, or a casual photo from a friend, our Dubai personal shopping team visits physical boutiques and authorized retailers to locate your exact item.",
      icon: "Search",
      tag: "Personal Concierge",
    },
    {
      id: "quotations",
      title: "Clear quotations before purchase",
      description:
        "No hidden charges or unexpected surprises. You receive an itemised quote detailing the Dubai store retail cost, our transparent personal shopping service fee, and express international shipping before you pay a single rupee.",
      icon: "Receipt",
      tag: "100% Transparent",
    },
    {
      id: "updates",
      title: "Updates from request to delivery",
      description:
        "Stay informed at every milestone. We notify you when your request is reviewed, when the item is inspected and purchased in Dubai, when it is packaged with care, and as it flies to your doorstep in Pakistan.",
      icon: "PackageCheck",
      tag: "End-to-End Tracking",
    },
  ],

  // FAQ items - covers the exact 10 required questions from user specification
  faqs: [
    {
      question: "Can I request something outside the catalogue?",
      answer:
        "Yes, absolutely. The catalogue serves as inspiration for popular items. The core of The Gulf Store is bespoke personal shopping: you can submit any item available in the UAE—including luxury watches, ready-to-wear fashion, shoes, beauty products, home goods, or niche boutique releases—by sharing a link, screenshot, or detailed description.",
      category: "Requests",
    },
    {
      question: "Can I upload a screenshot?",
      answer:
        "Yes. Our Request a Product form allows direct image uploads of screenshots from Instagram, TikTok, brand websites, or WhatsApp. Our sourcing specialists will identify the brand, model, and availability in Dubai.",
      category: "Requests",
    },
    {
      question: "How is the final price calculated?",
      answer:
        "Our pricing is completely itemised and transparent: (1) The verified retail price of the item in UAE Dirhams (AED) converted at the current exchange rate, (2) Our personal shopping & inspection concierge fee, and (3) Express international air courier shipping to your city. Any customs duties are clearly flagged as included or estimated.",
      category: "Pricing",
    },
    {
      question: "Which destinations are supported?",
      answer:
        "Currently, our primary verified shipping corridor is Dubai to major cities across Pakistan (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, and more). We also offer domestic UAE delivery. For other destinations, you can submit an enquiry and our team will evaluate air courier feasibility.",
      category: "Shipping",
    },
    {
      question: "When do I pay?",
      answer:
        "Submitting a request is 100% free and carries zero obligation. You only pay after you receive your official quote, review the complete price breakdown, and formally approve the order. We do not purchase any item before your approval and payment confirmation.",
      category: "Payment",
    },
    {
      question: "How long does delivery take?",
      answer:
        "Estimated delivery typically ranges between 7–21 business days from the date of quote approval and procurement in Dubai, depending on boutique availability, customs processing, and local courier routing. [Note for store owner: delivery window subject to final carrier confirmation].",
      category: "Shipping",
    },
    {
      question: "What happens if my item is unavailable?",
      answer:
        "If a specific item is sold out across UAE retailers, our team will notify you immediately. We will check alternative authorized stockists or suggest alternative sizes/colors. If an item cannot be sourced after payment, you receive a full prompt refund.",
      category: "Sourcing",
    },
    {
      question: "Are customs charges included?",
      answer:
        "In our official quote, customs duties and taxes are explicitly indicated as either included in the all-in quote or estimated based on Pakistan customs regulations for specific categories (such as luxury horology or high-value electronics). We advise you before purchase so you never face surprise fees.",
      category: "Pricing",
    },
    {
      question: "Can I change a size or colour after purchase?",
      answer:
        "Because items are purchased on your behalf in physical stores or from official brand boutiques upon your approval, changes depend entirely on the specific store's exchange policy. If the item has not yet been bought, changes can be made immediately free of charge. Contact your assigned shopper via WhatsApp right away.",
      category: "Orders",
    },
    {
      question: "What is the cancellation or return policy?",
      answer:
        "Requests can be cancelled at any time before quote approval without charge. Once an item is purchased in Dubai, cancellations and returns are subject to the original merchant's store policy in the UAE minus incurred shipping and handling. [Note for store owner: formal return & refund policy pending owner confirmation].",
      category: "Policies",
    },
  ],
};
