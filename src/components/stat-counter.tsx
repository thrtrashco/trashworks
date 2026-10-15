import { useEffect, useRef, useState } from "react";

export function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) { setCount(value); observer.disconnect(); return; }
      const start = performance.now();
      const run = (now: number) => {
        const progress = Math.min((now - start) / 1500, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) requestAnimationFrame(run);
      };
      requestAnimationFrame(run); observer.disconnect();
    }, { threshold: 0.3 });
    observer.observe(node); return () => observer.disconnect();
  }, [value]);
  return <div ref={ref} className="border-t border-light-border pt-5"><p className="font-display text-4xl font-bold text-foreground sm:text-5xl">{count.toLocaleString("en-IN")}{suffix}</p><p className="mt-2 max-w-40 text-sm leading-5 text-muted-foreground">{label}</p></div>;
}