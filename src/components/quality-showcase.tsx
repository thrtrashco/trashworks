"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { Highlighter } from "@/components/ui/highlighter";
import { Layers, Recycle } from "lucide-react";

type Grade = {
  id: string;
  label: string;
  source: string;
  image: string;
  specs: { label: string; value: string }[];
  applications: string[];
};

const GRADES: Grade[] = [
  {
    id: "pcr",
    label: "PCR Grade A",
    source: "Post-use PP Jumbo Bags / FIBC woven fabric",
    image: "https://res.cloudinary.com/kxwxpxuv/image/upload/q_auto,f_auto/v1790284055/Granules_in_bowl_2K_20260925023703.jpg",
    specs: [
      { label: "MFI (230°C, 2.16kg)", value: "8 g/10 min" },
      { label: "Density", value: "0.957 g/cc" },
      { label: "Tensile Strength", value: "24.5 MPa" },
      { label: "Izod Impact Strength", value: "23.4 J/m" },
    ],
    applications: ["Injection moulded products", "Crates & bins", "Pallets", "Extrusion profiles"],
  },
  {
    id: "leno",
    label: "Leno Bag Grade",
    source: "Post-use PP Leno bags — onion / potato mesh packaging",
    image: "https://res.cloudinary.com/kxwxpxuv/image/upload/q_auto,f_auto/v1790284260/Granules_in_bowl_2K_20260925024045.jpg",
    specs: [
      { label: "MFI (230°C, 2.16kg)", value: "9–11 g/10 min" },
      { label: "Density", value: "0.93–0.96 g/cc" },
      { label: "Tensile Strength", value: "23–26 MPa" },
      { label: "Izod Impact Strength", value: "22–25 J/m" },
    ],
    applications: ["Injection moulded products", "Crates & bins", "Flower pots & planters", "Extrusion profiles"],
  },
];

const SPRING = { type: "spring" as const, stiffness: 320, damping: 32 };

/* ─────────────────────────────────────────────────────────────────
   Simple carousel — no clone hack, no MotionValue conflict.
   Animates by translating the strip by (current * 100)%.
   ───────────────────────────────────────────────────────────────── */
