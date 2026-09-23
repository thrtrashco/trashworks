import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Asterisk, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatCounter } from "@/components/stat-counter";
import { ServicesShowcase } from "@/components/services-showcase";
import { QualityShowcase } from "@/components/quality-showcase";
import { CoreValuesEpr } from "@/components/core-values-epr";
import { TrustBar } from "@/components/trust-bar";
import { services, stats, testimonials } from "@/lib/site-data";
import { cn } from "@/lib/utils";
import { Highlighter } from "@/components/ui/highlighter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "the trash co. | EPR Compliance & Circular Economy Partner, Goa" },
      { name: "description", content: "Goa-based EPR compliance and circular economy company serving businesses across India. Plastic, battery, e-waste & tyre EPR — 400+ clients, 26 states, one platform." },
      { name: "keywords", content: "EPR compliance India, EPR compliance company Goa, extended producer responsibility India, circular economy company India, plastic waste management, EPR credits India, waste channelisation, CPCB compliance, recycled polymers India, PIBO compliance, EPR consultancy Goa" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "the trash co. | EPR Compliance & Circular Economy Partner, Goa" },
      { property: "og:description", content: "Goa-based EPR compliance and circular economy company. Plastic, battery, e-waste & tyre EPR — 400+ clients, 26 states." },
      { property: "og:url", content: "https://thetrash.company/" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "the trash co. | EPR Compliance & Circular Economy Partner, Goa" },
      { name: "twitter:description", content: "Tech-enabled EPR compliance and recycled polymer solutions for businesses across India." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-dark pb-12 pt-24 text-dark-foreground sm:min-h-[700px] sm:pb-20 sm:pt-32 lg:min-h-[820px] lg:block lg:justify-normal">
        {/* Desktop video */}
        <video autoPlay muted loop playsInline className="absolute inset-0 z-0 hidden h-full w-full object-cover opacity-30 sm:block">
          <source src="https://res.cloudinary.com/drvug594q/video/upload/v1790108289/HERO_sjsvhx.mp4" type="video/mp4" />
        </video>
        {/* Mobile video */}
        <video autoPlay muted loop playsInline className="absolute inset-0 z-0 h-full w-full object-cover opacity-30 sm:hidden">
          <source src="https://res.cloudinary.com/drvug594q/video/upload/v1790108346/Change_video_dimensions_1080p_20260923014652_zdbtsa.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-[1] bg-dark/60" />

        <div className="site-container relative z-10 grid items-end gap-6 pt-6 sm:gap-12 sm:pt-10 lg:pt-20">
          <Reveal>
            <p className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-primary sm:mb-7 sm:text-xs sm:tracking-[0.18em]">
              <Asterisk className="size-3.5 sm:size-4" /> India's circular economy partner
            </p>
            <h1 className="font-display text-[clamp(2.4rem,13vw,8.5rem)] font-extrabold leading-[0.88] tracking-normal sm:leading-[0.78]">
              <span className="block">Transparency.</span>
              <span className="block text-primary">Trust.</span>
              <span className="block">Trash.</span>
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-dark-muted sm:mt-10 sm:text-lg sm:leading-8">
              We connect regulation, recovery and recycled materials to make circularity work for Indian business.
            </p>
          </Reveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-dark-foreground/10" />
      </section>

      {/* IMPACT IN MOTION */}
      <section className="section-pad bg-background">
        <div className="site-container">
          <Reveal>
            <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
              <SectionHeading
                eyebrow="Impact in motion"
                title="Waste is not the end of the line."
                titleNode={<>Waste is not <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView>the end</Highlighter> of the line.</>}
              />
              <p className="max-w-xl text-sm leading-6 text-muted-foreground sm:text-lg sm:leading-7 lg:self-end lg:text-xl lg:leading-8">
                It is a measurable material stream, a compliance responsibility and—managed well—a source of value. We build the systems that connect all three.
              </p>
            </div>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 border-t border-light-border pt-7 sm:mt-14 sm:gap-x-6 sm:gap-y-10 sm:pt-10 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className={cn("border-l-2 pl-3.5 sm:pl-4", index % 2 === 0 ? "border-primary" : "border-dark")}>
                <StatCounter {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SERVICES SHOWCASE */}
      <ServicesShowcase />

      {/* CLIENT MARQUEE */}
      <TrustBar />
     {/* QUALITY SHOWCASE */}
      <QualityShowcase />


     

 
      {/* TESTIMONIALS */}
      <section className="section-pad bg-background">
        <div className="site-container">
          <Reveal>
            <SectionHeading
              eyebrow="Trusted relationships"
              title="Compliance feels simpler with the right team."
              titleNode={<>Compliance feels <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView>simpler</Highlighter> with the right team.</>}
            />
          </Reveal>
          <p className="mt-4 text-[11px] text-muted-foreground sm:mt-5 sm:text-xs">Representative client feedback, paraphrased for clarity.</p>
          <div className="mt-8 grid grid-cols-2 gap-2.5 sm:mt-12 sm:gap-3 lg:grid-cols-5">
            {testimonials.map((item, index) => (
              <Reveal
                key={item.company}
                delay={index * 50}
                className={cn("border border-light-border bg-light-surface p-4 sm:p-6", index === 0 && "col-span-2 lg:col-span-1")}
              >
                <div className="flex gap-0.5 text-primary-dark" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-current" />
                  ))}
                </div>
                <Quote className="mt-5 size-5 text-primary sm:mt-8 sm:size-7" />
                <blockquote className="mt-3 line-clamp-4 text-xs leading-5 sm:mt-4 sm:line-clamp-none sm:text-sm sm:leading-6">
                  "{item.quote}"
                </blockquote>
                <p className="mt-5 border-t border-light-border pt-3 text-[10px] font-bold uppercase tracking-[0.08em] sm:mt-7 sm:pt-4 sm:text-xs sm:tracking-[0.1em]">
                  {item.company}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

     

      {/* CTA */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        {/* decorative grid lines */}
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-10" aria-hidden="true" />
        {/* decorative large number */}
        <div className="pointer-events-none absolute -right-8 -top-10 select-none font-display text-[22rem] font-extrabold leading-none text-primary-foreground/[0.04] sm:text-[28rem]" aria-hidden="true">
          ↻
        </div>

        <div className="site-container relative z-10">
          {/* top stat bar */}
          <div className="grid grid-cols-2 gap-px border-b border-primary-foreground/20 bg-primary-foreground/20 sm:grid-cols-4">
            {[
              { value: "400+", label: "Clients" },
              { value: "50K+", label: "Tons channelised" },
              { value: "26+",  label: "States & UTs" },
              { value: "10+",  label: "Years experience" },
            ].map((s) => (
              <div key={s.label} className="bg-primary px-5 py-5 sm:px-6 sm:py-6">
                <p className="font-display text-3xl font-extrabold sm:text-4xl">{s.value}</p>
                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.12em] text-primary-foreground/60">{s.label}</p>
              </div>
            ))}
          </div>

          {/* main content row */}
          <div className="flex flex-col gap-10 py-16 sm:py-20 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <div className="max-w-3xl">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-foreground/60 sm:text-xs">
                Start with clarity
              </p>
              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[0.95] sm:text-6xl lg:text-7xl">
                Turn your obligations into{" "}
                <Highlighter action="underline" color="oklch(0.16 0.02 130)" strokeWidth={3} animationDuration={800} isView>
                  forward motion.
                </Highlighter>
              </h2>
              {/* trust badges */}
              <div className="mt-8 flex flex-wrap gap-3">
                {["EPR Registration", "Waste Channelisation", "Recycled Polymers", "Credit Procurement"].map((tag) => (
                  <span key={tag} className="rounded-full border border-primary-foreground/25 px-3 py-1.5 text-xs font-medium text-primary-foreground/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-4 lg:items-end">
              <Button asChild size="xl" variant="ink" className="w-full lg:w-auto">
                <Link to="/contact">
                  Talk to our team <ArrowRight />
                </Link>
              </Button>
              <p className="text-xs text-primary-foreground/50 lg:text-right">
                Free consultation · Response within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}