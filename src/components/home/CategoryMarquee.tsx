import React from "react";
import { Link } from "react-router-dom";
import { Watch, Shirt, Footprints, ShoppingBag, Sparkles, Coffee, Flame, ShieldCheck } from "lucide-react";
import { Marquee } from "../magic-ui/Marquee";

export const CategoryMarquee: React.FC = () => {
  const tickerItems = [
    { label: "Luxury Swiss Timepieces", category: "watches", icon: Watch },
    { label: "Designer Ready-To-Wear", category: "clothing", icon: Shirt },
    { label: "Verified Italian Footwear", category: "shoes", icon: Footprints },
    { label: "Signature Leather Bags", category: "bags-accessories", icon: ShoppingBag },
    { label: "Niche Fragrances & Oud", category: "beauty-skincare", icon: Sparkles },
    { label: "Insulated Lifestyle Bottles", category: "bottles-essentials", icon: Coffee },
    { label: "Limited Dubai Releases", category: "watches", icon: Flame },
    { label: "Guaranteed Original • Dubai Sourced", category: "clothing", icon: ShieldCheck },
  ];

  return (
    <div className="w-full bg-beige py-3 border-y border-border-tgs overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 relative flex items-center">
        <Marquee
          pauseOnHover={true}
          repeat={3}
          showPauseControl={true}
          className="[--duration:40s]"
        >
          {tickerItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={`/explore?category=${item.category}`}
                className="flex items-center gap-2.5 px-4 py-1.5 rounded-full hover:bg-white/80 transition-colors group text-xs font-semibold tracking-wider uppercase text-tgs-black shrink-0"
              >
                <Icon className="w-3.5 h-3.5 text-olive group-hover:scale-110 transition-transform" />
                <span>{item.label}</span>
                <span className="text-border-tgs mx-2">•</span>
              </Link>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
};
