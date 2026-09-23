import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Highlighter } from "@/components/ui/highlighter";
import { polymers, support } from "@/lib/site-data";
import ldpe from "@/assets/recycled-ldpe.jpg"; import hdpe from "@/assets/recycled-hdpe.jpg"; import raffia from "@/assets/recycled-pp-raffia.jpg"; import ppcp from "@/assets/recycled-ppcp.jpg";
const images=[ldpe,hdpe,raffia,ppcp];
export const Route=createFileRoute("/recycled-polymers")({head:()=>({meta:[
  {title:"Recycled PCR Polymers for Packaging & Automotive | the trash co."},
  {name:"description",content:"High-grade PCR granules — r.LDPE, r.HDPE, PP Raffia, PPCP — for rigid & flexible packaging, automotive and consumer goods. Sourced with quality and traceability built in."},
  {name:"keywords",content:"PCR granules India, recycled polymers manufacturer, post-consumer recycled plastic, HDPE PCR, recycled PP granules, sustainable packaging material India, recycled polymer supplier Goa, r.LDPE granules, PPCP recycled, plastic recycling Goa"},
  {name:"robots",content:"index, follow"},
  {property:"og:title",content:"Recycled PCR Polymers for Packaging & Automotive | the trash co."},
  {property:"og:description",content:"High-grade PCR granules for rigid, flexible packaging, automotive and consumer goods — sourced with quality and traceability."},
  {property:"og:url",content:"https://thetrash.company/recycled-polymers"},
  {property:"og:type",content:"website"},
  {name:"twitter:card",content:"summary_large_image"},
  {name:"twitter:title",content:"Recycled PCR Polymers for Packaging & Automotive | the trash co."},
  {name:"twitter:description",content:"r.LDPE, r.HDPE, PP Raffia & PPCP — high-grade recycled polymers for Indian manufacturers."},
]}),component:PolymerPage});
function PolymerPage(){return <main>
{/* HERO */}
<section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-dark pb-12 pt-24 text-dark-foreground sm:min-h-[700px] sm:pb-20 sm:pt-32 lg:min-h-[820px] lg:block lg:justify-normal">
  {/* Desktop video */}
  <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 z-0 hidden h-full w-full object-cover opacity-40 sm:block">
    <source src="https://res.cloudinary.com/drvug594q/video/upload/q_auto,vc_auto/v1790117302/Hero_video_for_recycled_polymers_20260923041232_erasio_vsjvb0.mp4" type="video/mp4" />
  </video>
  {/* Mobile video */}
  <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 z-0 h-full w-full object-cover opacity-40 sm:hidden">
    <source src="https://res.cloudinary.com/drvug594q/video/upload/q_auto,vc_auto/v1790117610/Change_video_layout_size_1080p_20260923042004_erasio_tkd24p.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 z-[1] bg-dark/60" />
  <div className="site-container relative z-10 grid items-end gap-6 pt-6 sm:gap-12 sm:pt-10 lg:pt-20">
    <Reveal>
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-primary sm:mb-7 sm:text-xs sm:tracking-[0.18em]">Recycled polymers</p>
      <h1 className="font-display text-[clamp(2.6rem,11vw,7rem)] font-extrabold leading-[0.9] tracking-normal sm:leading-[0.82]">
        Better material.<br className="hidden sm:block" /> Clearer provenance.
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-6 text-dark-muted sm:mt-10 sm:text-lg sm:leading-8">
        High-grade post-consumer recycled polymers for manufacturers ready to make recycled content a reliable part of production.
      </p>
    </Reveal>
  </div>
  <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-dark-foreground/10" />
</section>
<section className="section-pad"><div className="site-container"><SectionHeading eyebrow="PCR portfolio" titleNode={<>Four grades.{" "}<Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>Many second lives.</Highlighter></>}/><div className="mt-14 grid gap-3 md:grid-cols-2">{polymers.map((p,i)=><Reveal key={p.name} delay={i*60}><article className="group relative overflow-hidden border border-light-border bg-light-surface transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_-8px_oklch(0.71_0.17_138/0.35)]"><div className="aspect-[4/3] overflow-hidden"><img src={images[i]} alt={`${p.name} recycled polymer granules and example application`} width={1200} height={900} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-primary-dark">{p.note}</p><h2 className="mt-2 font-display text-3xl font-bold">{p.name}</h2><p className="mt-3 text-sm leading-6 text-muted-foreground">{p.applications}</p></div></article></Reveal>)}</div></div></section>
<section className="section-pad bg-light-muted"><div className="site-container"><SectionHeading eyebrow="Recycled-content obligations" titleNode={<>ERP Rules for{" "}<Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>Recycled Plastic Granules</Highlighter></>} copy="Plastic Waste Management Amendment Rules, 2022 — minimum recycled plastic content indicated as percentages for PIBOs."/><div className="mt-12 overflow-x-auto border border-light-border bg-light-surface"><table className="w-full min-w-[680px] border-collapse text-left"><caption className="sr-only">Recycled content percentage schedule by plastic packaging category</caption><thead><tr className="bg-dark text-dark-foreground"><th className="p-5">Category</th><th className="p-5">2025–26</th><th className="p-5">2026–27</th><th className="p-5">2027–28</th><th className="p-5">2028 onwards</th></tr></thead><tbody>{[["Cat I","30","40","50","60"],["Cat II","10","10","20","20"],["Cat III","05","05","10","10"]].map(row=><tr key={row[0]} className="border-t border-light-border">{row.map((cell,i)=><td key={cell} className={`p-5 ${i===0?"font-bold":"font-display text-2xl"}`}>{cell}{i>0?<span className="text-sm">%</span>:null}</td>)}</tr>)}</tbody></table></div></div></section>
<section className="section-pad bg-dark text-dark-foreground"><div className="site-container"><SectionHeading inverse eyebrow="How we help" titleNode={<>Confidence from{" "}<Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>source to shelf.</Highlighter></>}/><div className="mt-12 grid gap-px bg-dark-foreground/15 sm:grid-cols-2 lg:grid-cols-4">{support.map((s,i)=>{const Icon=s.icon;return <Reveal key={s.title} delay={i*50} className="bg-dark p-7"><Icon className="size-7 text-primary"/><h3 className="mt-16 font-display text-xl font-bold">{s.title}</h3></Reveal>})}</div><div className="mt-14 flex flex-wrap gap-2">{["Rigid Packaging","Flexible Packaging","Automotive Components","Consumer Goods","Caps & Closures"].map(x=><span key={x} className="border border-dark-foreground/20 px-4 py-3 text-sm text-dark-muted">{x}</span>)}</div><Button asChild variant="hero" size="xl" className="mt-10"><Link to="/contact">Request a material conversation <ArrowRight/></Link></Button></div></section></main>}