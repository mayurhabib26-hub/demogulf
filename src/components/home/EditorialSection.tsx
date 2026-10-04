import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Building2 } from "lucide-react";
import { BlurFade } from "../magic-ui/BlurFade";
import { siteConfig } from "../../config/siteConfig";

export const EditorialSection: React.FC = () => {
  return (
    <section className="py-24 bg-beige border-b border-border-tgs overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image with BlurFade */}
          <div className="lg:col-span-6 relative">
            <BlurFade delay={0.1} duration={0.6} className="relative z-10">
              <div className="relative rounded-3xl overflow-hidden border border-border-tgs shadow-elevated bg-card">
                <img
                  src="/images/editorial-concierge.jpg"
                  alt="Personal shopper and luxury packaging suite overlooking Dubai skyline"
                  className="w-full h-[460px] sm:h-[520px] object-cover object-center"
                  loading="lazy"
                />
                {/* Floating boutique stamp */}
                <div className="absolute top-6 left-6 bg-ivory/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-border-tgs shadow-sm flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-olive animate-pulse" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-tgs-black">
                    EST. DXB • Concierge Sourcing
                  </span>
                </div>
              </div>
            </BlurFade>

            {/* Background subtle offset element */}
            <div className="absolute -bottom-6 -left-6 w-full h-full rounded-3xl border border-olive/20 pointer-events-none -z-0" />
          </div>

          {/* Right Column: Editorial Text with BlurFade */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <BlurFade delay={0.2} duration={0.6}>
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-olive mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>Editorial Dispatch</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-tgs-black mb-6 leading-[1.15]">
                Why The Gulf Store
              </h2>

              <div className="space-y-4 text-text-secondary text-sm sm:text-base leading-relaxed font-sans mb-8">
                <p>
                  Dubai is home to the world’s most extensive luxury inventory—from exclusive horological allocations at The Dubai Mall to curated department stores like Bloomingdale’s, Harvey Nichols, and boutique perfumeries in Alserkal Avenue.
                </p>
                <p>
                  Yet for shoppers across Pakistan, sourcing authentic international goods often meant relying on friends travelling, navigating uncertain online resellers, or paying inflated local markups.
                </p>
                <p>
                  <strong>The Gulf Store</strong> changes that. We provide a transparent, dedicated personal shopping link between Dubai flagships and your home. Every item is inspected by hand, verified original with official boutique receipts, and delivered to your doorstep.
                </p>
              </div>

              {/* Pillars list */}
              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-olive shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-tgs-black font-medium">
                    Direct on-ground boutique procurement—no third-party imitation markets.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-olive shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-tgs-black font-medium">
                    Itemised quotation provided prior to purchase with zero hidden surcharges.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-olive shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-tgs-black font-medium">
                    Insured express air courier transit directly from Dubai to Pakistan.
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  to="/request"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-colors shadow-sm"
                >
                  <span>Request an Item</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={siteConfig.brand.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white border border-border-tgs text-tgs-black text-xs font-semibold uppercase tracking-wider hover:bg-ivory hover:border-olive transition-colors"
                >
                  <span>Follow {siteConfig.brand.instagramHandle}</span>
                </a>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
};
