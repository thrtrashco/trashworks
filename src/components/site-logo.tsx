import { Link } from "@tanstack/react-router";

const LOGO_URL = "https://res.cloudinary.com/drvug594q/image/upload/v1790112161/copy_of_logotc_qumlil.png";

export function SiteLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className="inline-flex items-center gap-2.5" aria-label="the trash co. home">
      <img
        src={LOGO_URL}
        alt="the trash co. logo"
        className="h-8 w-auto object-contain sm:h-9"
      />
      <span className={`font-display text-xl font-bold lowercase ${inverse ? "text-dark-foreground" : "text-foreground"}`}>
        the trash co.
      </span>
    </Link>
  );
}
