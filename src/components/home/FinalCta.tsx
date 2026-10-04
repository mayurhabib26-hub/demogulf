import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { InstagramIcon } from "../common/InstagramIcon";

export const FinalCta: React.FC = () => {
  return (
    <section className="py-24 bg-tgs-black text-ivory relative overflow-hidden">
      {/* Subtle decorative glowing background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-olive/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-olive/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold uppercase tracking-widest text-ivory mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-olive" />
          <span>Dubai Personal Shopping Concierge</span>
        </div>

        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight mb-4 text-white">
          Found something you love?
        </h2>

        <p className="font-serif text-2xl sm:text-3xl text-ivory/80 font-light italic mb-8">
          Send it to us. We’ll take it from here.
        </p>

        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-sans font-normal mb-10 leading-relaxed">
          From watches and apparel to footwear and beauty, send us a link, photo, or description. We check Dubai availability, send your quotation, and handle everything to your door.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            to="/request"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-ivory text-tgs-black text-xs font-bold uppercase tracking-wider hover:bg-white hover:shadow-lg transition-all duration-300"
          >
            <span>Request a Product</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href={`https://wa.me/${siteConfig.brand.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              siteConfig.brand.whatsappDefaultMessage
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/10 border border-white/25 text-ivory text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-olive" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Instagram handle reference */}
        <div className="flex items-center justify-center gap-2 text-xs text-white/60">
          <span>Follow our Dubai shopping drops on Instagram:</span>
          <a
            href={siteConfig.brand.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ivory font-semibold hover:text-white underline underline-offset-4 flex items-center gap-1"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-olive inline" />
            <span>{siteConfig.brand.instagramHandle}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