function GradeCarousel({
  items,
  baseWidth = 360,
  autoplayDelay = 4000,
  onActiveChange,
}: {
  items: Grade[];
  baseWidth?: number;
  autoplayDelay?: number;
  onActiveChange?: (index: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(false);
  const dragStartX = useRef(0);
  const count = items.length;

  // notify parent
  useEffect(() => { onActiveChange?.(current); }, [current, onActiveChange]);

  // autoplay
  useEffect(() => {
    if (hovered) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % count), autoplayDelay);
    return () => clearInterval(t);
  }, [hovered, autoplayDelay, count]);

  function prev() { setCurrent(c => (c - 1 + count) % count); }
  function next() { setCurrent(c => (c + 1) % count); }

  return (
    <div
      className="mx-auto flex flex-col items-center gap-4"
      style={{ width: baseWidth }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Circle frame */}
      <div
        className="relative overflow-hidden rounded-full border-2 border-primary/20 bg-dark-foreground/[0.04] shadow-[0_0_40px_-8px_oklch(0.71_0.17_138/0.2)]"
        style={{ width: baseWidth, height: baseWidth }}
        onPointerDown={e => { dragStartX.current = e.clientX; }}
        onPointerUp={e => {
          const dx = e.clientX - dragStartX.current;
          if (dx < -40) next();
          else if (dx > 40) prev();
        }}
      >
        {/* Image strip — translate by current * 100% */}
        <motion.div
          className="flex h-full"
          style={{ width: `${count * 100}%` }}
          animate={{ x: `${-(current * (100 / count))}%` }}
          transition={SPRING}
        >
          {items.map((item, i) => (
            <div
              key={item.id}
              className="h-full shrink-0 cursor-grab select-none"
              style={{ width: `${100 / count}%` }}
            >
              <img
                src={item.image}
                alt={item.label}
                loading={i === 0 ? "eager" : "lazy"}
                draggable={false}
                className="size-full object-cover"
              />
            </div>
          ))}
        </motion.div>

        {/* Subtle inner ring */}
        <div className="pointer-events-none absolute inset-2 rounded-full border border-primary/10" />
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Show ${item.label}`}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === i ? "w-6 bg-primary" : "w-2 bg-dark-foreground/25 hover:bg-dark-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function AevumEcoplastShowcase() {
  const [activeGrade, setActiveGrade] = useState(0);
  const grade = GRADES[activeGrade]!;

  return (
    <section className="section-pad relative overflow-hidden bg-dark text-dark-foreground">

      {/* ── Decorative background ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 grid-lines opacity-[0.06]" />
      <div aria-hidden className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 select-none font-display text-[28rem] font-extrabold leading-none text-dark-foreground/[0.025]">↻</div>
      <div aria-hidden className="pointer-events-none absolute -left-32 -top-40 size-[500px] rounded-full bg-primary/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-20 right-0 size-[400px] rounded-full bg-primary/[0.07] blur-[100px]" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.04] blur-[80px]" />
      <div aria-hidden className="pointer-events-none absolute left-[12%] top-[18%] size-2 rounded-full bg-primary/40" style={{ animation: "orbit 8s linear infinite" }} />
      <div aria-hidden className="pointer-events-none absolute right-[18%] top-[30%] size-1.5 rounded-full bg-primary/30" style={{ animation: "orbit 12s linear infinite reverse" }} />
      <div aria-hidden className="pointer-events-none absolute bottom-[20%] left-[30%] size-1 rounded-full bg-primary/20" style={{ animation: "orbit 10s linear infinite" }} />

      <div className="site-container relative">

        {/* ── Header ── */}
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-dark-foreground/10 pb-6 sm:pb-10">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="shrink-0 overflow-hidden rounded-full">
                <img
                  src="https://res.cloudinary.com/kxwxpxuv/image/upload/v1790284594/Give_a_clear_logo_2K_20260925024418.jpg"
                  alt="Aevum Ecoplast LLP"
                  className="size-16 object-contain sm:size-20"
                />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary sm:text-xs sm:tracking-[0.18em]">Manufacturing partner</p>
                <h3 className="font-display text-lg font-extrabold leading-tight sm:text-2xl">Aevum Ecoplast LLP</h3>
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-extrabold leading-[1.1] sm:text-5xl sm:leading-[1.05]">
                Turning hard-to-recycle plastic into{" "}
                <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>
                  usable material.
                </Highlighter>
              </h2>
              <p className="mt-3 max-w-xl text-xs leading-5 text-dark-muted sm:mt-4 sm:text-lg sm:leading-7">
                Under Aevum Ecoplast LLP, we manufacture recycled PP granules and extruded roofing solutions from waste that would otherwise go unrecovered.
              </p>
            </div>
          </div>
        </Reveal>

        {/* ── Process video ── */}
        <Reveal delay={60} className="mt-6 sm:mt-8">
          <div className="group relative overflow-hidden rounded-2xl border border-dark-foreground/15 bg-dark-foreground/[0.03]">
            <div className="flex items-center justify-between border-b border-dark-foreground/10 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2.5">
                <span className="relative flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-60" />
                  <span className="relative inline-flex size-2.5 rounded-full bg-red-500" />
                </span>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-dark-muted sm:text-xs">Inside the process</p>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary sm:text-xs">Aevum Ecoplast LLP</p>
            </div>
            <div className="relative aspect-video w-full">
              <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 size-full object-cover">
                <source src="https://res.cloudinary.com/kxwxpxuv/video/upload/q_auto,vc_auto/v1790284911/video_erasio.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-dark/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4 sm:p-6">
                <p className="max-w-sm text-xs leading-5 text-dark-muted sm:text-sm">Recycled PP granules manufactured from post-consumer plastic waste.</p>
                <span className="ml-3 shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-primary sm:text-[11px]">Live plant</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── Grade carousel + spec panel ── */}
        <Reveal className="mt-6 sm:mt-8">
          <div className="grid grid-cols-1 items-center gap-10 rounded-2xl border border-dark-foreground/15 bg-dark-foreground/[0.03] p-6 sm:gap-14 sm:p-10 lg:grid-cols-[360px_1fr]">
            <GradeCarousel items={GRADES} baseWidth={360} onActiveChange={setActiveGrade} />

            <motion.div
              key={grade.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <span className="flex w-fit items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-primary sm:text-[11px]">
                <Recycle className="size-3" />{grade.label}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold leading-tight sm:text-3xl">Recycled PP Granules</h3>
              <p className="mt-1 text-xs leading-5 text-dark-muted sm:text-sm">Source: {grade.source}</p>
              <div className="mt-5 grid grid-cols-2 gap-3 sm:mt-6 sm:grid-cols-4">
                {grade.specs.map(spec => (
                  <div key={spec.label} className="rounded-lg border border-dark-foreground/10 bg-dark-foreground/[0.03] p-3">
                    <p className="text-[10px] uppercase tracking-[0.06em] text-dark-muted">{spec.label}</p>
                    <p className="mt-1 font-display text-sm font-bold sm:text-base">{spec.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap gap-2 sm:mt-6">
                {grade.applications.map(app => (
                  <span key={app} className="rounded-full border border-dark-foreground/15 px-2.5 py-1 text-[10px] text-dark-muted sm:text-xs">{app}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </Reveal>

        {/* ── Roofing product ── */}
        <Reveal delay={80} className="mt-4 sm:mt-6">
          <div className="group relative h-full min-h-[260px] overflow-hidden rounded-2xl border border-dark-foreground/15 sm:min-h-[320px]">
            <img src="/aevum/roofing-sheets.jpg" alt="Extruded high strength roofing sheets and boards" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/10" />
            <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full border border-dark-foreground/25 bg-dark/60 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-dark-foreground backdrop-blur-sm sm:left-4 sm:top-4 sm:text-[11px]">
              <Layers className="size-3" />Finished Product
            </span>
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
              <h3 className="font-display text-base font-bold leading-tight sm:text-2xl">Extruded High Strength Roofing Sheets & Boards</h3>
              <p className="mt-1 text-xs leading-5 text-dark-muted sm:text-sm">Made from low-value and multilayer packaging that's otherwise difficult to recycle.</p>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

// Alias so existing imports of QualityShowcase still work
export { AevumEcoplastShowcase as QualityShowcase };
