import React, { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "../../lib/utils";

interface MarqueeProps {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children?: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
  showPauseControl?: boolean;
  [key: string]: any;
}

export const Marquee: React.FC<MarqueeProps> = ({
  className,
  reverse = false,
  pauseOnHover = true,
  children,
  vertical = false,
  repeat = 4,
  showPauseControl = true,
  ...props
}) => {
  const [isManuallyPaused, setIsManuallyPaused] = useState(false);

  return (
    <div className="relative w-full flex items-center">
      <div
        {...props}
        className={cn(
          "group flex overflow-hidden p-2 [--duration:38s] [--gap:1.5rem] [gap:var(--gap)] select-none w-full",
          {
            "flex-row": !vertical,
            "flex-col": vertical,
          },
          className
        )}
      >
        {Array(repeat)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
                "animate-marquee flex-row": !vertical && !reverse,
                "animate-marquee-reverse flex-row": !vertical && reverse,
                "group-hover:[animation-play-state:paused]": pauseOnHover,
              })}
              style={{
                animationPlayState: isManuallyPaused ? "paused" : undefined,
              }}
            >
              {children}
            </div>
          ))}
      </div>

      {showPauseControl && (
        <button
          onClick={() => setIsManuallyPaused(!isManuallyPaused)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/90 border border-border-tgs flex items-center justify-center text-text-secondary hover:text-tgs-black hover:border-olive/50 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-olive/30"
          title={isManuallyPaused ? "Resume ticker" : "Pause ticker"}
          aria-label={isManuallyPaused ? "Resume category ticker" : "Pause category ticker"}
        >
          {isManuallyPaused ? (
            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
          ) : (
            <Pause className="w-3.5 h-3.5 fill-current" />
          )}
        </button>
      )}
    </div>
  );
};
