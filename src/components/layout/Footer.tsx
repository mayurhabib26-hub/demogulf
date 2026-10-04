import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { InstagramIcon } from "../common/InstagramIcon";

export const Footer: React.FC = () => {
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  const policyContent: Record<string, { title: string; body: React.ReactNode }> = {
    shipping: {
      title: "Shipping & Transit Information",
      body: (
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            <strong>Primary Delivery Route:</strong> Dubai (United Arab Emirates) to Pakistan. We currently arrange deliveries to all major cities across Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Peshawar, and Sialkot.
          </p>
          <p>
            <strong>Estimated Delivery Window:</strong> Typically 7–21 business days once items are purchased, inspected in Dubai, and handed over to international air cargo couriers. <em>(Note: Exact delivery timing is confirmed in each client quotation and is subject to flight scheduling and customs clearance).</em>
          </p>
          <p>
            <strong>Customs & Inspection:</strong> All goods are physically verified in Dubai prior to dispatch to ensure condition and authenticity. Customs declarations are handled with the courier as indicated in your quotation.
          </p>
        </div>
      ),
    },
    returns: {
      title: "Returns & Cancellations Policy",
      body: (
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            <strong>Before Quotation Approval:</strong> You can modify or cancel your sourcing request at any time prior to approving the quote at zero cost.
          </p>
          <p>
            <strong>After Boutique Purchase:</strong> Because items are purchased on your specific instruction from luxury boutiques and department stores in Dubai, cancellations after procurement depend on the individual merchant’s return and exchange policies in the UAE.
          </p>
          <p>
            <strong>Damaged or Incorrect Items:</strong> If an item arrives damaged or does not match your approved quotation specifications, contact our concierge immediately with unboxing photos for direct investigation and resolution.
          </p>
          <div className="p-3 bg-beige rounded-lg text-xs text-text-primary border border-border-tgs">
            <em>Policy notice: Formal terms subject to store owner review.</em>
          </div>
        </div>
      ),
    },
    privacy: {
      title: "Privacy Policy",
      body: (
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            The Gulf Store values your privacy. We collect only the information strictly required to prepare quotations, verify product availability, coordinate delivery, and provide customer support via WhatsApp or email.
          </p>
          <p>
            We do not sell, rent, or publicly display your contact information, shipping address, or product requests. Request references alone do not expose personal contact data without verification.
          </p>
        </div>
      ),
    },
    terms: {
      title: "Terms of Sourcing & Service",
      body: (
        <div className="space-y-4 text-sm text-text-secondary">
          <p>
            <strong>Quote-Based Sourcing:</strong> Submitting a product link, photo, or description constitutes a request for quotation. It does not create a binding purchase until you review and approve the itemised quote and complete payment instructions.
          </p>
          <p>
            <strong>Authenticity Commitment:</strong> All products are sourced directly from authorized brand stores, flagship boutiques, and licensed retail partners in Dubai, accompanied by original store packaging and documentation where provided by the merchant.
          </p>
        </div>
      ),
    },
  };

  return (
    <>
      <footer className="bg-beige border-t border-border-tgs pt-16 pb-12 text-tgs-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-border-tgs">
            {/* Col 1: Brand & Logo */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-border-tgs bg-white shadow-sm shrink-0">
                  <img
                    src={siteConfig.brand.logoPath}
                    alt="The Gulf Store TGS Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <span className="font-serif text-xl font-bold tracking-widest uppercase block leading-none">
                    {siteConfig.brand.name}
                  </span>
                  <span className="text-[11px] text-text-secondary tracking-wider uppercase">
                    EST. DXB • Guaranteed Original
                  </span>
                </div>
              </Link>

              <p className="text-sm text-text-secondary leading-relaxed max-w-sm">
                Personal shopping and international product sourcing based in Dubai. You choose it, we check availability, send a clear quote, purchase the approved item, and deliver it to your doorstep.
              </p>

              {/* Instagram & WhatsApp badges */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={siteConfig.brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-tgs text-xs font-medium text-tgs-black hover:border-olive hover:text-olive transition-colors shadow-sm"
                  aria-label="Instagram handle @thegulfstore.pk"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-olive" />
                  <span>{siteConfig.brand.instagramHandle}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.brand.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    siteConfig.brand.whatsappDefaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-border-tgs text-xs font-medium text-tgs-black hover:border-olive hover:text-olive transition-colors shadow-sm"
                  aria-label="Chat on WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-olive" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                Service & Sourcing
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/" className="text-text-secondary hover:text-tgs-black transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/explore" className="text-text-secondary hover:text-tgs-black transition-colors">
                    Explore Products
                  </Link>
                </li>
                <li>
                  <Link to="/#how-it-works" className="text-text-secondary hover:text-tgs-black transition-colors">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link to="/request" className="text-text-secondary hover:text-tgs-black transition-colors font-medium">
                    Request a Product
                  </Link>
                </li>
                <li>
                  <Link to="/track" className="text-text-secondary hover:text-tgs-black transition-colors">
                    Track Request
                  </Link>
                </li>
                <li>
                  <Link to="/#faqs" className="text-text-secondary hover:text-tgs-black transition-colors">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Product Categories */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                Categories
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/explore?category=watches" className="text-text-secondary hover:text-tgs-black transition-colors">
                    Watches & Horology
                  </Link>
                </li>
                <li>
                  <Link to="/explore?category=clothing" className="text-text-secondary hover:text-tgs-black transition-colors">
                    Designer Clothing
                  </Link>
                </li>
                <li>
                  <Link to="/explore?category=shoes" className="text-text-secondary hover:text-tgs-black transition-colors">
                    Footwear & Sneakers
                  </Link>
                </li>
                <li>
                  <Link to="/explore?category=bags-accessories" className="text-text-secondary hover:text-tgs-black transition-colors">
                    Bags & Accessories
                  </Link>
                </li>
                <li>
                  <Link to="/explore?category=beauty-skincare" className="text-text-secondary hover:text-tgs-black transition-colors">
                    Fragrance & Skincare
                  </Link>
                </li>
                <li>
                  <Link to="/explore?category=bottles-essentials" className="text-text-secondary hover:text-tgs-black transition-colors">
                    Everyday Essentials
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Trust & Policies */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                Trust & Policies
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <button
                    onClick={() => setActivePolicyModal("shipping")}
                    className="text-text-secondary hover:text-tgs-black transition-colors text-left"
                  >
                    Shipping Information
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal("returns")}
                    className="text-text-secondary hover:text-tgs-black transition-colors text-left"
                  >
                    Returns & Cancellations
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal("privacy")}
                    className="text-text-secondary hover:text-tgs-black transition-colors text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActivePolicyModal("terms")}
                    className="text-text-secondary hover:text-tgs-black transition-colors text-left"
                  >
                    Terms of Service
                  </button>
                </li>
              </ul>

              <div className="mt-5 p-3 rounded-lg bg-ivory border border-border-tgs text-xs text-text-secondary">
                <div className="font-semibold text-tgs-black flex items-center gap-1.5 mb-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-olive" />
                  <span>Dubai → Pakistan</span>
                </div>
                <span>Initial active delivery corridor. Additional destinations available via enquiry.</span>
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-text-muted gap-4">
            <p>© {new Date().getFullYear()} THE GULF STORE. All rights reserved. Guaranteed Original.</p>
            <div className="flex items-center gap-6">
              <span>Instagram: {siteConfig.brand.instagramHandle}</span>
              <span>•</span>
              <span>EST. DXB</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Policy Modal */}
      {activePolicyModal && policyContent[activePolicyModal] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-tgs-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-ivory rounded-2xl border border-border-tgs max-w-lg w-full p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-border-tgs mb-4">
              <h3 className="font-serif text-xl font-bold text-tgs-black">
                {policyContent[activePolicyModal].title}
              </h3>
              <button
                onClick={() => setActivePolicyModal(null)}
                className="w-8 h-8 rounded-full bg-beige hover:bg-border-tgs flex items-center justify-center text-tgs-black transition-colors"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <div className="py-2">
              {policyContent[activePolicyModal].body}
            </div>

            <div className="mt-6 pt-4 border-t border-border-tgs flex justify-end">
              <button
                onClick={() => setActivePolicyModal(null)}
                className="px-5 py-2 bg-tgs-black text-ivory rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
