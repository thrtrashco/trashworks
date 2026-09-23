import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { services } from "@/lib/site-data";

export const Route=createFileRoute("/services")({head:()=>({meta:[
  {title:"EPR Services — Plastic, Battery, E-Waste & Tyre Compliance | the trash co."},
  {name:"description",content:"End-to-end EPR registration, credit fulfilment and audit-ready compliance for Plastic Packaging, Battery, E-Waste and Tyre EPR across India."},
  {name:"keywords",content:"EPR registration India, CPCB EPR portal, plastic packaging EPR, battery EPR compliance, e-waste EPR, tyre EPR, EPR credits India, PIBO obligation, EPR compliance company Goa, extended producer responsibility services India"},
  {name:"robots",content:"index, follow"},
  {property:"og:title",content:"EPR Services — Plastic, Battery, E-Waste & Tyre Compliance | the trash co."},
  {property:"og:description",content:"End-to-end EPR registration, fulfilment and audit support for Plastic, Battery, E-Waste and Tyre EPR across India."},
  {property:"og:url",content:"https://thetrash.company/services"},
  {property:"og:type",content:"website"},
  {name:"twitter:card",content:"summary_large_image"},
  {name:"twitter:title",content:"EPR Services — Plastic, Battery, E-Waste & Tyre Compliance | the trash co."},
  {name:"twitter:description",content:"Practical EPR compliance support for Indian businesses — plastic, battery, e-waste, tyre, credits and more."},
]}),component:ServicesPage});

function ServicesPage(){return <main>

{/* HERO */}
<section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-dark pb-12 pt-24 text-dark-foreground sm:min-h-[700px] sm:pb-20 sm:pt-32 lg:min-h-[820px] lg:block lg:justify-normal">
  <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 z-0 hidden h-full w-full object-cover opacity-40 sm:block">
    <source src="https://res.cloudinary.com/drvug594q/video/upload/q_auto,vc_auto/v1790108289/HERO_sjsvhx.mp4" type="video/mp4" />
  </video>
  <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 z-0 h-full w-full object-cover opacity-40 sm:hidden">
    <source src="https://res.cloudinary.com/drvug594q/video/upload/q_auto,vc_auto/v1790108346/Change_video_dimensions_1080p_20260923014652_zdbtsa.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 z-[1] bg-dark/60" />
  <div className="site-container relative z-10 grid items-end gap-6 pt-6 sm:gap-12 sm:pt-10 lg:pt-20">
    <Reveal>
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-primary sm:mb-7 sm:text-xs sm:tracking-[0.18em]">EPR &amp; environmental services</p>
      <h1 className="font-display text-[clamp(2.6rem,11vw,7rem)] font-extrabold leading-[0.9] tracking-normal sm:leading-[0.82]">
        Compliance that works<br className="hidden sm:block" /> in the real world.
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-6 text-dark-muted sm:mt-10 sm:text-lg sm:leading-8">
        A practical operating partner for producers, importers and brand owners navigating India's evolving environmental regulations.
      </p>
    </Reveal>
  </div>
  <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-dark-foreground/10" />
</section>

{/* EPR CATEGORIES */}
<section className="section-pad">
  <div className="site-container">
    <SectionHeading
      eyebrow="EPR categories"
      titleNode={<>From obligation to{" "}<Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>evidence.</Highlighter></>}
      copy="We coordinate each stage—from applicability and registration through fulfilment, filing and audit support."
    />
    <div className="mt-14 grid auto-rows-[280px] gap-3 md:grid-cols-2 lg:grid-cols-3">
      {services.map((s,i)=>{const Icon=s.icon;return(
        <Reveal key={s.title} delay={i*50} className={i===0?"md:col-span-2":i===5?"lg:col-span-2":""}>
          <article className="group flex h-full flex-col border border-light-border bg-light-surface p-7 transition-all hover:border-primary-dark">
            <div className="flex items-start justify-between">
              <span className="grid size-12 place-items-center rounded-full bg-primary"><Icon className="size-5"/></span>
              <span className="text-xs text-muted-foreground">0{i+1}</span>
            </div>
            <div className="mt-auto">
              <h2 className="font-display text-2xl font-bold">{s.title}</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">{s.description}</p>
            </div>
          </article>
        </Reveal>
      )})}
    </div>
  </div>
</section>

{/* BEYOND EPR */}
<section className="section-pad bg-dark text-dark-foreground">
  <div className="site-container grid gap-14 lg:grid-cols-2">
    <SectionHeading
      inverse
      eyebrow="Beyond EPR"
      titleNode={<>Environmental systems,{" "}<Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>joined up.</Highlighter></>}
      copy="Additional support for environmental services, waste management and other compliances—designed around your actual operations."
    />
    <div className="grid gap-3">
      {["Applicability and gap assessment","Registrations and authorisations","Waste collection and channelisation","Returns, documentation and audit readiness","Credit strategy and procurement"].map((x,i)=>(
        <Reveal key={x} delay={i*40} className="flex items-center gap-4 border-b border-dark-foreground/15 py-5">
          <CheckCircle2 className="size-5 text-primary"/>
          <span className="font-display text-lg font-bold">{x}</span>
        </Reveal>
      ))}
    </div>
  </div>
</section>

{/* CTA */}
<section className="section-pad bg-primary">
  <div className="site-container flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.18em]">Your next filing starts here</p>
      <h2 className="mt-5 max-w-3xl font-display text-5xl font-bold leading-none">
        Build a{" "}
        <Highlighter action="underline" color="oklch(0.16 0.02 130)" strokeWidth={3} animationDuration={800} isView drawDelay={900}>
          cleaner compliance
        </Highlighter>{" "}path.
      </h2>
    </div>
    <Button asChild variant="ink" size="xl"><Link to="/contact">Discuss your obligations <ArrowRight/></Link></Button>
  </div>
</section>

</main>}
