import { BatteryCharging, Boxes, CircleGauge, Cog, FileCheck2, PackageCheck, Recycle, ShieldCheck } from "lucide-react";

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Recycled Polymers", to: "/recycled-polymers" },
  { label: "Our Work", to: "/our-work" },
  { label: "Blog", to: "/blog" },
] as const;

export const stats = [
  { value: 400, suffix: "+", label: "Customers delighted" },
  { value: 50000, suffix: "+", label: "Tons of trash channelised" },
  { value: 10, suffix: "+", label: "Years of relevant experience" },
  { value: 26, suffix: "", label: "States & UTs presence" },
];

export const services = [
  { title: "Plastic Packaging EPR", short: "Plastic", description: "Compliance for producers, importers and brand owners using plastic packaging.", icon: Recycle },
  { title: "Battery EPR", short: "Battery", description: "Registration and fulfilment support across portable, automotive, industrial and EV batteries.", icon: BatteryCharging },
  { title: "E-Waste EPR", short: "E-waste", description: "Obligation mapping and documentation for electrical and electronic equipment.", icon: Cog },
  { title: "Tyre EPR", short: "Tyres", description: "Traceable recycling pathways for all tyre categories in an environmentally safe manner.", icon: CircleGauge },
  { title: "EPR Credits", short: "Credits", description: "Verified credit procurement with transparent documentation and audit-ready trails.", icon: FileCheck2 },
  { title: "Environmental Services", short: "Environment", description: "Environmental advisory, waste management and other regulatory compliances.", icon: ShieldCheck },
];

export const polymers = [
  { name: "r.LDPE", note: "Natural", applications: "Heavy-duty films & sheets · lateral tube & pipe · impact modifier" },
  { name: "r.HDPE", note: "High density", applications: "Plastic bottles · toiletry & cosmetic containers · extrusion sheets" },
  { name: "PP Raffia", note: "Woven grade", applications: "Raffia tapes · woven sacks · monofilament · ropes" },
  { name: "PPCP", note: "Copolymer", applications: "Furniture · appliances · automotive components · toys · caps & closures" },
];

export const clients = [
  "G. Amphray Laboratories", "Gharda Chemicals", "Mark Elektriks", "Avery Dennison", "Bansal Industries",
  "Aradhya Industry", "Mahaveer Group", "Zen Pharma", "BASF", "Chemetall", "Saint-Gobain", "Kaizen Industries",
  "Ratnatris Pharmaceuticals", "Rockwool India", "Insecticides India Ltd", "IMERYS", "FDC Limited", "Hindustan Pencils",
  "Polycab", "Kansai Nerolac", "Pidilite", "Godrej Industries", "Blue Star", "Finolex", "Sun Pharma", "Jindal Films",
];

export const testimonials = [
  { company: "Gharda Chemicals", quote: "The team brought clarity to a complex EPR process and kept every submission moving with timely, precise documentation." },
  { company: "Kaizen Industries", quote: "Professional, responsive and dependable. We always knew where our compliance work stood and what came next." },
  { company: "Manufacturing client", quote: "Their practical guidance helped our internal teams align operations, records and regulatory requirements without disruption." },
  { company: "Packaging client", quote: "A transparent partner for EPR credit fulfilment, with the traceability and documentation our audits demand." },
  { company: "Pharmaceutical client", quote: "Consistent follow-through, quick resolution of queries and a level of ownership that is rare in compliance support." },
];

export const support = [
  { title: "End-to-end EPR support", icon: FileCheck2 },
  { title: "Reliable polymer sourcing", icon: Boxes },
  { title: "Quality assurance", icon: ShieldCheck },
  { title: "Recycled packaging development", icon: PackageCheck },
];