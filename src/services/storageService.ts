import type { SourcingRequest } from "../types";

const STORAGE_KEY = "tgs_sourcing_requests_demo_v1";

// Realistic Seed Requests for immediate interactive testing
export const INITIAL_DEMO_REQUESTS: SourcingRequest[] = [
  {
    id: "req-seed-1",
    referenceNumber: "TGS-8492",
    createdAt: "2026-10-02T10:30:00Z",
    status: "QUOTE_READY",
    items: [
      {
        id: "item-1",
        productName: "Omega Speedmaster Professional Moonwatch",
        category: "watches",
        brand: "Omega",
        quantity: 1,
        size: "42mm Hesalite",
        productUrl: "https://www.omega.com",
        estimatedBudget: "29000",
        budgetCurrency: "AED",
        imageUrl: "/images/hero-watch.jpg",
      },
    ],
    delivery: {
      countryCode: "PK",
      countryName: "Pakistan",
      city: "Lahore",
      postalCode: "54000",
      desiredDeliveryDate: "2026-10-24",
    },
    contact: {
      fullName: "Kiran R.",
      email: "kiran.demo@example.com",
      whatsappCountryCode: "+92",
      whatsappNumber: "3001234567",
      preferredContact: "whatsapp",
      notes: "Please confirm with box and warranty registration card.",
    },
    quote: {
      itemCostAED: 28500,
      itemCostLocal: 2165000, // PKR
      serviceFeeLocal: 108000, // PKR (~5%)
      shippingFeeLocal: 35000, // Insured Air Courier
      dutiesAndTaxesLocal: 120000,
      taxTreatment: "included",
      currency: "PKR",
      totalLocal: 2428000,
      quoteExpiresAt: "2026-10-08T23:59:59Z",
      deliveryWindowText: "10–14 business days from payment",
      deliveryStartsNote: "Starts once the item is inspected and procured from Omega Mall of the Emirates boutique.",
    },
    timeline: [
      {
        status: "SUBMITTED",
        label: "Request Received",
        date: "Oct 2, 2026 • 10:30 AM",
        description: "Customer submitted watch procurement request via website.",
        completed: true,
      },
      {
        status: "REVIEWING",
        label: "Dubai Sourcing Check",
        date: "Oct 2, 2026 • 02:15 PM",
        description: "Boutique concierge verified Omega stock availability at Dubai Mall & MoE.",
        completed: true,
      },
      {
        status: "QUOTE_READY",
        label: "Official Quotation Prepared",
        date: "Oct 3, 2026 • 11:00 AM",
        description: "Detailed breakdown ready for customer review and approval.",
        completed: true,
        current: true,
      },
      {
        status: "AWAITING_PAYMENT",
        label: "Payment Verification",
        date: "Pending Approval",
        description: "Awaiting customer sign-off and payment instructions confirmation.",
        completed: false,
      },
      {
        status: "PURCHASED",
        label: "Procurement & Boutique Inspection",
        date: "Pending",
        description: "Physical pickup, serial check, and boutique packaging.",
        completed: false,
      },
      {
        status: "SHIPPED",
        label: "Air Cargo & Customs Transit",
        date: "Pending",
        description: "Direct flight to Pakistan with tracked air waybill.",
        completed: false,
      },
      {
        status: "DELIVERED",
        label: "Doorstep Handover",
        date: "Pending",
        description: "Secure delivery to recipient in Lahore.",
        completed: false,
      },
    ],
    reviewNotes: "Serial verified with boutique manager. Official invoice and 5-year Omega warranty will be issued in recipient name.",
  },
  {
    id: "req-seed-2",
    referenceNumber: "TGS-7210",
    createdAt: "2026-09-27T08:15:00Z",
    status: "SHIPPED",
    items: [
      {
        id: "item-2",
        productName: "Classic Beige & Taupe Calfskin Top-Handle",
        category: "bags-accessories",
        brand: "Maison Privée",
        quantity: 1,
        color: "Biscotto & Ivory",
        imageUrl: "/images/hero-bag.jpg",
      },
      {
        id: "item-3",
        productName: "Ayala Dubai Eau de Parfum 100ml",
        category: "beauty-skincare",
        brand: "Ayala Parfums",
        quantity: 1,
        imageUrl: "/images/hero-perfume.jpg",
      },
    ],
    delivery: {
      countryCode: "PK",
      countryName: "Pakistan",
      city: "Karachi",
      postalCode: "75500",
    },
    contact: {
      fullName: "Fatima S.",
      email: "fatima.demo@example.com",
      whatsappCountryCode: "+92",
      whatsappNumber: "3219876543",
      preferredContact: "whatsapp",
    },
    carrierTracking: {
      carrierName: "Emirates SkyCargo / TCS Express",
      trackingCode: "EK-DXB-PK-981245",
      trackingUrl: "https://www.skycargo.com",
      lastCheckpoint: "Customs cleared at Jinnah International Cargo Terminal, dispatched to local courier depot.",
    },
    timeline: [
      {
        status: "SUBMITTED",
        label: "Request Received",
        date: "Sep 27, 2026",
        description: "Customer requested 2 luxury items.",
        completed: true,
      },
      {
        status: "QUOTE_READY",
        label: "Quotation Approved",
        date: "Sep 28, 2026",
        description: "Customer approved quotation.",
        completed: true,
      },
      {
        status: "PURCHASED",
        label: "Items Procured in Dubai",
        date: "Sep 29, 2026",
        description: "Procured from Dubai flagship, photographic verification sent via WhatsApp.",
        completed: true,
      },
      {
        status: "SHIPPED",
        label: "Dispatched to Karachi",
        date: "Oct 1, 2026",
        description: "Consigned onto flight EK602. Handed over to courier.",
        completed: true,
        current: true,
      },
      {
        status: "DELIVERED",
        label: "Final Delivery",
        date: "Expected in 1–2 days",
        description: "Out for courier delivery in DHA Karachi.",
        completed: false,
      },
    ],
  },
];

