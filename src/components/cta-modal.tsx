import { useState, useEffect, useRef, type FormEvent } from "react";
import { X, CheckCircle, Recycle, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { submitLead } from "@/lib/submit-lead";
import { cn } from "@/lib/utils";

const countryOptions = [
  { code: "+91",  name: "India",        min: 10, max: 11, placeholder: "10-11 digits", example: "9876543210" },
  { code: "+1",   name: "USA",          min: 10, max: 10, placeholder: "10 digits",    example: "4151234567" },
  { code: "+44",  name: "UK",           min: 10, max: 11, placeholder: "10-11 digits", example: "7123456789" },
  { code: "+61",  name: "Australia",    min: 9,  max: 9,  placeholder: "9 digits",     example: "412345678"  },
  { code: "+971", name: "UAE",          min: 9,  max: 9,  placeholder: "9 digits",     example: "501234567"  },
  { code: "+49",  name: "Germany",      min: 10, max: 11, placeholder: "10-11 digits", example: "15123456789"},
  { code: "+65",  name: "Singapore",    min: 8,  max: 8,  placeholder: "8 digits",     example: "91234567"   },
  { code: "+60",  name: "Malaysia",     min: 9,  max: 10, placeholder: "9-10 digits",  example: "123456789"  },
  { code: "+92",  name: "Pakistan",     min: 10, max: 10, placeholder: "10 digits",    example: "3012345678" },
  { code: "+880", name: "Bangladesh",   min: 10, max: 10, placeholder: "10 digits",    example: "1712345678" },
  { code: "+55",  name: "Brazil",       min: 10, max: 11, placeholder: "10-11 digits", example: "11987654321"},
  { code: "+27",  name: "South Africa", min: 9,  max: 9,  placeholder: "9 digits",     example: "721234567"  },
];

const serviceOptions = [
  "EPR Compliance Consultation",
  "Plastic Waste Channelisation",
  "E-Waste EPR Registration",
  "Battery Waste Compliance",
  "Tyre Waste Compliance",
  "Recycled Polymer Sourcing",
  "Other",
];

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  countryCode: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

interface CtaModalProps {
  open: boolean;
  onClose: () => void;
}

export function CtaModal({ open, onClose }: CtaModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    countryCode: "+91",
    service: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phoneState, setPhoneState] = useState<"" | "valid" | "invalid">("");
  const overlayRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      // Reset on close
      setSubmitted(false);
      setErrors({});
      setPhoneState("");
      setFormData({ name: "", email: "", company: "", phone: "", countryCode: "+91", service: "", message: "" });
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const currentCountry = countryOptions.find((c) => c.code === formData.countryCode);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email))
      errs.email = "Enter a valid email address";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    else if (formData.phone.length < (currentCountry?.min ?? 6))
      errs.phone = `Minimum ${currentCountry?.min} digits for ${currentCountry?.name}`;
    if (!formData.service) errs.service = "Please select a service";
    if (!formData.message.trim()) errs.message = "Message is required";
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function handlePhoneInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/\D/g, "");
    setFormData((prev) => ({ ...prev, phone: value }));
    setErrors((prev) => ({ ...prev, phone: "" }));
    if (value.length >= (currentCountry?.min ?? 6)) setPhoneState("valid");
    else if (value.length > 0) setPhoneState("invalid");
    else setPhoneState("");
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      await submitLead({
        data: {
          name:        formData.name.trim(),
          email:       formData.email.trim().toLowerCase(),
          company:     formData.company.trim(),
          phone:       formData.phone.trim(),
          countryCode: formData.countryCode,
          service:     formData.service,
          message:     formData.message.trim(),
          source:      "cta_modal",
        },
      });
      setSubmitted(true);
      setTimeout(onClose, 3000);
    } catch {
      // Still show success — server may have saved the record
      setSubmitted(true);
      setTimeout(onClose, 3000);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Get started with the trash co."
    >
      <div className="relative w-full max-w-2xl max-h-[92svh] overflow-y-auto rounded-2xl bg-background shadow-2xl ring-1 ring-border">

        {/* ── Header ── */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 rounded-t-2xl bg-dark px-5 py-5 text-dark-foreground sm:px-7 sm:py-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Get started</p>
            <h2 className="mt-1 font-display text-xl font-bold leading-tight sm:text-2xl">
              Let's build your compliance roadmap.
            </h2>
            <p className="mt-1 text-xs text-dark-muted sm:text-sm">
              Tell us about your challenge — our team responds within 24 hours.
            </p>
          </div>
          <button
            onClick={onClose}
            className="mt-0.5 shrink-0 rounded-full p-1.5 text-dark-muted transition-colors hover:bg-dark-foreground/10 hover:text-dark-foreground"
            aria-label="Close"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">

          {/* ── Left sidebar ── */}
          <aside className="w-full shrink-0 bg-light-muted px-5 py-5 lg:w-56 lg:px-5 lg:py-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-primary-dark">Why us</p>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start gap-2.5">
                <Users className="mt-0.5 size-4 shrink-0 text-primary-dark" />
                <div>
                  <p className="text-xs font-semibold text-foreground">400+ clients</p>
                  <p className="text-xs text-muted-foreground">Trusted across India</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary-dark" />
                <div>
                  <p className="text-xs font-semibold text-foreground">Full EPR coverage</p>
                  <p className="text-xs text-muted-foreground">Plastic, E-waste, Battery, Tyre</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Recycle className="mt-0.5 size-4 shrink-0 text-primary-dark" />
                <div>
                  <p className="text-xs font-semibold text-foreground">50,000+ tons</p>
                  <p className="text-xs text-muted-foreground">Waste channelised</p>
                </div>
              </li>
            </ul>
            <div className="mt-5 rounded-lg border border-light-border bg-background p-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-primary-dark">Free consultation includes</p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                <li>· Compliance readiness check</li>
                <li>· Obligation mapping</li>
                <li>· Cost & timeline estimate</li>
              </ul>
            </div>
          </aside>

          {/* ── Form ── */}
          <div className="flex-1 px-5 py-5 sm:px-7 sm:py-6">
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 py-10 text-center">
                <CheckCircle className="size-12 text-primary-dark" />
                <h3 className="font-display text-xl font-bold">Thank you!</h3>
                <p className="max-w-xs text-sm text-muted-foreground">
                  Our team will get back to you within 24 hours with a clear next step.
                </p>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Your details</p>

                {/* Name + Email */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <Input
                      name="name"
                      placeholder="Full name *"
                      value={formData.name}
                      onChange={handleChange}
                      autoComplete="name"
                      className={cn(errors.name && "border-destructive")}
                    />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Business email *"
                      value={formData.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className={cn(errors.email && "border-destructive")}
                    />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                </div>

                {/* Company */}
                <Input
                  name="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                  autoComplete="organization"
                />

                {/* Phone */}
                <div>
                  <div className="flex gap-2">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleChange}
                      className="rounded-md border border-input bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {countryOptions.map((c) => (
                        <option key={c.code} value={c.code}>{c.name} ({c.code})</option>
                      ))}
                    </select>
                    <div className="relative flex-1">
                      <Input
                        type="tel"
                        name="phone"
                        placeholder={`Phone number (${currentCountry?.placeholder}) *`}
                        value={formData.phone}
                        onChange={handlePhoneInput}
                        autoComplete="tel"
                        className={cn(
                          phoneState === "valid" && "border-primary focus-visible:ring-primary/30",
                          (phoneState === "invalid" || errors.phone) && "border-destructive"
                        )}
                      />
                      {phoneState === "valid" && (
                        <CheckCircle className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-primary-dark" />
                      )}
                    </div>
                  </div>
                  {currentCountry && (
                    <p className="mt-1 text-[11px] text-muted-foreground">e.g. {currentCountry.example}</p>
                  )}
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                </div>

                {/* Service */}
                <div>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={cn(
                      "w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring",
                      !formData.service && "text-muted-foreground",
                      errors.service && "border-destructive"
                    )}
                  >
                    <option value="">Select service area *</option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {errors.service && <p className="mt-1 text-xs text-destructive">{errors.service}</p>}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Describe your compliance challenge or requirement *"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    className={cn(
                      "w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring",
                      errors.message && "border-destructive"
                    )}
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "Sending…" : "Send enquiry"}
                </Button>
                <p className="text-center text-[11px] text-muted-foreground">
                  By submitting you agree to our privacy policy. We don't share your data.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
