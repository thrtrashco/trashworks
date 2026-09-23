import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Award, BatteryCharging, Cpu, Disc3, Recycle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Highlighter } from "@/components/ui/highlighter";

const services = [
  {
    id: 0,
    icon: Recycle,
    title: "Plastic Packaging EPR",
    category: "EPR Compliance",
    description:
      "End-to-end compliance for rigid and flexible plastic packaging — from PIBO registration to category-wise credit fulfilment.",
    features: ["PIBO Registration", "Category-wise Reporting", "Credit Fulfilment", "Audit Documentation"],
  },
  {
    id: 1,
    icon: BatteryCharging,
    title: "Battery EPR",
    category: "EPR Compliance",
    description:
      "Producer registration and collection-target management for battery waste, backed by verified recycling certificates.",
    features: ["Producer Registration", "Collection Targets", "Recycling Certificates", "Compliance Filing"],
  },
  {
    id: 2,
    icon: Cpu,
    title: "E-Waste EPR",
    category: "EPR Compliance",
    description:
      "Authorised recycler tie-ups and traceable e-waste channelisation to meet extended producer responsibility targets.",
    features: ["Producer Registration", "Authorised Recycler Network", "E-Waste Tracking", "Annual Returns"],
  },
  {
    id: 3,
    icon: Disc3,
    title: "Tyre EPR",
    category: "EPR Compliance",
    description:
      "Structured collection and recycling pathways for end-of-life tyres, coordinated with certified processing partners.",
    features: ["Producer Registration", "Recycling Partnerships", "Retreading Coordination", "Compliance Reporting"],
  },
  {
    id: 4,
    icon: Award,
    title: "EPR Credits",
    category: "EPR Compliance",
    description:
      "Transparent credit trading and certificate verification, with real-time visibility across the CPCB portal.",
    features: ["Credit Trading", "Certificate Verification", "Portal Management", "Real-time Tracking"],
  },
];

