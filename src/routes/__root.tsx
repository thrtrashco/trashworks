import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // no-op — error telemetry removed
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "the trash co. | EPR Compliance & Circular Economy Partner, Goa" },
      { name: "description", content: "Goa-based EPR compliance and circular economy company serving businesses across India. Plastic, battery, e-waste & tyre EPR — 400+ clients, 26 states." },
      { name: "author", content: "the trash co." },
      { name: "keywords", content: "EPR compliance India, extended producer responsibility, circular economy company India, plastic waste management, EPR credits, EPR compliance company Goa, circular economy company Goa, waste management company Goa, recycled polymers supplier Goa, CPCB EPR portal, PIBO compliance" },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#1a1a1a" },
      /* Open Graph */
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "the trash co." },
      { property: "og:locale", content: "en_IN" },
      { property: "og:image", content: "https://res.cloudinary.com/drvug594q/image/upload/v1790112161/copy_of_logotc_qumlil.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "the trash co. — EPR Compliance & Circular Economy" },
      /* Twitter */
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@thetrashco" },
      { name: "twitter:image", content: "https://res.cloudinary.com/drvug594q/image/upload/v1790112161/copy_of_logotc_qumlil.png" },
      /* Geo / Local */
      { name: "geo.region", content: "IN-GA" },
      { name: "geo.placename", content: "Panaji, Goa, India" },
      { name: "geo.position", content: "15.4909;73.8278" },
      { name: "ICBM", content: "15.4909, 73.8278" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" },
      { rel: "icon", href: "https://res.cloudinary.com/drvug594q/image/upload/v1790112161/copy_of_logotc_qumlil.png", type: "image/png" },
      { rel: "canonical", href: "https://thetrash.company" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://thetrash.company/#organization",
              "name": "the trash co.",
              "legalName": "Trashworks Technologies Private Limited",
              "url": "https://thetrash.company",
              "logo": "https://res.cloudinary.com/drvug594q/image/upload/v1790112161/copy_of_logotc_qumlil.png",
              "foundingDate": "2020",
              "description": "Tech-enabled EPR compliance, plastic waste channelisation and recycled PCR polymers for Indian businesses.",
              "email": "hello@thetrash.company",
              "telephone": "+91-8275073790",
              "areaServed": { "@type": "Country", "name": "India" },
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "201 Shanta Building, 18th June Road",
                  "addressLocality": "Panaji",
                  "addressRegion": "Goa",
                  "postalCode": "403001",
                  "addressCountry": "IN"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "B401, Lakeview Towers, Vastrapur",
                  "addressLocality": "Ahmedabad",
                  "addressRegion": "Gujarat",
                  "postalCode": "380015",
                  "addressCountry": "IN"
                }
              ],
              "sameAs": ["https://thetrash.co.in"]
            },
            {
              "@type": "LocalBusiness",
              "@id": "https://thetrash.company/#localbusiness",
              "name": "the trash co.",
              "image": "https://res.cloudinary.com/drvug594q/image/upload/v1790112161/copy_of_logotc_qumlil.png",
              "url": "https://thetrash.company",
              "telephone": "+91-8275073790",
              "email": "hello@thetrash.company",
              "priceRange": "₹₹",
              "currenciesAccepted": "INR",
              "openingHours": "Mo-Fr 09:00-18:00",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "201 Shanta Building, 18th June Road",
                "addressLocality": "Panaji",
                "addressRegion": "Goa",
                "postalCode": "403001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 15.4909,
                "longitude": 73.8278
              },
              "hasMap": "https://maps.google.com/?q=Panaji,Goa,India"
            }
          ]
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen overflow-x-clip">
        <SiteHeader />
        <Outlet />
        <SiteFooter />
      </div>
    </QueryClientProvider>
  );
}
