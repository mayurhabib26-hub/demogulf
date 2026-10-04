import React from "react";
import { HeroSection } from "../components/home/HeroSection";
import { CategoryMarquee } from "../components/home/CategoryMarquee";
import { CategoryDiscovery } from "../components/home/CategoryDiscovery";
import { HowItWorks } from "../components/home/HowItWorks";
import { ServiceBenefits } from "../components/home/ServiceBenefits";
import { EditorialSection } from "../components/home/EditorialSection";
import { FaqSection } from "../components/home/FaqSection";
import { FinalCta } from "../components/home/FinalCta";

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <CategoryMarquee />
      <CategoryDiscovery />
      <HowItWorks />
      <ServiceBenefits />
      <EditorialSection />
      <FaqSection />
      <FinalCta />
    </div>
  );
};
