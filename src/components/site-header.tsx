import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/site-data";
import { SiteLogo } from "@/components/site-logo";
import { CtaModal } from "@/components/cta-modal";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleServicesClick = useCallback((e: React.MouseEvent) => {
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
  }, [location.pathname, navigate]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 flex justify-center transition-all duration-500 ease-out",
          isScrolled ? "pt-3" : "pt-0"
        )}
      >
        <div
          className={cn(
            "glass-nav flex h-18 items-center justify-between transition-all duration-500 ease-out",
            isScrolled
              ? "w-[92%] max-w-5xl rounded-full border border-border/70 px-4 shadow-lg lg:w-[80%]"
              : "site-container w-full rounded-none border-b border-border/70 px-4"
          )}
        >
          <SiteLogo />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navLinks.map((item) =>
              item.label === "Services" ? (
                <a
                  key={item.to}
                  href="#services"
                  onClick={handleServicesClick}
                  className="group relative cursor-pointer text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-foreground after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-[1.5px] after:w-0 after:bg-foreground after:transition-all after:duration-300 after:ease-out hover:after:w-full"
                  activeProps={{ className: "text-foreground after:w-full" }}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button size="lg" onClick={() => setModalOpen(true)}>Get Started</Button>
          </div>

          {/* Mobile: Get Started + Hamburger */}
          <div className="flex items-center gap-1 lg:hidden">
            <Button size="sm" onClick={() => setModalOpen(true)}>
              Get Started
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="flex w-[88%] flex-col bg-background">
                <SheetHeader className="text-left">
                  <SheetTitle><SiteLogo /></SheetTitle>
                  <SheetDescription>Compliance and circularity, connected.</SheetDescription>
                </SheetHeader>
                <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile navigation">
                  {navLinks.map((item) =>
                    item.label === "Services" ? (
                      <SheetClose key={item.to} asChild>
                        <a
                          href="#services"
                          onClick={handleServicesClick}
                          className="cursor-pointer border-b border-border py-4 font-display text-2xl font-bold"
                        >
                          {item.label}
                        </a>
                      </SheetClose>
                    ) : (
                      <SheetClose key={item.to} asChild>
                        <Link
                          to={item.to}
                          className="border-b border-border py-4 font-display text-2xl font-bold"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                    )
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <CtaModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
