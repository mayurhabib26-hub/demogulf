import React from "react";
import { motion, type Variants } from "motion/react";
import { cn } from "../../lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  variant?: {
    hidden: { y: number };
    visible: { y: number };
  };
  duration?: number;
  delay?: number;
  yOffset?: number;
  inView?: boolean;
  inViewMargin?: string;
  blur?: string;
}

export const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  className,
  variant,
  duration = 0.5,
  delay = 0,
  yOffset = 8,
  inViewMargin = "-40px",
  blur = "6px",
}) => {
  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const combinedVariants = variant || defaultVariants;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: inViewMargin as any }}
      variants={combinedVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
