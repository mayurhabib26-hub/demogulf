import React, { useEffect, useRef, useState } from "react";

interface ThreadsProps {
  className?: string;
  color?: string;
  amplitude?: number;
  distance?: number;
}

export const Threads: React.FC<ThreadsProps> = ({
  className = "",
  color = "rgba(119, 115, 72, 0.16)",
  amplitude = 18,
  distance = 0.4,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio || 600);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio || 600;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio || 600;
    };

    window.addEventListener("resize", handleResize);

    let step = 0;
    const linesCount = 7;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      step += 0.008;

      ctx.lineWidth = 1.2 * window.devicePixelRatio;
      ctx.strokeStyle = color;

      for (let i = 0; i < linesCount; i++) {
        ctx.beginPath();
        const offset = i * 28 * distance * window.devicePixelRatio;
        const phase = step + i * 0.4;

        for (let x = 0; x <= width; x += 10) {
          const normX = x / width;
          const y =
            height * 0.5 +
            offset -
            (linesCount * 14 * window.devicePixelRatio) / 2 +
            Math.sin(normX * 4 + phase) * amplitude * window.devicePixelRatio +
            Math.cos(normX * 2.5 - step * 0.5) * (amplitude * 0.6) * window.devicePixelRatio;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [color, amplitude, distance, prefersReducedMotion]);

  if (prefersReducedMotion) {
    // Static fallback SVG with faint olive curved lines
    return (
      <div
        className={`pointer-events-none select-none overflow-hidden ${className}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 600 600"
          className="w-full h-full opacity-60"
          preserveAspectRatio="none"
        >
          <path
            d="M0,250 C150,220 350,320 600,280"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M0,280 C180,240 380,350 600,310"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M0,310 C200,260 400,380 600,340"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
          <path
            d="M0,340 C220,290 420,400 600,370"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={`pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
