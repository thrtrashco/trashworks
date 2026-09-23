import { useCallback } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { navLinks } from "@/lib/site-data";
import { SiteLogo } from "@/components/site-logo";

export function SiteFooter() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleServicesClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const scrollToSection = () => {
        const el = document.getElementById("services");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      };
      if (location.pathname === "/") {
        scrollToSection();
      } else {
        navigate({ to: "/" }).then(() => {
          setTimeout(scrollToSection, 100);
        });
      }
    },
    [location.pathname, navigate]
  );

  return (
    <footer className="relative overflow-hidden bg-dark text-dark-foreground">
      {/* Decorative background glyph */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-10 select-none font-display text-[18rem] font-extrabold leading-none text-dark-foreground/[0.03] sm:text-[24rem]"
        aria-hidden="true"
      >
        ↻
      </div>

      {/* Top accent bar */}
      <div className="border-b border-dark-foreground/10">
        <div className="site-container flex items-center justify-between py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            the trash co. · enabling circular economy across india
          </p>
          <a
            href="https://trashworks.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1 text-xs text-dark-muted transition-colors hover:text-dark-foreground sm:inline-flex"
          >
            trashworks.in <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>

      {/* Main grid */}
      <div className="site-container relative z-10 grid gap-10 py-14 sm:gap-12 md:grid-cols-[1.6fr_0.8fr_1.4fr] md:py-16 lg:gap-16">

        {/* ── Col 1: Brand ── */}
        <div className="flex flex-col gap-6">
          <SiteLogo inverse />
          <p className="max-w-xs text-sm leading-7 text-dark-muted">
            We work around Transparency, Trust &amp; Trash — enabling a
            tech-powered circular economy across India.
          </p>
          {/* Quick contact pills */}
          <div className="flex flex-col gap-2.5">
            <a
              href="mailto:hello@thetrash.company"
              className="group inline-flex items-center gap-2.5 text-sm text-dark-muted transition-colors hover:text-dark-foreground"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-dark-foreground/20 transition-colors group-hover:border-primary group-hover:bg-primary/10">
                <Mail className="size-3.5 text-primary" />
              </span>
              hello@thetrash.company
            </a>
            <a
              href="tel:+918459830559"
              className="group inline-flex items-center gap-2.5 text-sm text-dark-muted transition-colors hover:text-dark-foreground"
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full border border-dark-foreground/20 transition-colors group-hover:border-primary group-hover:bg-primary/10">
                <Phone className="size-3.5 text-primary" />
              </span>
              +91 82750 73790
            </a>
          </div>
        </div>

        {/* ── Col 2: Navigation ── */}
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            Navigate
          </p>
          <nav className="flex flex-col gap-3" aria-label="Footer navigation">
            {navLinks.map((item) =>
              item.label === "Services" ? (
                <a
                  key={item.to}
                  href="#services"
                  onClick={handleServicesClick}
                  className="group flex items-center gap-2 cursor-pointer text-sm text-dark-muted transition-colors hover:text-dark-foreground"
                >
                  <span className="h-px w-3 bg-dark-foreground/20 transition-all duration-300 group-hover:w-5 group-hover:bg-primary" />
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group flex items-center gap-2 text-sm text-dark-muted transition-colors hover:text-dark-foreground"
                  activeProps={{ className: "text-dark-foreground" }}
                >
                  <span className="h-px w-3 bg-dark-foreground/20 transition-all duration-300 group-hover:w-5 group-hover:bg-primary" />
                  {item.label}
                </Link>
              )
            )}
          </nav>
        </div>

        {/* ── Col 3: Contact Details ── */}
        <div>
          <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
            Contact Details
          </p>
          <div className="flex flex-col gap-5">

            {/* Office 1 */}
            <a
              href="https://www.google.com/maps/place/Trashworks+Technologies+Pvt+Ltd/@15.2968078,73.9552618,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbfb15d138030af:0x8f9454c60a08c40c!8m2!3d15.2968078!4d73.9578367!16s%2Fg%2F11w9s9n_yx?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-3"
              aria-label="Trashworks Technologies — open in Google Maps"
            >
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-dark-foreground/20 transition-colors group-hover:border-primary/60 group-hover:bg-primary/10">
                <MapPin className="size-3.5 text-primary" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-dark-foreground transition-colors group-hover:text-primary">
                  Trashworks Technologies Pvt. Ltd.
                </p>
                <p className="mt-1 text-xs leading-5 text-dark-muted transition-colors group-hover:text-dark-foreground">
                  201 Shanta Building, 18th June Road,<br />
                  Panaji, Goa 403001
                </p>
              </div>
            </a>

            {/* Divider */}
            <div className="h-px bg-dark-foreground/10" />

            {/* Office 2 */}
            <a
              href="https://www.google.com/maps/place/The+Trash+Company/@23.0384171,72.3763663,12z/data=!4m10!1m2!2m1!1strash+co+ahehmdabad!3m6!1s0x395e84b6e4555555:0x487fbf83e51a169f!8m2!3d23.0384171!4d72.5288016!15sChJ0cmFzaCBjbyBhaG1lZGFiYWSSARh3YXN0ZV9tYW5hZ2VtZW50X3NlcnZpY2XgAQA!16s%2Fg%2F11w7fnb1jc?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-3"
              aria-label="The Trash Company Ahmedabad — open in Google Maps"
            >
              <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full border border-dark-foreground/20 transition-colors group-hover:border-primary/60 group-hover:bg-primary/10">
                <MapPin className="size-3.5 text-primary" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-dark-foreground transition-colors group-hover:text-primary">
                  The Trash Company
                </p>
                <p className="mt-1 text-xs leading-5 text-dark-muted transition-colors group-hover:text-dark-foreground">
                  B401, Lakeview Towers, Vastrapur,<br />
                  Ahmedabad, Gujarat 380015
                </p>
              </div>
            </a>

            {/* Divider */}
            <div className="h-px bg-dark-foreground/10" />

            {/* Phone + Email row */}
            <div className="flex flex-wrap gap-4">
              <a
                href="tel:+918275073790"
                className="inline-flex items-center gap-1.5 text-xs text-dark-muted transition-colors hover:text-primary"
              >
                <Phone className="size-3.5 text-primary" />
                +91 82750 73790
              </a>
              <a
                href="mailto:hello@thetrash.company"
                className="inline-flex items-center gap-1.5 text-xs text-dark-muted transition-colors hover:text-primary"
              >
                <Mail className="size-3.5 text-primary" />
                hello@thetrash.company
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-dark-foreground/10">
        <div className="site-container flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-dark-muted">
            © 2026 the trash co. All rights reserved.
          </p>
          <a
            href="https://trashworks.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-dark-muted transition-colors hover:text-dark-foreground"
          >
            trashworks.in <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}
