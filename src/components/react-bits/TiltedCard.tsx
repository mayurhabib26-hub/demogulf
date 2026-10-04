import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

interface TiltedCardProps {
  imageSrc: string;
  altText: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  className?: string;
  badge?: string;
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  imageSrc,
  altText,
  captionText,
  containerHeight = "460px",
  containerWidth = "100%",
  scaleOnHover = 1.02,
  rotateAmplitude = 9,
  className = "",
  badge,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(pointer: coarse)").matches
      );
    };
    checkTouch();
  }, []);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: containerWidth,
        minHeight: containerHeight,
        perspective: "1000px",
      }}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      <motion.div
        style={{
          rotateX: isTouchDevice ? 0 : rotateX,
          rotateY: isTouchDevice ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: isTouchDevice ? 1 : scaleOnHover }}
        transition={{ duration: 0.3 }}
        className="w-full h-full relative rounded-2xl overflow-hidden shadow-elevated border border-border-tgs bg-card"
      >
        <img
          src={imageSrc}
          alt={altText}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out"
          loading="eager"
        />

        {/* Subtle Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-tgs-black/60 via-tgs-black/10 to-transparent pointer-events-none" />

        {/* Badge */}
        {badge && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-ivory/95 backdrop-blur-md rounded-full text-xs font-semibold tracking-wider uppercase text-tgs-black border border-border-tgs shadow-sm">
            {badge}
          </div>
        )}

        {/* Caption */}
        {captionText && (
          <div className="absolute bottom-4 left-4 right-4 z-10 text-white drop-shadow-md">
            <p className="text-xs uppercase tracking-widest text-white/80 font-medium">Dubai Sourced</p>
            <p className="font-serif text-lg font-medium text-white">{captionText}</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};
