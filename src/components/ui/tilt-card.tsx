"use client";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────
   TiltCard — perspective container + card surface
   ───────────────────────────────────────────── */
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  /** Max rotation in degrees (default 15) */
  maxTilt?: number;
  /** Scale on hover (default 1.02) */
  scale?: number;
  /** Transition speed in ms (default 400) */
  speed?: number;
  /** Show glare overlay (default true) */
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  containerClassName,
  maxTilt = 15,
  scale = 1.02,
  speed = 400,
  glare = true,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({ opacity: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // position within card
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * maxTilt;
    const rotateX = -((y - cy) / cy) * maxTilt;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale},${scale},${scale})`,
      transition: `transform 0ms`,
    });

    if (glare) {
      // glare moves opposite to cursor for realism
      const angle = Math.atan2(y - cy, x - cx) * (180 / Math.PI);
      setGlareStyle({
        opacity: 0.15,
        transform: `rotate(${angle}deg) translate(-50%, -50%)`,
        transition: "opacity 200ms",
      });
    }
  }

  function handleMouseLeave() {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
      transition: `transform ${speed}ms cubic-bezier(.03,.98,.52,.99)`,
    });
    if (glare) setGlareStyle({ opacity: 0, transition: "opacity 400ms" });
  }

  return (
    <div className={cn("w-full", containerClassName)} style={{ perspective: "1000px" }}>
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn("relative overflow-hidden", className)}
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform",
          ...style,
        }}
      >
        {/* glare overlay */}
        {glare && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.25) 0%, transparent 60%)",
              ...glareStyle,
              transformOrigin: "0 0",
            }}
          />
        )}
        <div style={{ transformStyle: "preserve-3d" }}>{children}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TiltCardItem — child that lifts at a given depth
   ───────────────────────────────────────────── */
interface TiltCardItemProps {
  children: React.ReactNode;
  className?: string;
  /** How many px toward the viewer the element floats (default 20) */
  depth?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function TiltCardItem({
  children,
  className,
  depth = 20,
  as: Tag = "div",
}: TiltCardItemProps) {
  return (
    // @ts-expect-error — dynamic tag is fine here
    <Tag
      className={cn(className)}
      style={{
        transform: `translateZ(${depth}px)`,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </Tag>
  );
}
