import React from "react";
import { motion, type HTMLMotionProps } from "motion/react";

interface SplitTextProps extends HTMLMotionProps<"span"> {
  text: string;
  className?: string;
  delay?: number;
  wordClassName?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 40,
  wordClassName = "",
  ...props
}) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay / 1000,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.2, 0.65, 0.3, 0.9] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.span
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={text}
      {...props}
    >
      {words.map((word, index) => (
        <span key={index} className="inline-block whitespace-nowrap mr-[0.28em]">
          <motion.span
            variants={wordVariants}
            className={`inline-block ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};
