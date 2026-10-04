import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { cn } from "../../lib/utils";

export interface BentoCardProps {
  name: string;
  className?: string;
  background: string;
  description: string;
  href: string;
  cta: string;
  featured?: boolean;
  categorySlug: string;
  itemCountLabel?: string;
}

export const BentoGrid: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-5 auto-rows-[280px] md:auto-rows-[300px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard: React.FC<BentoCardProps> = ({
  name,
  className,
  background,
  description,
  href,
  cta = "Explore",
  itemCountLabel,
}) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border-tgs bg-card shadow-subtle hover:shadow-card-hover transition-all duration-500",
        className
      )}
    >
      {/* Background Image with subtle zoom on hover */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={background}
          alt={name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {/* Editorial Gradients: warm dark base to protect typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-tgs-black/85 via-tgs-black/35 to-transparent transition-opacity duration-300" />
        <div className="absolute inset-0 bg-tgs-black/10 group-hover:bg-transparent transition-colors duration-300" />
      </div>

      {/* Top Meta info */}
      <div className="relative z-10 p-5 flex items-start justify-between">
        {itemCountLabel ? (
          <span className="px-2.5 py-1 text-[11px] font-semibold tracking-wider uppercase bg-ivory/90 text-tgs-black rounded-full backdrop-blur-md border border-border-tgs shadow-sm">
            {itemCountLabel}
          </span>
        ) : (
          <span />
        )}

        <div className="w-9 h-9 rounded-full bg-ivory/20 backdrop-blur-md flex items-center justify-center text-ivory transition-transform duration-300 group-hover:bg-ivory group-hover:text-tgs-black group-hover:rotate-45">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Bottom Content info */}
      <div className="relative z-10 p-5 text-white">
        <h3 className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-white mb-1.5 group-hover:translate-x-0.5 transition-transform duration-300">
          {name}
        </h3>
        <p className="text-xs text-white/80 line-clamp-2 mb-4 font-sans font-normal leading-relaxed max-w-sm">
          {description}
        </p>

        <Link
          to={href}
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-ivory hover:text-white underline-offset-4 group-hover:underline"
        >
          <span>{cta}</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
