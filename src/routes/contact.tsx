import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Recycle,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Highlighter } from "@/components/ui/highlighter";
import { submitLead } from "@/lib/submit-lead";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us | EPR Compliance Team, Goa — the trash co." },
      { name: "description", content: "Get in touch with the trash co. for EPR registration, compliance support or recycled polymer sourcing. Goa-based team serving businesses across 26 states in India." },
      { name: "keywords", content: "EPR compliance consultant contact, talk to circular economy team India, EPR consultancy Goa contact, circular economy company Goa, waste management company Goa contact, hello@thetrash.company" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Contact Us | EPR Compliance Team, Goa — the trash co." },
      { property: "og:description", content: "Get in touch for EPR registration, compliance support or recycled polymer sourcing. Goa-based, serving businesses across India." },
      { property: "og:url", content: "https://trashworks.in/contact" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Contact Us | EPR Compliance Team, Goa — the trash co." },
      { name: "twitter:description", content: "Talk to our EPR compliance team. Goa-based, serving 400+ clients across 26 states in India." },
    ],
  }),
  component: ContactPage,
});

const services = [
  "Plastic Packaging EPR",
  "Battery EPR",
  "E-Waste EPR",
  "Tyre EPR",
  "EPR Credits",
  "Recycled Polymer Sourcing",
  "Other",
];

const trustPoints = [
  { icon: Users,       label: "400+ clients",         sub: "Across India" },
  { icon: Recycle,     label: "50,000+ tons",          sub: "Waste channelised" },
  { icon: ShieldCheck, label: "Full EPR coverage",     sub: "Plastic · E-waste · Battery · Tyre" },
];

