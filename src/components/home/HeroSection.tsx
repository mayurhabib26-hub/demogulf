import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, Sparkles, CheckCircle2, Send, Plane } from "lucide-react";
import { SplitText } from "../react-bits/SplitText";
import { Threads } from "../react-bits/Threads";
import { TiltedCard } from "../react-bits/TiltedCard";
import { ShimmerButton } from "../magic-ui/ShimmerButton";

export const HeroSection: React.FC = () => {
  const [quickQuery, setQuickQuery] = useState("");
  const navigate = useNavigate();

  const handleQuickRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickQuery.trim()) {
      navigate(`/request?query=${encodeURIComponent(quickQuery.trim())}`);
    } else {
      navigate("/request");
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, CTAs, and Quick Request Field */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-beige border border-border-tgs mb-5 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-olive animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest text-text-secondary uppercase">
                PERSONAL SHOPPING • DUBAI TO YOUR DOOR
              </span>
            </div>

            {/* Main Hero Headline with React Bits SplitText */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-tgs-black leading-[1.08] mb-6">
              <SplitText
                text="You choose it. We bring it home."
                delay={45}
                className="font-serif"
                wordClassName="text-tgs-black"
              />
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-text-secondary font-sans font-normal leading-relaxed max-w-xl mb-8">
              Share a product link, upload a photo, or tell us what you’re looking for. We’ll check availability in Dubai boutiques, send you an itemised quote, and arrange insured delivery to Pakistan.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8 w-full sm:w-auto">
              <Link to="/request" className="w-full sm:w-auto">
                <ShimmerButton
                  shimmerColor="rgba(255, 255, 240, 0.45)"
                  className="w-full sm:w-auto shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-ivory/80" />
                  <span>Request a Product</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </ShimmerButton>
              </Link>

              <Link
                to="/explore"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-transparent border border-border-tgs text-tgs-black text-sm font-medium hover:bg-beige hover:border-olive/50 transition-all duration-300"
              >
                <span>Explore Products</span>
              </Link>
            </div>

            {/* Compact Quick-Request Field */}
            <div className="w-full max-w-xl bg-white p-3 sm:p-4 rounded-2xl border border-border-tgs shadow-subtle mb-8">
              <form onSubmit={handleQuickRequest} className="space-y-2">
                <label
                  htmlFor="quick-query"
                  className="block text-xs font-semibold text-tgs-black tracking-wider uppercase"
                >
                  What are you looking for?
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    id="quick-query"
                    type="text"
                    value={quickQuery}
                    onChange={(e) => setQuickQuery(e.target.value)}
                    placeholder="Paste a product link or describe your item"
                    className="flex-1 px-4 py-3 bg-ivory/60 rounded-xl border border-border-tgs text-sm text-tgs-black placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-olive/40 focus:bg-white transition-all"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-colors shrink-0"
                  >
                    <span>Start My Request</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            </div>

            {/* Three Simple Process Statements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-xl pt-2 border-t border-border-tgs/70">
              <div className="flex items-center gap-2 text-xs font-medium text-tgs-black">
                <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                <span>Personal sourcing</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-tgs-black">
                <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                <span>Quote before purchase</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-tgs-black">
                <CheckCircle2 className="w-4 h-4 text-olive shrink-0" />
                <span>Delivery updates</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Composition with Threads & Tilted Card */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* Decorative React Bits Threads Canvas strictly behind product composition */}
            <div className="absolute -inset-4 sm:-inset-10 z-0 pointer-events-none">
              <Threads
                className="w-full h-full opacity-70"
                color="rgba(119, 115, 72, 0.22)"
                amplitude={16}
              />
            </div>

            {/* Image Composition Container */}
            <div className="relative z-10 grid grid-cols-12 gap-3 sm:gap-4 items-center">
              {/* Dominant Image: React Bits Tilted Card (Luxury Chronograph Watch) */}
              <div className="col-span-12 sm:col-span-9 relative">
                <TiltedCard
                  imageSrc="/images/hero-watch.jpg"
                  altText="Luxury Swiss Horology Timepiece on Travertine"
                  captionText="Verified Authentic Timepieces"
                  badge="Guaranteed Original"
                  containerHeight="440px"
                  rotateAmplitude={8}
                />

                {/* Floating "Dubai → Your doorstep" label */}
                <div className="absolute -bottom-3 -right-2 sm:-right-4 z-20 px-4 py-2.5 bg-ivory/95 backdrop-blur-md rounded-2xl border border-border-tgs shadow-elevated flex items-center gap-2 text-xs font-semibold text-tgs-black">
                  <span className="w-2 h-2 rounded-full bg-olive" />
                  <span>Dubai</span>
                  <Plane className="w-3.5 h-3.5 text-olive mx-0.5" />
                  <span>Your Doorstep</span>
                </div>
              </div>

              {/* Two Smaller Supporting Images */}
              <div className="col-span-12 sm:col-span-3 flex sm:flex-col gap-3 sm:gap-4">
                {/* Supporting Image 1: Leather Bag */}
                <div className="w-1/2 sm:w-full h-36 sm:h-44 rounded-xl overflow-hidden border border-border-tgs shadow-subtle bg-white relative group">
                  <img
                    src="/images/hero-bag.jpg"
                    alt="Bespoke Italian Leather Bag"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tgs-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white uppercase tracking-wider drop-shadow-sm">
                    Leather Goods
                  </span>
                </div>

                {/* Supporting Image 2: Perfume / Beauty */}
                <div className="w-1/2 sm:w-full h-36 sm:h-44 rounded-xl overflow-hidden border border-border-tgs shadow-subtle bg-white relative group">
                  <img
                    src="/images/hero-perfume.jpg"
                    alt="Niche Arabian Perfume"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-tgs-black/60 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2 text-[10px] font-semibold text-white uppercase tracking-wider drop-shadow-sm">
                    Niche Fragrance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
