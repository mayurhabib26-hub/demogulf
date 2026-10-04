import React from "react";
import { Check } from "lucide-react";
import { motion } from "motion/react";

export interface StepItem {
  id: number;
  title: string;
  description: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  allowStepNavigation?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  onStepClick,
  allowStepNavigation = false,
}) => {
  return (
    <div className="w-full mb-8">
      {/* Desktop Stepper */}
      <div className="hidden md:flex items-center justify-between relative">
        {/* Background connector line */}
        <div className="absolute top-5 left-8 right-8 h-0.5 bg-border-tgs z-0" />
        
        {/* Active connector progress */}
        <motion.div
          className="absolute top-5 left-8 h-0.5 bg-tgs-black z-0 origin-left"
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: Math.max(0, (currentStep - 1) / (steps.length - 1)),
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{ width: "calc(100% - 4rem)" }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;
          const isClickable = allowStepNavigation && step.id < currentStep;

          return (
            <div
              key={step.id}
              className={`relative z-10 flex flex-col items-center cursor-${isClickable ? "pointer" : "default"}`}
              onClick={() => isClickable && onStepClick && onStepClick(step.id)}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all duration-300 border ${
                  isCompleted
                    ? "bg-tgs-black text-ivory border-tgs-black shadow-sm"
                    : isActive
                    ? "bg-olive text-ivory border-olive ring-4 ring-olive/15"
                    : "bg-white text-text-muted border-border-tgs"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : step.id}
              </div>

              <div className="mt-2.5 text-center">
                <span
                  className={`text-xs font-semibold tracking-wide uppercase block ${
                    isActive ? "text-tgs-black" : isCompleted ? "text-tgs-black/80" : "text-text-muted"
                  }`}
                >
                  {step.title}
                </span>
                <span className="text-[11px] text-text-secondary hidden lg:block max-w-[130px] leading-tight mt-0.5">
                  {step.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden flex items-center justify-between px-2 py-3 bg-beige/60 rounded-xl border border-border-tgs">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-tgs-black text-ivory text-xs font-semibold flex items-center justify-center">
            {currentStep}/{steps.length}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-tgs-black">
              {steps[currentStep - 1]?.title}
            </div>
            <div className="text-[11px] text-text-secondary">
              {steps[currentStep - 1]?.description}
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step.id === currentStep
                  ? "w-6 bg-olive"
                  : step.id < currentStep
                  ? "w-3 bg-tgs-black"
                  : "w-3 bg-border-tgs"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
