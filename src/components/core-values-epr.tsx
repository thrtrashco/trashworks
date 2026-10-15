import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, BatteryCharging, Cpu, CircleGauge, Recycle, ShieldCheck, Star, Handshake, Eye } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Highlighter } from "@/components/ui/highlighter";

const coreValues = [
  { icon: Star,        label: "Customer\nExcellence" },
  { icon: ShieldCheck, label: "Integrity" },
  { icon: Handshake,   label: "Trust" },
  { icon: Award,       label: "Reliability" },
  { icon: Eye,         label: "Transparency" },
];

const eprCategories = [
  {
    icon: Recycle,
    title: "Plastic Packaging",
    description: "Products with plastic packaging, manufactured or imported.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
  },
  {
    icon: Cpu,
    title: "Electronics & Electricals",
    description: "Products falling under electrical and electronic equipment categories.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800",
  },
  {
    icon: BatteryCharging,
    title: "Batteries",
    description: "Portable, automotive, industrial and electric vehicle batteries.",
    image: "https://images.unsplash.com/photo-1609592424847-b1d2e2bc1c02?q=80&w=800",
  },
  {
    icon: CircleGauge,
    title: "Tyres",
    description: "All tyre categories recycled in an environmentally safe manner.",
    image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?q=80&w=800",
  },
];

// flat-top hexagon: 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%
const HEX_CLIP = "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)";

export function CoreValuesEpr() {
  return (
    <>
      {/* CORE VALUES */}
      <section className="section-pad overflow-hidden bg-background">
        <div className="site-container">
          <Reveal>
            <div className="mb-12 text-center sm:mb-16">
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary-dark">
                Who we are
              </p>
              <h2 className="font-display text-3xl font-bold leading-[1.05] sm:text-5xl">
                Core{" "}
                <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>
                  Values
                </Highlighter>
              </h2>
            </div>
          </Reveal>

          {/*
            Desktop: 5 hexagons in a row, odd-index items pushed down ~7rem (replicating mt-9).
            Mobile: 2-column grid, no offset.
          */}
          <div className="hidden lg:flex lg:items-start lg:justify-center lg:gap-0">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              const isOffset = index % 2 !== 0; // items 1, 3 are pushed down
              return (
                <Reveal key={value.label} delay={index * 80}>
                  <div
                    className="group relative mx-[-14px] cursor-pointer"
                    style={{ marginTop: isOffset ? "7rem" : "0" }}
                  >
                    {/* Hex background layer — border colour, slightly larger */}
                    <div
                      className="absolute inset-0 scale-[1.04] bg-primary/30 transition-colors duration-300 group-hover:bg-primary"
                      style={{ clipPath: HEX_CLIP }}
                    />
                    {/* Hex inner layer — fills on hover */}
                    <div
                      className="relative flex h-[200px] w-[220px] flex-col items-center justify-center gap-3 bg-background transition-colors duration-300 group-hover:bg-primary"
                      style={{ clipPath: HEX_CLIP }}
                    >
                      {/* default icon (dark) */}
                      <Icon className="size-14 text-foreground transition-colors duration-300 group-hover:text-primary-foreground" />
                      <span className="whitespace-pre-line text-center text-sm font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary-foreground">
                        {value.label}
                      </span>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* Mobile fallback — simple 2-col grid, no hex clip */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Reveal key={value.label} delay={index * 80}>
                  <div className="group flex flex-col items-center gap-3 border border-light-border bg-light-surface p-5 text-center transition-all duration-300 hover:border-primary hover:bg-primary">
                    <Icon className="size-8 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                    <span className="whitespace-pre-line text-xs font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-primary-foreground sm:text-sm">
                      {value.label}
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* EPR SECTION */}
      <section className="section-pad bg-dark text-dark-foreground">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">

            {/* Left — copy */}
            <Reveal>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Extended Producer Responsibility
              </p>
              <h2 className="font-display text-3xl font-bold leading-[1.05] sm:text-5xl">
                EPR — compliance turned{" "}
                <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>
                  environmental action.
                </Highlighter>
              </h2>
              <p className="mt-6 text-sm leading-6 text-dark-muted sm:text-lg sm:leading-7">
                EPR is an environmental policy where producers take responsibility for the safe disposal of their products at end-of-life.
              </p>
              <p className="mt-4 text-sm leading-6 text-dark-muted sm:text-base sm:leading-7">
                Policy implementation requires on-ground action. We ensure companies go beyond compliance — turning regulatory obligations into genuine environmental outcomes.
              </p>
              <Link
                to="/services"
                className="mt-8 inline-flex items-center gap-2 border border-primary/40 px-5 py-3 text-sm font-bold text-primary transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground sm:mt-10"
              >
                Explore EPR services <ArrowRight className="size-4" />
              </Link>
            </Reveal>

            {/* Right — category grid */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {eprCategories.map((cat, index) => {
                const Icon = cat.icon;
                return (
                  <Reveal key={cat.title} delay={index * 80}>
                    <div className="group relative overflow-hidden border border-dark-foreground/15">
                      {/* image */}
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={cat.image}
                          alt={cat.title}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
                        <div className="absolute left-3 top-3 grid size-8 place-items-center rounded-full border border-dark-foreground/20 bg-dark/60 text-primary backdrop-blur-sm sm:left-4 sm:top-4 sm:size-9">
                          <Icon className="size-4" />
                        </div>
                      </div>
                      {/* text */}
                      <div className="p-3.5 sm:p-4">
                        <h3 className="font-display text-sm font-bold sm:text-base">{cat.title}</h3>
                        <p className="mt-1.5 text-xs leading-5 text-dark-muted sm:text-sm sm:leading-6">
                          {cat.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
