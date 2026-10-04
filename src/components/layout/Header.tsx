import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "../../config/siteConfig";

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard and Escape key navigation for accessible mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Explore Products", href: "/explore" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "Track Request", href: "/track" },
    { label: "FAQs", href: "/#faqs" },
  ];

  const handleNavClick = (href: string, e: React.MouseEvent) => {
    if (href.startsWith("/#")) {
      const targetId = href.replace("/#", "");
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate(`/${href}`);
      }
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-tgs-black text-ivory py-2 px-4 text-center text-xs tracking-wider font-medium flex items-center justify-center gap-2 border-b border-white/10 z-50 relative">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-olive animate-pulse" />
        <span>{siteConfig.announcement}</span>
        <span className="hidden sm:inline text-white/50 text-[11px] ml-1">
          • 100% Authentic Boutique Sourcing
        </span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-ivory/95 backdrop-blur-md shadow-subtle border-b border-border-tgs py-3"
            : "bg-ivory border-b border-border-tgs/50 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-olive rounded-md"
              aria-label="The Gulf Store Home"
            >
              <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border border-border-tgs/80 shadow-sm transition-transform duration-300 group-hover:scale-105 shrink-0 bg-white">
                <img
                  src={siteConfig.brand.logoPath}
                  alt="The Gulf Store TGS Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg md:text-xl font-semibold tracking-widest text-tgs-black uppercase leading-none">
                  {siteConfig.brand.name}
                </span>
                <span className="text-[10px] md:text-[11px] text-text-secondary tracking-widest uppercase mt-1">
                  Personal Shopping • Dubai
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-7" aria-label="Main Navigation">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.href) && !link.href.startsWith("/#");

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={(e) => handleNavClick(link.href, e)}
                    className={`text-sm font-medium tracking-wide transition-colors relative py-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-olive rounded ${
                      isActive
                        ? "text-tgs-black font-semibold"
                        : "text-text-secondary hover:text-tgs-black"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-olive rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/request"
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-all duration-300 shadow-sm hover:shadow active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-tgs-black"
              >
                <span>Request a Product</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                ref={menuButtonRef}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-tgs-black hover:bg-beige transition-colors focus:outline-none focus:ring-2 focus:ring-olive"
                aria-label={mobileMenuOpen ? "Close menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu Animated with Motion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="absolute inset-0 bg-tgs-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Menu Panel */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-ivory shadow-2xl border-l border-border-tgs flex flex-col justify-between p-6 overflow-y-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation Menu"
            >
              <div>
                {/* Mobile Header Row */}
                <div className="flex items-center justify-between pb-6 border-b border-border-tgs">
                  <div className="flex items-center gap-3">
                    <img
                      src={siteConfig.brand.logoPath}
                      alt="Logo"
                      className="w-10 h-10 rounded-full border border-border-tgs object-contain"
                    />
                    <div>
                      <div className="font-serif font-bold text-sm tracking-widest text-tgs-black">
                        THE GULF STORE
                      </div>
                      <div className="text-[10px] text-text-secondary uppercase">
                        Dubai • Pakistan
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-beige text-tgs-black transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col py-6 space-y-4">
                  {navLinks.map((link, idx) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx }}
                    >
                      <Link
                        to={link.href}
                        onClick={(e) => {
                          handleNavClick(link.href, e);
                          setMobileMenuOpen(false);
                        }}
                        className="block text-lg font-medium text-tgs-black hover:text-olive py-2 border-b border-border-tgs/40"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Mobile Quick Sourcing Highlight */}
                <div className="bg-beige/70 p-4 rounded-xl border border-border-tgs mb-6 text-xs text-text-secondary space-y-1">
                  <div className="font-semibold text-tgs-black flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-olive" />
                    <span>Guaranteed Original</span>
                  </div>
                  <p>
                    All items sourced directly from certified Dubai boutiques with receipts and warranty.
                  </p>
                </div>
              </div>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-border-tgs space-y-3">
                <Link
                  to="/request"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3.5 px-4 rounded-full bg-tgs-black text-ivory text-center font-medium text-sm flex items-center justify-center gap-2 hover:bg-olive transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Request a Product</span>
                </Link>
                <a
                  href={`https://wa.me/${siteConfig.brand.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    siteConfig.brand.whatsappDefaultMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-full bg-white text-tgs-black border border-border-tgs text-center font-medium text-xs flex items-center justify-center gap-2 hover:bg-beige transition-colors"
                >
                  Chat with Dubai Concierge
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
