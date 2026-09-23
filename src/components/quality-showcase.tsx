import { Reveal } from "@/components/reveal";
import { Highlighter } from "@/components/ui/highlighter";
import { Award, Recycle, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const materials = [
  { title: "Rigid Packaging", grade: "PCR Grade A", image: "https://res.cloudinary.com/drvug594q/image/upload/v1790109285/Screenshot_2026-09-23_at_1.58.10_AM.png_20260923020420_dysp0u.jpg", featured: true },
  { title: "Flexible Packaging", grade: "PCR Grade B", image: "https://res.cloudinary.com/drvug594q/image/upload/v1790109401/Screenshot_2026-09-23_at_1.58.16_AM.png_20260923020600_erasio_sosbg6.png" },
  { title: "Automotive Components", grade: "Engineering Grade", image: "https://res.cloudinary.com/drvug594q/image/upload/v1790109635/Screenshot_2026-09-23_at_1.58.23_AM.png_20260923020745_erasio_lrssuc.png" },
  { title: "Consumer Goods", grade: "PCR Grade A", image: "https://res.cloudinary.com/drvug594q/image/upload/v1790109648/Screenshot_2026-09-23_at_1.58.36_AM.png_20260923020755_erasio_w6378m.png" },
  { title: "Caps & Closures", grade: "Food-Contact Safe", image: "https://res.cloudinary.com/drvug594q/image/upload/v1790109638/Screenshot_2026-09-23_at_1.58.29_AM.png_20260923020737_erasio_e8uqjw.png" },
];

const markers = [
  { icon: ShieldCheck, label: "Batch-tested for consistency" },
  { icon: Recycle, label: "Traceable recycled feedstock" },
  { icon: Award, label: "Industry-standard grading" },
];

export function QualityShowcase() {
  return (
    <section className="section-pad bg-dark text-dark-foreground">
      <div className="site-container">
        <Reveal>
          <div className="flex flex-col gap-5 border-b border-dark-foreground/10 pb-6 sm:flex-row sm:items-end sm:justify-between sm:gap-6 sm:pb-10">
            <div>
              <p className="mb-2.5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary sm:mb-3 sm:text-xs sm:tracking-[0.18em]">
                Material quality
              </p>
              <h2 className="font-display text-2xl font-extrabold leading-[1.1] sm:text-5xl sm:leading-[1.05]">
                Committed to quality,{" "}
                <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>
                  batch after batch.
                </Highlighter>
              </h2>
              <p className="mt-3 max-w-xl text-xs leading-5 text-dark-muted sm:mt-4 sm:text-lg sm:leading-7">
                Rigorous sourcing processes for consistent performance — high-grade granules that meet industry standard.
              </p>
            </div>

            <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:shrink-0 sm:flex-col sm:gap-3 sm:overflow-visible sm:px-0 sm:pb-0 sm:items-end">
              {markers.map((marker) => {
                const Icon = marker.icon;
                return (
                  <div key={marker.label} className="flex shrink-0 items-center gap-1.5 text-[11px] text-dark-muted sm:gap-2.5 sm:text-sm">
                    <Icon className="size-3.5 shrink-0 text-primary sm:size-4" />
                    <span className="whitespace-nowrap">{marker.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:mt-12 sm:gap-3 lg:grid-cols-4 lg:grid-rows-2">
          {materials.map((material, index) => (
            <Reveal
              key={material.title}
              delay={index * 60}
              className={cn(
                "group relative overflow-hidden border border-dark-foreground/15",
                material.featured
                  ? "col-span-2 aspect-[16/11] sm:aspect-[16/9] lg:col-span-2 lg:row-span-2 lg:aspect-auto"
                  : "col-span-1 aspect-[4/5] sm:col-span-1 sm:aspect-[4/3]"
              )}
            >
              <img
                src={material.image}
                alt={material.title}
                loading="lazy"
                className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/25 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              <span className="absolute right-2 top-2 rounded-full border border-dark-foreground/25 bg-dark/50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.06em] text-dark-foreground backdrop-blur-sm sm:right-4 sm:top-4 sm:px-2.5 sm:py-1 sm:text-[11px] sm:tracking-[0.08em]">
                {material.grade}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-5">
                <h3
                  className={cn(
                    "font-display font-bold leading-tight",
                    material.featured ? "text-base sm:text-3xl" : "text-xs sm:text-lg"
                  )}
                >
                  {material.title}
                </h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}