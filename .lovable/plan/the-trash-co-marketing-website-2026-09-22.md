# the trash co. marketing website

## Overview
Build a polished, multi-page marketing site for an India-focused EPR compliance and recycled-polymers consultancy. The experience will balance premium editorial typography with a technical, circular-economy visual system: dark charcoal foundations, warm off-white content areas, fresh green accents, thin data-grid details, and subtle recycling-loop motifs.

## Site structure
- Shared sticky glass navigation with desktop links, a compact mobile menu, and a prominent contact action.
- `/` Home: typography-led introduction, trust indicators, animated impact counters, services bento preview, circular-economy story, polymer preview, testimonials, client wall, and final contact prompt.
- `/about`: mission, company positioning, five core values, impact figures, operating presence, and a team directory.
- `/services`: detailed EPR categories, supporting environmental/compliance services, and an end-to-end engagement process.
- `/recycled-polymers`: recycled-content rules table, product-grade bento grid with generated product imagery, applications, and the four-part support model.
- `/our-work`: representative outcomes and engagement examples presented as clearly labelled capabilities, without inventing unsupported client results.
- `/blog`: editorial resource hub with useful starter article cards and compliance topic categories.
- `/contact`: office locations, phone and email options, and a validated enquiry form with clear success feedback.
- Shared footer with contact details, page links, and company positioning.

## Visual and interaction system
- Establish semantic color, spacing, typography, surface, border, and shadow tokens in the global design system.
- Use a bold grotesk display face paired with a highly legible sans-serif body face, loaded through the document head.
- Create an original stacked “Transparency / Trust / Trash” composition with a circular-loop graphic and tactile waste-material photography.
- Generate a cohesive set of polymer/product images for the recycled-polymers cards.
- Add restrained scroll reveals, count-up statistics, hover-reactive bento panels, and a reduced-motion-safe client marquee.
- Use branded text treatments for the client wall rather than fabricating trademark artwork; all supplied organizations will be represented consistently.
- Make every layout mobile-first with intentional tablet and desktop compositions, stable card dimensions, and accessible tap targets.

## Content and behavior
- Include all supplied business facts, services, PCR grades, applications, statutory percentages, locations, and contact channels.
- Add five clearly attributed testimonial-style quotes, with wording presented as representative client feedback rather than unverifiable verbatim claims.
- Build the team grid with role-based profile illustrations and clearly marked placeholder names/contact details where real personnel data was not supplied.
- Validate required contact fields, email format, and phone input in the browser; submission will confirm locally because no email/database service was requested.
- Add accessible labels, keyboard states, image alt text, semantic heading structure, and route-specific metadata for search and sharing.

## Technical approach
- Keep the existing TanStack Start routing and create one route file per requested page.
- Build reusable navigation, footer, section heading, motion, counter, marquee, service-card, and form components.
- Use the existing Button and form primitives for interactive controls and Lucide icons for familiar actions.
- Store generated image assets inside the project and use responsive image sizing and lazy loading below the fold.
- Verify the finished site at mobile, tablet, and desktop widths, exercise navigation and form validation, and resolve any build or runtime errors.