export function ServicesShowcase() {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const startAutoRotation = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isUserInteracting) {
      intervalRef.current = setInterval(() => {
        setActiveService((prev) => (prev + 1) % services.length);
      }, 4000);
    }
  }, [isUserInteracting]);

  const handleServiceInteraction = useCallback((index: number) => {
    setActiveService(index);
    setIsUserInteracting(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsUserInteracting(false), 500);
  }, []);

  useEffect(() => {
    startAutoRotation();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startAutoRotation]);

  useEffect(() => {
    if (!isUserInteracting) startAutoRotation();
  }, [isUserInteracting, startAutoRotation]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenVisible) setHasBeenVisible(true);
      },
      { threshold: 0.1, rootMargin: "50px 0px -50px 0px" }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasBeenVisible]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const currentService = services[activeService];

  const particles = useMemo(
    () =>
      Array.from({ length: isMobile ? 8 : 15 }, (_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${3 + Math.random() * 2}s`,
        },
      })),
    [isMobile]
  );

  const servicePositions = useMemo(
    () =>
      services.map((_, index) => {
        const angle = (index / services.length) * 360;
        const radius = isMobile ? 80 : 140;
        const x = Math.cos(((angle - 90) * Math.PI) / 180) * radius;
        const y = Math.sin(((angle - 90) * Math.PI) / 180) * radius;
        return { x, y };
      }),
    [isMobile]
  );

  return (
    <section ref={sectionRef} id="services" className="section-pad relative overflow-hidden bg-dark text-dark-foreground">
      {isVisible && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <div key={particle.id} style={particle.style} className="absolute size-1 animate-pulse rounded-full bg-primary/25" />
          ))}
        </div>
      )}

      <div className="site-container relative z-10">
        <div className="mb-10 text-center sm:mb-16">
          <p
            className={cn(
              "mb-3 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-all duration-1000",
              hasBeenVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            What we do
          </p>
          <h2
            className={cn(
              "font-display text-3xl font-bold transition-all duration-1000 sm:text-4xl lg:text-5xl",
              hasBeenVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            Our{" "}
            <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView>
              Services
            </Highlighter>
          </h2>
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl px-4 text-sm leading-6 text-dark-muted transition-all delay-300 duration-1000 sm:text-base sm:leading-7",
              hasBeenVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          >
            Five compliance streams, one operating system — built to turn regulation into a clear, auditable process.
          </p>
        </div>

        <div className="flex flex-col items-center gap-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Orbital icon showcase */}
          <div className="relative w-full rounded-2xl border border-dark-foreground/15 bg-dark-foreground/[0.03] p-4 backdrop-blur-xl sm:rounded-3xl sm:p-8">
            <div className={cn("relative mx-auto", isMobile ? "h-64 w-64" : "h-80 w-80 md:h-96 md:w-96")}>
              <div className={cn("absolute inset-0", isVisible ? "animate-spin" : "")} style={{ animationDuration: "20s" }}>
                <div className="absolute inset-2 rounded-full border-2 border-primary/40 opacity-60 sm:inset-4" />
                <div className="absolute inset-6 rounded-full border border-primary/30 opacity-40 sm:inset-12" />
              </div>

              <div className="absolute inset-0">
                {services.map((service, index) => {
                  const { x, y } = servicePositions[index];
                  const Icon = service.icon;
                  const isActive = activeService === index;

                  return (
                    <div
                      key={service.id}
                      className={cn(
                        "absolute transition-all duration-500",
                        isMobile ? "size-12" : "size-14 md:size-16",
                        hasBeenVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                      )}
                      style={{
                        left: `calc(50% + ${x}px - ${isMobile ? "1.5rem" : "1.75rem"})`,
                        top: `calc(50% + ${y}px - ${isMobile ? "1.5rem" : "1.75rem"})`,
                        transitionDelay: `${index * 100}ms`,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleServiceInteraction(index)}
                        onMouseEnter={() => !isMobile && handleServiceInteraction(index)}
                        aria-label={service.title}
                        className={cn(
                          "flex size-full transform items-center justify-center rounded-lg border shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary/50 sm:rounded-xl",
                          isActive
                            ? "scale-105 border-primary bg-primary text-primary-foreground shadow-2xl ring-2 ring-primary/40 sm:ring-4"
                            : "border-dark-foreground/20 bg-dark-foreground/[0.06] text-primary hover:border-primary/60"
                        )}
                      >
                        <Icon className={isMobile ? "size-6" : "size-7 md:size-8"} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div
                className={cn(
                  "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-1000",
                  hasBeenVisible ? "scale-100 opacity-100" : "scale-75 opacity-0"
                )}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 border-primary/50 bg-dark-foreground/[0.05] shadow-2xl",
                    isMobile ? "size-20" : "size-24 md:size-32"
                  )}
                >
                  <img
                    src="https://res.cloudinary.com/drvug594q/image/upload/v1790112161/copy_of_logotc_qumlil.png"
                    alt="the trash co."
                    className={cn("object-contain", isMobile ? "size-12" : "size-14 md:size-20")}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-2 sm:mt-8">
              {services.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleServiceInteraction(index)}
                  aria-label={`Go to ${services[index].title}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50",
                    activeService === index ? "w-6 bg-primary" : "w-2 bg-dark-foreground/20 hover:bg-dark-foreground/40"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Service detail panel */}
          <div className="w-full rounded-2xl border border-dark-foreground/15 bg-dark-foreground/[0.03] p-5 backdrop-blur-xl transition-all duration-500 sm:rounded-3xl sm:p-8">
            <div className="mb-5 flex items-center gap-3 sm:mb-6 sm:gap-4">
              <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-dark-foreground/20 text-primary sm:size-12 sm:rounded-xl">
                <currentService.icon className="size-5 sm:size-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold sm:text-2xl">{currentService.title}</h3>
                <div className="text-xs font-medium text-primary sm:text-sm">{currentService.category}</div>
              </div>
            </div>

            <p className="mb-6 text-sm leading-6 text-dark-muted sm:mb-8 sm:text-base sm:leading-7">
              {currentService.description}
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {currentService.features.map((feature, index) => (
                <div
                  key={feature}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg border border-dark-foreground/15 bg-dark-foreground/[0.04] p-2.5 transition-all duration-300 sm:gap-3 sm:rounded-xl sm:p-3",
                    hasBeenVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  )}
                  style={{ transitionDelay: `${800 + index * 100}ms` }}
                >
                  <div className="size-1.5 shrink-0 rounded-full bg-primary" />
                  <span className="text-xs font-medium sm:text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
