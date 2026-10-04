export type ProductCategory =
  | "watches"
  | "clothing"
  | "shoes"
  | "bags-accessories"
  | "beauty-skincare"
  | "bottles-essentials";

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  brand: string;
  description: string;
  image: string;
  gallery?: string[];
  referenceUrl?: string;
  priceNote: string; // "Price on request" or indicative AED/PKR reference
  indicativePriceAED?: number;
  variants?: {
    sizes?: string[];
    colors?: string[];
  };
  details: string[];
  deliveryEstimate: string;
}

export type RequestStatus =
  | "SUBMITTED"
  | "REVIEWING"
  | "QUOTE_READY"
  | "AWAITING_APPROVAL"
  | "AWAITING_PAYMENT"
  | "PURCHASED"
  | "SHIPPED"
  | "DELIVERED"
  | "UNAVAILABLE"
  | "CANCELLED";

export interface RequestItem {
  id: string;
  productName: string;
  category: ProductCategory | "other";
  productUrl?: string;
  imageUrl?: string;
  imageFileName?: string;
  brand?: string;
  quantity: number;
  size?: string;
  color?: string;
  variantNotes?: string;
  estimatedBudget?: string;
  budgetCurrency?: "AED" | "PKR" | "USD";
}

export interface DestinationCountry {
  code: string;
  name: string;
  supported: boolean;
  transitEstimateDays?: string;
  cities?: string[];
  notes?: string;
}

export interface CustomerContact {
  fullName: string;
  email: string;
  whatsappCountryCode: string;
  whatsappNumber: string;
  preferredContact: "whatsapp" | "email" | "both";
  notes?: string;
}

export interface DeliveryDetails {
  countryCode: string;
  countryName: string;
  city: string;
  postalCode?: string;
  desiredDeliveryDate?: string;
}

export interface QuoteBreakdown {
  itemCostAED: number;
  itemCostLocal: number;
  serviceFeeLocal: number;
  shippingFeeLocal: number;
  dutiesAndTaxesLocal: number;
  taxTreatment: "included" | "estimated" | "payable_separately";
  currency: string;
  totalLocal: number;
  quoteExpiresAt: string;
  deliveryWindowText: string;
  deliveryStartsNote: string;
}

export interface TrackingEvent {
  status: RequestStatus;
  label: string;
  date: string;
  location?: string;
  description: string;
  completed: boolean;
  current?: boolean;
}

export interface SourcingRequest {
  id: string;
  referenceNumber: string; // e.g. TGS-2026-8492
  createdAt: string;
  status: RequestStatus;
  items: RequestItem[];
  delivery: DeliveryDetails;
  contact: CustomerContact;
  quote?: QuoteBreakdown;
  timeline: TrackingEvent[];
  carrierTracking?: {
    carrierName: string;
    trackingCode: string;
    trackingUrl?: string;
    lastCheckpoint?: string;
  };
  clientNotes?: string;
  reviewNotes?: string;
}
