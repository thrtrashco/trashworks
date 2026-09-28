import { BatteryCharging, Boxes, CircleGauge, Cog, FileCheck2, PackageCheck, Recycle, ShieldCheck } from "lucide-react";

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Our Recycling", to: "/recycled-polymers" },
  { label: "Contact", to: "/contact" },
] as const;

export const stats = [
  { value: 400, suffix: "+", label: "Customers delighted" },
  { value: 50000, suffix: "+", label: "Tons of trash channelised" },
  { value: 10, suffix: "+", label: "Years of relevant experience" },
  { value: 26, suffix: "+", label: "States & UTs presence" },
];

export const services = [
  { title: "Plastic Packaging EPR", short: "Plastic", description: "Compliance for producers, importers and brand owners using plastic packaging.", icon: Recycle, image: "/images/services/plastic-packaging.jpg" },
  { title: "Battery EPR", short: "Battery", description: "Registration and fulfilment support across portable, automotive, industrial and EV batteries.", icon: BatteryCharging, image: "/images/services/battery.jpg" },
  { title: "E-Waste EPR", short: "E-waste", description: "Obligation mapping and documentation for electrical and electronic equipment.", icon: Cog, image: "/images/services/ewaste.jpg" },
  { title: "Tyre EPR", short: "Tyres", description: "Traceable recycling pathways for all tyre categories in an environmentally safe manner.", icon: CircleGauge, image: "/images/services/tyre.jpg" },
  { title: "EPR Credits", short: "Credits", description: "Verified credit procurement with transparent documentation and audit-ready trails.", icon: FileCheck2, image: "/images/services/epr-credits.jpg" },
  { title: "Environmental Services", short: "Environment", description: "Environmental advisory, waste management and other regulatory compliances.", icon: ShieldCheck, image: "/images/services/environmental.jpg" },
];

export const polymers = [
  {
    name: "PP Jumbo Bags",
    note: "Recycled PP Granules",
    source: "Post-use PP Jumbo Bags / FIBC woven fabric",
    applications: "Injection moulded products · crates & bins · pallets · extrusion profiles",
    image: "https://res.cloudinary.com/kxwxpxuv/image/upload/q_auto,f_auto/v1790284055/Granules_in_bowl_2K_20260925023703.jpg",
  },
  {
    name: "Leno Bag Grade",
    note: "Recycled PP Granules",
    source: "Post-use PP Leno bags — onion / potato mesh packaging",
    applications: "Injection moulded products · crates & bins · flower pots & planters · extrusion profiles",
    image: "https://res.cloudinary.com/kxwxpxuv/image/upload/q_auto,f_auto/v1790284260/Granules_in_bowl_2K_20260925024045.jpg",
  },
];

export const clients = [
  "G. Amphray Laboratories", "Gharda Chemicals", "Mark Elektriks", "Avery Dennison", "Bansal Industries",
  "Aradhya Industry", "Mahaveer Group", "Zen Pharma", "BASF", "Chemetall", "Saint-Gobain", "Kaizen Industries",
  "Ratnatris Pharmaceuticals", "Rockwool India", "Insecticides India Ltd", "IMERYS", "FDC Limited", "Hindustan Pencils",
  "Polycab", "Kansai Nerolac", "Pidilite", "Godrej Industries", "Blue Star", "Finolex", "Sun Pharma", "Jindal Films",
];

export const testimonials = [
  {
    company: "Gharda Chemicals",
    name: "Krishna Gade",
    position: "Sr. Manager Import Purchase",
    quote: "Working with The Trash Co. has been an absolute pleasure. Their knowledgeable team, through their expertise and dedication in navigating the complex regulation norms, helped us achieve our sustainable goals seamlessly. Their proactive approach and attention to detail have made a significant impact in reducing our liabilities. We recommend The Trash Company for exceptional Compliance Services.",
  },
  {
    company: "EXIM Client",
    name: "Vishal Sirsath",
    position: "EXIM Documentation",
    quote: "We would like to thank The Trash Co. for their good services regarding EPR certification and compliances. Since day one, the team's efforts on timely information, registration, data submission, new updates, documentation and communication are highly commendable. We wish to continue further engagement in the EPR process and are hopeful of the same level of service in future.",
  },
  {
    company: "Kaizen Industries",
    name: "Basant Kumar Laddha",
    position: "Kaizen Industries",
    quote: "The Trash Co. has provided exceptional support in assisting Kaizen Industries with EPR registration and filing work. They proved to be an invaluable partner throughout the entire process, showcasing their expertise and dedication. They meticulously guided us through the registration process, ensuring we fulfilled all necessary obligations and met the deadlines.",
  },
  {
    company: "Finance Client",
    name: "CA. Vipin Patni",
    position: "Head - Finance",
    quote: "It's been a wonderful journey with The Trash Co. for the last 1 year. The professional approach of the team in handling the compliance matters is truly appreciable. We are delighted to get our necessary compliances done from The Trash Co. and would definitely recommend further.",
  },
  {
    company: "FMCG Client",
    name: "Sumanta Das",
    position: "Segment Development Manager - LGM-FMCG-South",
    quote: "We are delighted to express our appreciation for the exceptional service provided by The Trash Co. Communication with them is seamless and effective. They listen attentively to our requirements, offer valuable insights, and maintain an open line of dialogue throughout our collaboration. Their integrity, transparency, and dedication to customer satisfaction are truly commendable.",
  },
];

export const support = [
  { title: "End-to-end EPR support", icon: FileCheck2 },
  { title: "Reliable polymer sourcing", icon: Boxes },
  { title: "Quality assurance", icon: ShieldCheck },
  { title: "Recycled packaging development", icon: PackageCheck },
];