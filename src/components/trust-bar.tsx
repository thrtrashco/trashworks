import { useEffect, useRef } from "react";

const SPEED = 60; // px per second

const logos = [
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111178/1_o0fxig.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111179/6c_t7rsbx.webp",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111178/2c_wogxkc.png",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111179/3_d4wfhb.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111179/4c_ms7dox.webp",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111187/7_y46nkk.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111187/8_pj8vly.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111188/10_vzn2w2.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111188/9_d0lpnz.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111189/11_tabpng.webp",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111192/12_bh91oo.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111192/13_kqj80l.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111192/14_eowkyc.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111192/15_fdnhtt.png",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111193/17_jpwsco.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111195/18_tq9t7c.jpg",
  "https://res.cloudinary.com/drvug594q/image/upload/v1790111195/19_sggahr.png",
];

export function TrustBar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const posRef   = useRef(0);

  function startLoop() {
    const track = trackRef.current;
    if (!track) return;
    let lastTime = performance.now();

    function step(now: number) {
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      const halfW = track!.scrollWidth / 2;
      posRef.current += SPEED * dt;
      if (posRef.current >= halfW) posRef.current -= halfW;
      track!.style.transform = `translateX(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
  }

  function stopLoop() {
    cancelAnimationFrame(rafRef.current);
  }

  useEffect(() => {
    startLoop();
    return stopLoop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logoList = (
    <ul className="flex shrink-0 items-center gap-6 sm:gap-10" aria-hidden="true">
      {logos.map((src, i) => (
        <li key={i} className="shrink-0">
          <img
            src={src}
            alt=""
            loading="lazy"
            className="h-10 w-auto max-w-[120px] object-contain opacity-90 transition-opacity duration-300 hover:opacity-100 sm:h-12 sm:max-w-[140px]"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="overflow-hidden border-y border-light-border bg-light-muted">
      {/* Mobile label — visible only below sm */}
      <div className="flex flex-col gap-0.5 border-b border-light-border px-4 py-3 sm:hidden">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-dark">Our Network</span>
        <span className="text-xs text-muted-foreground">Trusted by leading enterprises</span>
      </div>

      <div className="flex min-h-[80px] items-stretch sm:min-h-[90px]">

        {/* Left label */}
        <div className="relative z-10 hidden shrink-0 flex-col justify-center gap-1.5 border-r border-light-border bg-light-muted px-14 sm:flex sm:px-24">
          <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-dark sm:text-sm">
            Our Network
          </span>
          <span className="max-w-[160px] text-sm font-medium leading-snug text-muted-foreground sm:text-base">
            Trusted by leading enterprises
          </span>
        </div>

        {/* Scroll track */}
        <div
          className="relative flex flex-1 items-center overflow-hidden px-4 py-4"
          onMouseEnter={stopLoop}
          onMouseLeave={startLoop}
          onFocus={stopLoop}
          onBlur={startLoop}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-light-muted to-transparent sm:w-20" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-light-muted to-transparent sm:w-20" aria-hidden="true" />

          {/* Track — duplicated for seamless loop */}
          <div ref={trackRef} className="flex gap-6 will-change-transform sm:gap-10">
            {logoList}
            {logoList}
          </div>
        </div>

      </div>
    </section>
  );
}
