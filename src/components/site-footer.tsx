import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { navLinks } from "@/lib/site-data";
import { SiteLogo } from "@/components/site-logo";

export function SiteFooter() {
  return <footer className="bg-dark text-dark-foreground">
    <div className="site-container grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
      <div><SiteLogo inverse /><p className="mt-5 max-w-sm text-sm leading-6 text-dark-muted">We work around Transparency, Trust & Trash — enabling a tech-powered circular economy across India.</p></div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">Navigate</p><div className="grid grid-cols-2 gap-3">{navLinks.map((item) => <Link key={item.to} to={item.to} className="text-sm text-dark-muted hover:text-dark-foreground">{item.label}</Link>)}</div></div>
      <div><p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary">Connect</p><a href="mailto:hello@thetrash.company" className="mb-3 flex items-center gap-2 text-sm text-dark-muted hover:text-dark-foreground"><Mail className="size-4" />hello@thetrash.company</a><a href="tel:+918275073790" className="flex items-center gap-2 text-sm text-dark-muted hover:text-dark-foreground"><Phone className="size-4" />+91 82750 73790</a></div>
    </div>
    <div className="border-t border-dark-foreground/10"><div className="site-container flex flex-col gap-3 py-5 text-xs text-dark-muted sm:flex-row sm:items-center sm:justify-between"><p>© 2026 the trash co. All rights reserved.</p><a href="https://thetrash.co.in" className="inline-flex items-center gap-1">thetrash.co.in <ArrowUpRight className="size-3" /></a></div></div>
  </footer>;
}