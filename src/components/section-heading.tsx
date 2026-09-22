import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, copy, inverse = false, className }: { eyebrow: string; title: string; copy?: string; inverse?: boolean; className?: string }) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className={cn("mb-4 text-xs font-bold uppercase tracking-[0.18em]", inverse ? "text-primary" : "text-primary-dark")}>{eyebrow}</p>
      <h2 className={cn("font-display text-4xl font-bold leading-[0.96] sm:text-5xl lg:text-6xl", inverse ? "text-dark-foreground" : "text-foreground")}>{title}</h2>
      {copy ? <p className={cn("mt-6 max-w-2xl text-base leading-7", inverse ? "text-dark-muted" : "text-muted-foreground")}>{copy}</p> : null}
    </div>
  );
}