export const getStoredRequests = (): SourcingRequest[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_REQUESTS));
      return INITIAL_DEMO_REQUESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_DEMO_REQUESTS;
  }
};

export const saveSourcingRequest = (request: SourcingRequest): void => {
  try {
    const current = getStoredRequests();
    const updated = [request, ...current.filter((r) => r.id !== request.id)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Storage error:", e);
  }
};

export const findRequestByReference = (
  referenceNumber: string,
  verificationKey?: string
): { success: boolean; data?: SourcingRequest; error?: string } => {
  const requests = getStoredRequests();
  const cleanRef = referenceNumber.trim().toUpperCase();
  const matched = requests.find((r) => r.referenceNumber.toUpperCase() === cleanRef);

  if (!matched) {
    return {
      success: false,
      error: `No sourcing request found matching reference '${referenceNumber}'. Please verify your reference ID (e.g. TGS-8492).`,
    };
  }

  // Security layer: if verification key provided (phone or email), match it
  if (verificationKey && verificationKey.trim().length > 0) {
    const key = verificationKey.trim().toLowerCase();
    const emailMatch = matched.contact.email.toLowerCase().includes(key);
    const phoneMatch = matched.contact.whatsappNumber.includes(key);
    if (!emailMatch && !phoneMatch) {
      return {
        success: false,
        error:
          "Verification check failed: The email or WhatsApp number entered does not match the contact details for this request.",
      };
    }
  }

  return { success: true, data: matched };
};

export const updateRequestStatus = (
  referenceNumber: string,
  newStatus: SourcingRequest["status"],
  clientNotes?: string
): boolean => {
  const requests = getStoredRequests();
  const index = requests.findIndex((r) => r.referenceNumber.toUpperCase() === referenceNumber.toUpperCase());
  if (index === -1) return false;

  requests[index].status = newStatus;
  if (clientNotes) {
    requests[index].clientNotes = clientNotes;
  }

  // Update timeline
  const nowStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  requests[index].timeline = requests[index].timeline.map((evt) => {
    if (evt.status === newStatus) {
      return { ...evt, completed: true, current: true, date: `${nowStr} (Updated)` };
    }
    if (evt.completed) return evt;
    return { ...evt, current: false };
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  return true;
};
