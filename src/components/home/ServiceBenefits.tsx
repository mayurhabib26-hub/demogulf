import React from "react";
import { Search, Receipt, PackageCheck, Sparkles, ShieldCheck } from "lucide-react";
import { SpotlightCard } from "../react-bits/SpotlightCard";
import { siteConfig } from "../../config/siteConfig";

export const ServiceBenefits: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    Search,
    Receipt,
    PackageCheck,
  };

  return (
    <section className="py-20 bg-ivory border-b border-border-tgs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-beige border border-border-tgs text-xs font-semibold uppercase tracking-wider text-olive mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Gulf Store Promise</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-tgs-black mb-4">
            Shopping made personal
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            We operate as your trusted private eyes and hands in the world’s luxury shopping capital.
          </p>
        </div>

        {/* Three React Bits Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {siteConfig.serviceBenefits.map((benefit) => {
            const Icon = iconMap[benefit.icon] || ShieldCheck;
            return (
              <SpotlightCard
                key={benefit.id}
                spotlightColor="rgba(119, 115, 72, 0.14)"
                className="bg-white border-border-tgs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-beige border border-border-tgs flex items-center justify-center text-olive">
                      <Icon className="w-5 h-5 stroke-[1.75]" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-ivory border border-border-tgs text-[11px] font-semibold tracking-wider uppercase text-text-secondary">
                      {benefit.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-medium text-tgs-black mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-text-secondary font-sans leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-border-tgs/60 flex items-center gap-2 text-xs font-semibold text-olive uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Guaranteed Original</span>
                </div>
              </SpotlightCard>
            );
          })}
        </div>
      </div>
    </section>
  );
};
