import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Camera, Sparkles } from "lucide-react";
import { BentoGrid, BentoCard } from "../magic-ui/BentoGrid";
import { siteConfig } from "../../config/siteConfig";

export const CategoryDiscovery: React.FC = () => {
  return (
    <section className="py-20 bg-ivory border-b border-border-tgs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-olive block mb-2">
            Curated Department Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-tgs-black mb-4">
            What’s on your wishlist?
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            Browse our core sourcing categories inspired by Dubai’s premier luxury department stores, flagship boutiques, and authorized retailers.
          </p>
        </div>

        {/* Bento Grid */}
        <BentoGrid className="mb-12">
          {siteConfig.categories.map((cat) => (
            <BentoCard
              key={cat.id}
              name={cat.name}
              categorySlug={cat.id}
              background={cat.image}
              description={cat.shortDescription}
              href={`/explore?category=${cat.id}`}
              cta="Explore Collection"
              itemCountLabel={cat.itemCountLabel}
              className={cat.gridSpan}
            />
          ))}
        </BentoGrid>

        {/* Follow-up Callout */}
        <div className="bg-beige rounded-2xl border border-border-tgs p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-subtle">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-olive">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bespoke Sourcing Request</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-tgs-black">
              Can’t find it here? Send us a photo or link.
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary max-w-xl">
              From sold-out sneaker collabs to discontinued boutique scents, if it exists in the UAE, our on-ground team can source it for you.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/request"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-colors shadow-sm"
            >
              <Camera className="w-4 h-4" />
              <span>Upload Photo or Link</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
