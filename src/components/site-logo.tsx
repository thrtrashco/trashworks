import { Link } from "@tanstack/react-router";

export function SiteLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className="group inline-flex items-center gap-2.5" aria-label="the trash co. home">
      <span className="relative grid size-8 place-items-center rounded-full border border-current">
        <span className="absolute size-2 rounded-full bg-primary transition-transform group-hover:translate-x-1" />
        <span className="size-5 rounded-full border border-current border-l-transparent" />
      </span>
      <span className={`font-display text-xl font-bold lowercase ${inverse ? "text-dark-foreground" : "text-foreground"}`}>the trash co.</span>
    </Link>
  );
}