const offices = [
  {
    tag: "Goa Office",
    entity: "Trashworks Technologies Pvt. Ltd.",
    lines: ["201 Shanta Building, 18th June Road,", "Panaji, Goa 403001"],
    note: null as string | null,
    mapUrl: "https://www.google.com/maps/place/Trashworks+Technologies+Pvt+Ltd/@15.2968078,73.9552618,17z/data=!3m1!4b1!4m6!3m5!1s0x3bbfb15d138030af:0x8f9454c60a08c40c!8m2!3d15.2968078!4d73.9578367!16s%2Fg%2F11w9s9n_yx?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    tag: "Ahmedabad Office",
    entity: "The Trash Company",
    lines: ["B401, Lakeview Towers, Vastrapur,", "Ahmedabad, Gujarat 380015"],
    note: "અમદાવાદ, ગુજરાતમાં પણ અમારી ઓફિસ છે — તમારો સંપર્ક કરવા અમે આતુર છીએ.",
    mapUrl: "https://www.google.com/maps/place/The+Trash+Company/@23.0384171,72.3763663,12z/data=!4m10!1m2!2m1!1strash+co+ahehmdabad!3m6!1s0x395e84b6e4555555:0x487fbf83e51a169f!8m2!3d23.0384171!4d72.5288016!15sChJ0cmFzaCBjbyBhaG1lZGFiYWSSARh3YXN0ZV9tYW5hZ2VtZW50X3NlcnZpY2XgAQA!16s%2Fg%2F11w7fnb1jc?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D",
  },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!e.currentTarget.checkValidity()) return;
    const fd = new FormData(e.currentTarget);
    setSubmitting(true);
    setSubmitError(null);
    try {
      await submitLead({
        data: {
          name:     fd.get("name") as string,
          email:    fd.get("email") as string,
          company:  (fd.get("company") as string) ?? "",
          phone:    fd.get("phone") as string,
          countryCode: "+91",
          service:  active ?? "Other",
          message:  fd.get("message") as string,
          source:   "contact_page",
        },
      });
      setSent(true);
    } catch (err) {
      console.error("Form submission failed:", err);
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(msg);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main>
      {/* HERO */}
      <section className="relative flex min-h-[60svh] flex-col justify-end overflow-hidden bg-dark pb-12 pt-24 text-dark-foreground sm:min-h-[520px] sm:pb-20 sm:pt-32 lg:min-h-[620px]">
        <img
          src="https://res.cloudinary.com/drvug594q/image/upload/v1790118254/team_kmncpp.jpg"
          alt=""
          aria-hidden="true"
          loading="eager"
          fetchPriority="high"
          className="absolute inset-0 z-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 z-[1] bg-dark/60" />
        <div className="site-container relative z-10 pb-2">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.16em] text-primary sm:mb-7 sm:text-xs sm:tracking-[0.18em]">
            Contact
          </p>
          <h1 className="font-display text-[clamp(2.4rem,10vw,6rem)] font-extrabold leading-[0.9] tracking-normal sm:leading-[0.82]">
            Let's turn{" "}
            <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={200}>
              responsibility
            </Highlighter>
            <br className="hidden sm:block" /> into momentum.
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-dark-muted sm:mt-8 sm:text-lg sm:leading-8">
            Tell us where your compliance or materials challenge stands. Our team will help define the next practical step.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-dark-foreground/10" />
      </section>

      {/* BODY */}
      <section className="section-pad bg-light-muted">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">

            {/* ── Left panel ── */}
            <Reveal className="flex flex-col gap-6">

              {/* trust pills */}
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {trustPoints.map(({ icon: Icon, label, sub }) => (
                  <div key={label} className="flex items-start gap-3 rounded-xl border border-light-border bg-background p-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary/10">
                      <Icon className="size-4 text-primary-dark" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-foreground">{label}</p>
                      <p className="text-xs text-muted-foreground">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* contact details card */}
              <div className="rounded-xl border border-light-border bg-background p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary-dark">Reach us directly</p>
                <div className="mt-4 space-y-3">
                  <a
                    href="mailto:hello@thetrash.company"
                    className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="size-4 shrink-0 text-primary-dark" />
                    hello@thetrash.company
                  </a>
                  <a
                    href="mailto:team@thetrash.company"
                    className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="size-4 shrink-0 text-primary-dark" />
                    team@thetrash.company
                  </a>
                  <a
                    href="tel:+918459830559"
                    className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Phone className="size-4 shrink-0 text-primary-dark" />
                    +91 84598 30559
                  </a>
                </div>
                <div className="mt-5 flex gap-3 border-t border-light-border pt-5">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary-dark" />
                  <p className="text-sm leading-6 text-muted-foreground">
                    Registered offices —{" "}
                    <strong className="text-foreground">Panaji, Goa</strong> &{" "}
                    <strong className="text-foreground">Ahmedabad, Gujarat</strong>
                  </p>
                </div>
              </div>

              {/* free consultation callout */}
              <div className="rounded-xl bg-dark p-6 text-dark-foreground">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Free consultation includes</p>
                <ul className="mt-3 space-y-2">
                  {["Compliance readiness check", "Obligation mapping", "Cost & timeline estimate"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-dark-muted">
                      <span className="size-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* ── Right panel — form ── */}
            <Reveal delay={80}>
              <div className="overflow-hidden rounded-2xl border border-light-border bg-background shadow-sm">

                {/* form header */}
                <div className="border-b border-light-border bg-dark px-7 py-6 text-dark-foreground">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Start a conversation</p>
                  <h2 className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                    Tell us about{" "}
                    <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>
                      your challenge.
                    </Highlighter>
                  </h2>
                  <p className="mt-1.5 text-sm text-dark-muted">
                    We'll get back with a clear, practical next step — usually within 24 hours.
                  </p>
                </div>

                {sent ? (
                  <div className="flex flex-col items-center gap-4 px-7 py-16 text-center">
                    <CheckCircle2 className="size-14 text-primary-dark" />
                    <h3 className="font-display text-2xl font-bold">Thank you.</h3>
                    <p className="max-w-sm text-sm text-muted-foreground">
                      Your enquiry is with us. Expect a response from the team within 24 hours.
                    </p>
                    <Button variant="outline" className="mt-2" onClick={() => setSent(false)}>
                      Send another
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={submit} className="px-5 py-6 sm:px-7 sm:py-8">

                    {/* service selector — pill style */}
                    <div className="mb-6">
                      <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
                        What can we help with?
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {services.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setActive(s)}
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-150",
                              active === s
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-light-border bg-light-muted text-muted-foreground hover:border-primary/60 hover:text-foreground"
                            )}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      {/* hidden required input so form validation picks up the selection */}
                      <input type="hidden" name="service" value={active ?? ""} required />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <FloatingField label="Full name" name="name" autoComplete="name" required />
                      <FloatingField label="Contact number" name="phone" type="tel" autoComplete="tel" required />
                      <FloatingField label="Business email" name="email" type="email" autoComplete="email" required />
                      <FloatingField label="Company name" name="company" autoComplete="organization" required />
                    </div>

                    <div className="mt-4">
                      <FloatingTextarea
                        label="Describe your challenge or requirement"
                        name="message"
                        rows={5}
                        required
                      />
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4">
                      <p className="text-[11px] text-muted-foreground">
                        We don't share your data. Ever.
                      </p>
                      <Button type="submit" size="lg" className="gap-2" disabled={submitting}>
                        {submitting ? "Sending…" : <><span>Send enquiry</span> <ArrowRight className="size-4" /></>}
                      </Button>
                    </div>
                    {submitError && (
                      <p className="mt-3 rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">
                        {submitError}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TWO OFFICES — Goa & Ahmedabad (dark) */}
      <section className="relative overflow-hidden bg-dark text-dark-foreground">
        {/* decorative grid lines, same treatment as the homepage CTA */}
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-10" aria-hidden="true" />
        <div className="pointer-events-none absolute -left-10 -top-16 select-none font-display text-[18rem] font-extrabold leading-none text-dark-foreground/[0.03] sm:text-[24rem]" aria-hidden="true">
          ⌖
        </div>

        <div className="site-container relative z-10 section-pad">
          <Reveal className="mb-10 sm:mb-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Where we are</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl lg:text-5xl">
              Two offices.{" "}
              <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>
                One mission.
              </Highlighter>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-dark-muted sm:text-base sm:leading-7">
              the trash co. operates out of Goa and Ahmedabad, serving businesses across all 26 states of India.
            </p>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
            {offices.map(({ tag, entity, lines, note, mapUrl }, i) => (
              <Reveal
                key={tag}
                delay={i * 100}
                className="rounded-2xl border border-dark-foreground/15 bg-dark-foreground/[0.03] p-6 backdrop-blur-xl sm:rounded-3xl sm:p-8"
              >
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                  aria-label={`Open ${entity} on Google Maps`}
                >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-dark-foreground/20 text-primary transition-colors group-hover:border-primary/60 group-hover:bg-primary/10 sm:size-12">
                    <MapPin className="size-5" />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary sm:text-xs">{tag}</p>
                    <h3 className="font-display text-lg font-bold sm:text-xl">{entity}</h3>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-6 text-dark-muted transition-colors group-hover:text-dark-foreground sm:text-base">
                  {lines.map((line, idx) => (
                    <span key={idx}>
                      {line}
                      {idx < lines.length - 1 && <br />}
                    </span>
                  ))}
                </p>
                </a>

                {note && (
                  <p className="mt-5 border-t border-dark-foreground/15 pt-5 text-sm font-medium leading-6 text-primary">
                    {note}
                  </p>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Floating label input ── */
function FloatingField({
  label,
  name,
  type = "text",
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  const [filled, setFilled] = useState(false);
  return (
    <div className="group relative">
      <Input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        placeholder=" "
        onChange={(e) => setFilled(e.target.value.length > 0)}
        className="peer h-14 px-4 pt-5 pb-2 placeholder-transparent focus-visible:ring-primary/30"
      />
      <label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-4 text-muted-foreground transition-all duration-150",
          filled
            ? "top-2 text-[10px] font-bold uppercase tracking-[0.1em] text-primary-dark"
            : "top-1/2 -translate-y-1/2 text-sm peer-focus:top-2 peer-focus:-translate-y-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-[0.1em] peer-focus:text-primary-dark"
        )}
      >
        {label}
      </label>
    </div>
  );
}

/* ── Floating label textarea ── */
function FloatingTextarea({
  label,
  name,
  rows,
  required,
}: {
  label: string;
  name: string;
  rows?: number;
  required?: boolean;
}) {
  const [filled, setFilled] = useState(false);
  return (
    <div className="relative">
      <Textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        placeholder=" "
        onChange={(e) => setFilled(e.target.value.length > 0)}
        className="peer px-4 pt-7 pb-2 placeholder-transparent focus-visible:ring-primary/30"
      />
      <label
        htmlFor={name}
        className={cn(
          "pointer-events-none absolute left-4 text-muted-foreground transition-all duration-150",
          filled
            ? "top-2 text-[10px] font-bold uppercase tracking-[0.1em] text-primary-dark"
            : "top-4 text-sm peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-bold peer-focus:uppercase peer-focus:tracking-[0.1em] peer-focus:text-primary-dark"
        )}
      >
        {label}
      </label>
    </div>
  );
}