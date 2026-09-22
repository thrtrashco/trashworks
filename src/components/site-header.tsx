import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks } from "@/lib/site-data";
import { SiteLogo } from "@/components/site-logo";

export function SiteHeader() {
  return <header className="glass-nav fixed inset-x-0 top-0 z-40 border-b border-border/70">
    <div className="site-container flex h-18 items-center justify-between">
      <SiteLogo />
      <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
        {navLinks.map((item) => <Link key={item.to} to={item.to} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>{item.label}</Link>)}
      </nav>
      <div className="hidden lg:block"><Button asChild size="lg"><Link to="/contact">Start a conversation</Link></Button></div>
      <Sheet>
        <SheetTrigger asChild><Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu"><Menu /></Button></SheetTrigger>
        <SheetContent className="flex w-[88%] flex-col bg-background">
          <SheetHeader className="text-left"><SheetTitle><SiteLogo /></SheetTitle><SheetDescription>Compliance and circularity, connected.</SheetDescription></SheetHeader>
          <nav className="mt-10 flex flex-col gap-1" aria-label="Mobile navigation">
            {navLinks.map((item) => <SheetClose key={item.to} asChild><Link to={item.to} className="border-b border-border py-4 font-display text-2xl font-bold">{item.label}</Link></SheetClose>)}
          </nav>
          <SheetClose asChild><Button asChild size="xl" className="mt-auto"><Link to="/contact">Start a conversation</Link></Button></SheetClose>
        </SheetContent>
      </Sheet>
    </div>
  </header>;
}