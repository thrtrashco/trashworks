import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "left" | "right" | "scale" | "blur";

const variantClass: Record<RevealVariant, string> = {
  up:    "",           // default — translateY handled by base `reveal` class
  left:  "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  blur:  "reveal-blur",
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger offset in ms (default 0) */
  delay?: number;
  /** Animation direction/style (default "up") */
  variant?: RevealVariant;
  /** IntersectionObserver threshold 0–1 (default 0.1) */
  threshold?: number;
  /** Render as a different element (default "div") */
  as?: keyof React.JSX.IntrinsicElements;
}

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  threshold = 0.1,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Already in view on mount (e.g. above the fold)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    // @ts-expect-error — dynamic tag is fine
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn(
        // blur variant has its own base — skip duplicate `reveal`
        variant === "blur" ? "reveal-blur" : "reveal",
        variantClass[variant],
        visible && "reveal-visible",
        className
      )}
    >
      {children}
    </Tag>
  );
}
