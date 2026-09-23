import { createFileRoute } from "@tanstack/react-router";
import { Check, Mail, MapPin, Phone } from "lucide-react";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { StatCounter } from "@/components/stat-counter";
import { TiltCard, TiltCardItem } from "@/components/ui/tilt-card";
import { Highlighter } from "@/components/ui/highlighter";
import { stats } from "@/lib/site-data";

export const Route = createFileRoute("/about")({ head:()=>({meta:[
  {title:"About Us | India's Circular Economy Partner — the trash co."},
  {name:"description",content:"From 2 clients in 2020 to 400+ today. Learn how the trash co. is building a tech-driven circular economy across India's EPR landscape from Goa."},
  {name:"keywords",content:"circular economy India, EPR consultancy team, sustainable waste management company, PIBO compliance partner, circular economy company Goa, EPR consultancy Goa, about the trash co."},
  {name:"robots",content:"index, follow"},
  {property:"og:title",content:"About Us | India's Circular Economy Partner — the trash co."},
  {property:"og:description",content:"From 2 clients in 2020 to 400+ today — the trash co. is building a tech-driven circular economy across India."},
  {property:"og:url",content:"https://trashworks.in/about"},
  {property:"og:type",content:"website"},
  {name:"twitter:card",content:"summary_large_image"},
  {name:"twitter:title",content:"About Us | India's Circular Economy Partner — the trash co."},
  {name:"twitter:description",content:"Meet the team building India's tech-driven circular economy. 400+ clients, 26 states, Goa-based."},
]}), component: AboutPage });
const values=["Customer Excellence","Integrity","Trust","Reliability","Transparency"];
const team=[
  {name:"Rajay Rasaikar",role:"Co-Founder",email:"rajay@thetrash.company",phone:"+91 98231 63790",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114467/Screenshot_2026-09-23_at_3.25.29_AM.png_20260923033037_erasio_lyxq0h.png"},
  {name:"Deep Dalsania",role:"Co-Founder",email:"deep@thetrash.company",phone:"+91 95372 31876",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114299/Screenshot_2026-09-23_at_3.25.38_AM_ytaod1.png"},
  {name:"Arushi Thakur",role:"Compliance Head",email:"arushi@thetrash.company",phone:"+91 98342 04825",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114299/Screenshot_2026-09-23_at_3.25.44_AM_ciny75.png"},
  {name:"Dakshata Jain",role:"Business Development Manager",email:"dakshata@thetrash.company",phone:"+91 84598 30559",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114299/Screenshot_2026-09-23_at_3.25.49_AM_hoobv0.png"},
  {name:"Nisanth Nan",role:"Head of Operations",email:"nisanth@thetrash.company",phone:"+91 82750 74017",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114300/Screenshot_2026-09-23_at_3.25.55_AM_f7s03o.png"},
  {name:"Raj Koradia",role:"Operations Head",email:"raj@thetrash.company",phone:"+91 79902 40140",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114837/Screenshot_2026-09-23_at_3.26.00_AM.png_20260923033443_erasio_dhoffh.png"},
  {name:"Anjali Sapam",role:"Head of Marketing",email:"anjali@thetrash.company",phone:"+91 80804 59951",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114304/Screenshot_2026-09-23_at_3.26.11_AM_jprj1d.png"},
  {name:"Twinkle Rokad",role:"Sr. Compliance Executive",email:"twinkle.rokad@thetrash.company",phone:"+91 89990 00013",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114305/Screenshot_2026-09-23_at_3.26.16_AM_mk3oqq.png"},
  {name:"Shirsha Rasoor",role:"Sr. Compliance Executive",email:"shirsha.rasoor@thetrash.company",phone:"+91 89994 60065",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114306/Screenshot_2026-09-23_at_3.26.20_AM_tneayf.png"},
  {name:"Shreya Ghosh",role:"Compliance Executive",email:"shreya@thetrash.company",phone:"+91 93569 48614",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114342/Screenshot_2026-09-23_at_3.26.25_AM_hmulai.png"},
  {name:"Darshana Bhatt",role:"Administrative Assistant",email:"darshana@thetrash.company",phone:"+91 90334 60610",img:"https://res.cloudinary.com/drvug594q/image/upload/v1790114344/Screenshot_2026-09-23_at_3.26.29_AM_w0pjnh.png"},
];
function AboutPage(){return <main>
{/* HERO */}
<section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-dark pb-12 pt-24 text-dark-foreground sm:min-h-[700px] sm:pb-20 sm:pt-32 lg:min-h-[820px] lg:block lg:justify-normal">
  {/* Desktop video */}
  <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 z-0 hidden h-full w-full object-cover opacity-40 sm:block">
    <source src="https://res.cloudinary.com/drvug594q/video/upload/q_auto,vc_auto/v1790116430/Creating_hero_section_video_1080p_20260923035932_erasio_rugvwc.mp4" type="video/mp4" />
  </video>
  {/* Mobile video */}
  <video autoPlay muted loop playsInline preload="auto" className="absolute inset-0 z-0 h-full w-full object-cover opacity-40 sm:hidden">
    <source src="https://res.cloudinary.com/drvug594q/video/upload/q_auto,vc_auto/v1790116645/Change_video_layout_size_1080p_20260923040413_erasio_baz0jp.mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 z-[1] bg-dark/60" />
  <div className="site-container relative z-10 grid items-end gap-6 pt-6 sm:gap-12 sm:pt-10 lg:pt-20">
    <Reveal>
      <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-primary sm:mb-7 sm:text-xs sm:tracking-[0.18em]">About us</p>
      <h1 className="font-display text-[clamp(2.6rem,11vw,7rem)] font-extrabold leading-[0.9] tracking-normal sm:leading-[0.82]">
        A circular economy<br className="hidden sm:block" /> needs clear<br className="hidden sm:block" /> connections.
      </h1>
      <p className="mt-5 max-w-xl text-sm leading-6 text-dark-muted sm:mt-10 sm:text-lg sm:leading-8">
        We connect businesses, regulation, recyclers and high-quality materials through a system built around transparency, trust and trash.
      </p>
    </Reveal>
  </div>
  <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-dark-foreground/10" />
</section>
<WhyChooseUs />
<section className="section-pad bg-dark text-dark-foreground"><div className="site-container"><SectionHeading inverse eyebrow="Our team" titleNode={<>Specialists who keep the <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>circle moving.</Highlighter></>} copy="A cross-functional team working across strategy, compliance, operations, business development and client support."/><div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{team.map((member,i)=><Reveal key={member.email} delay={(i%3)*50}><TiltCard className="border border-dark-foreground/15 bg-dark p-6" maxTilt={12} scale={1.03}><TiltCardItem depth={30}><div className="overflow-hidden rounded-lg aspect-[4/3] w-full"><img src={member.img} alt={member.name} loading="lazy" className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-105"/></div></TiltCardItem><TiltCardItem depth={20} className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-primary">{member.role}</TiltCardItem><TiltCardItem depth={35} as="h3" className="mt-2 font-display text-xl font-bold">{member.name}</TiltCardItem><TiltCardItem depth={25} className="mt-4 space-y-2"><a href={`mailto:${member.email}`} className="flex items-center gap-2 text-xs text-dark-muted hover:text-primary transition-colors"><Mail className="size-3.5 shrink-0"/><span className="truncate">{member.email}</span></a><a href={`tel:${member.phone.replace(/\s/g,"")}`} className="flex items-center gap-2 text-xs text-dark-muted hover:text-primary transition-colors"><Phone className="size-3.5 shrink-0"/><span>{member.phone}</span></a></TiltCardItem></TiltCard></Reveal>)}</div></div></section>

<section className="section-pad bg-light-muted"><div className="site-container"><SectionHeading eyebrow="How we work" titleNode={<>Five values. <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>One operating standard.</Highlighter></>} /><div className="mt-14 grid gap-px bg-light-border sm:grid-cols-2 lg:grid-cols-5">{values.map((v,i)=><Reveal key={v} delay={i*60} className="bg-light-surface p-7"><span className="grid size-8 place-items-center rounded-full bg-primary"><Check className="size-4" /></span><h3 className="mt-20 font-display text-xl font-bold">{v}</h3></Reveal>)}</div></div></section>
</main>}