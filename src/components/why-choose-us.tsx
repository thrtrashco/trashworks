import { Check } from "lucide-react";
import { Highlighter } from "@/components/ui/highlighter";

const features = [
  {
    label: "Our Mission",
    title: "Building a tech-driven Circular Economy",
    description:
      "We believe in harnessing the power of innovation while forging a path towards sustainability — integrating cutting-edge technology and visionary strategies to transform waste into opportunity and pave the path to a balanced future.",
  },
  {
    label: "Our Vision",
    title: "Building an impactful organisation for a circular economy",
    description:
      "Driven by a simple yet powerful vision, we believe in a world where resources are valued, reused and recycled — creating sustainable solutions for generations to come.",
  },
  {
    label: "The Growth Graph",
    title: "From 2 clients to 400+, built on trust",
    description:
      "We began operations in October 2020 with minimal investment, starting with 2 clients for EPR consultation. More than 50% of our clients now come through referrals — a testament to our transparency and customer satisfaction.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="section-pad bg-background text-foreground">
      <div className="site-container">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left side - Image */}
          <div className="relative order-2 w-full lg:order-1">
            <div className="overflow-hidden rounded-none sm:rounded-xl">
              <div className="relative aspect-[16/9] w-full min-h-[180px] sm:aspect-[4/3] sm:min-h-[240px] md:aspect-[3/2] md:min-h-[320px]">
                <img
                  src="https://res.cloudinary.com/drvug594q/image/upload/v1790115448/team_qkkezd.jpg"
                  alt="the trash co. team collaborating on circular economy solutions"
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="order-1 space-y-4 lg:order-2">
            <header>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
                Who we are
              </p>
              <h2 className="font-display text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
                Why{" "}
                <Highlighter action="underline" color="oklch(0.71 0.17 138)" strokeWidth={2.5} animationDuration={800} isView drawDelay={900}>
                  choose the trash co.
                </Highlighter>
              </h2>
            </header>

            <ul className="space-y-5 pt-2 sm:space-y-6" role="list">
              {features.map((feature) => (
                <li key={feature.label} className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-1 shrink-0" aria-hidden="true">
                    <div className="grid size-6 place-items-center rounded-full bg-primary">
                      <Check className="size-4 stroke-[2.5] text-primary-foreground" />
                    </div>
                  </div>
                  <div className="flex-1 space-y-1 sm:space-y-1.5">
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground sm:text-xs">
                      {feature.label}
                    </p>
                    <h3 className="font-display text-base font-semibold sm:text-xl md:text-2xl">
                      {feature.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                      {feature.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
