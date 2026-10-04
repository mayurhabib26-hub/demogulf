import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle, MessageCircle, AlertCircle } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Requests", "Pricing", "Shipping", "Payment", "Policies"];

  const filteredFaqs =
    selectedCategory === "All"
      ? siteConfig.faqs
      : siteConfig.faqs.filter((faq) => faq.category === selectedCategory);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 bg-ivory border-b border-border-tgs">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-olive mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-tgs-black mb-4">
            Everything you need to know
          </h2>
          <p className="text-sm sm:text-base text-text-secondary">
            Clear, transparent answers about our personal shopping and international sourcing process.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                selectedCategory === cat
                  ? "bg-tgs-black text-ivory shadow-xs"
                  : "bg-beige text-text-secondary hover:text-tgs-black hover:bg-border-tgs"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const isOwnerReview = faq.answer.includes("[Note for store owner");

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-white border-olive/50 shadow-subtle"
                    : "bg-white/80 border-border-tgs hover:border-olive/30"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-olive"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg sm:text-xl font-medium text-tgs-black">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "bg-olive text-ivory rotate-180" : "bg-beige text-tgs-black"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm sm:text-base text-text-secondary font-sans leading-relaxed border-t border-border-tgs/50 pt-4 space-y-3">
                        <p>{faq.answer.replace(/\[Note for store owner:.*?\]/g, "").trim()}</p>

                        {isOwnerReview && (
                          <div className="flex items-start gap-2 p-3 bg-beige/80 rounded-xl border border-border-tgs text-xs text-text-primary">
                            <AlertCircle className="w-4 h-4 text-olive shrink-0 mt-0.5" />
                            <span>
                              <strong>Owner notice:</strong> Policy parameter marked for owner review and confirmation.
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* WhatsApp enquiry prompt */}
        <div className="mt-12 text-center bg-beige/60 p-6 rounded-2xl border border-border-tgs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-lg font-medium text-tgs-black">
              Have a question not listed here?
            </h4>
            <p className="text-xs text-text-secondary mt-0.5">
              Speak directly with our Dubai concierge on WhatsApp for immediate guidance.
            </p>
          </div>
          <a
            href={`https://wa.me/${siteConfig.brand.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
              "Hello! I have a question regarding The Gulf Store sourcing service."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
