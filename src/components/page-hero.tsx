import { Reveal } from "@/components/reveal";

export function PageHero({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return <section className="grid-lines bg-dark pt-32 text-dark-foreground"><div className="site-container pb-18 pt-14 sm:pb-24 sm:pt-20"><Reveal><p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">{eyebrow}</p><h1 className="mt-5 max-w-5xl font-display text-5xl font-bold leading-[0.94] sm:text-7xl lg:text-8xl">{title}</h1><p className="mt-8 max-w-2xl text-lg leading-8 text-dark-muted">{copy}</p></Reveal></div></section>;
}