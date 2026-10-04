import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Send, FileSpreadsheet, CheckCircle, PackageCheck, ArrowRight } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Tell us what you want",
      description:
        "Share an Instagram screenshot, website link, or simple description. Specify size, color, or budget preferences.",
      icon: Send,
    },
    {
      num: "02",
      title: "Receive your quote",
      description:
        "We verify UAE boutique availability and send an itemised quotation with store price, service fee, and express shipping.",
      icon: FileSpreadsheet,
    },
    {
      num: "03",
      title: "Approve your order",
      description:
        "Review every line item. Once you confirm and fulfill payment instructions, our personal shoppers execute the purchase.",
      icon: CheckCircle,
    },
    {
      num: "04",
      title: "We source and ship",
      description:
        "We inspect your goods, wrap them with care, and dispatch via air cargo with milestone updates to your doorstep in Pakistan.",
      icon: PackageCheck,
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-beige/50 border-b border-border-tgs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-olive block mb-2">
            Effortless Personal Sourcing
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-tgs-black mb-4">
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-text-secondary leading-relaxed">
            A seamless, transparent journey from Dubai department stores directly to your home in Pakistan.
          </p>
        </div>

        {/* Steps Grid with Thin Connecting Line */}
        <div className="relative">
          {/* Thin connecting line across steps (desktop only) */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-px bg-border-tgs z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="bg-white p-7 rounded-2xl border border-border-tgs shadow-subtle hover:shadow-card-hover transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Step Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="font-serif text-3xl font-light text-olive">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center text-tgs-black border border-border-tgs">
                        <Icon className="w-4 h-4 text-olive" />
                      </div>
                    </div>

                    <h3 className="font-serif text-xl font-medium text-tgs-black mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-sans">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-tgs/50 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                    <span>Step {step.num} of 04</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-olive" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA banner below steps */}
        <div className="mt-12 text-center">
          <Link
            to="/request"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-tgs-black text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-olive transition-colors shadow-sm"
          >
            <span>Start Step 01 Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
