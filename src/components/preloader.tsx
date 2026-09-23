import { useEffect, useState } from "react";

const LOGO_URL =
  "https://res.cloudinary.com/drvug594q/image/upload/v1790112161/copy_of_logotc_qumlil.png";

const BAR_DURATION = 1800;
const HOLD_DURATION = 300;
const FADE_DURATION = 600;

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let startTime: number | null = null;
    let raf: number;

    function step(ts: number) {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const t = Math.min(elapsed / BAR_DURATION, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => setGone(true), FADE_DURATION);
        }, HOLD_DURATION);
      }
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (gone) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0f0f0f",
        transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.22,1,0.36,1)`,
        opacity: exiting ? 0 : 1,
        pointerEvents: exiting ? "none" : "all",
      }}
    >
      {/* Centre block */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
          width: "min(320px, 80vw)",
          animation: "preloader-enter 0.7s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {/* Logo */}
        <img
          src={LOGO_URL}
          alt="the trash co."
          style={{ height: "7rem", width: "auto", objectFit: "contain" }}
        />

        {/* Company name */}
        <span
          style={{
            fontFamily: "Manrope, sans-serif",
            fontSize: "clamp(2rem, 7vw, 3.25rem)",
            fontWeight: 800,
            letterSpacing: "-0.01em",
            color: "#f5f5f0",
            lineHeight: 1,
          }}
        >
          the trash co.
        </span>

        {/* Progress bar inline under the name */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {/* Track */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "2px",
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: "999px",
            }}
          >
            {/* Filled portion */}
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "oklch(0.71 0.17 138)",
                borderRadius: "999px",
                transition: "width 80ms linear",
                boxShadow: "0 0 8px oklch(0.71 0.17 138 / 0.6)",
              }}
            />
            {/* Glowing dot at the leading edge */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${progress}%`,
                transform: "translate(-50%, -50%)",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: "oklch(0.71 0.17 138)",
                boxShadow: "0 0 10px 3px oklch(0.71 0.17 138 / 0.7)",
                transition: "left 80ms linear",
              }}
            />
          </div>

          {/* Percentage label */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "rgba(255,255,255,0.3)",
                textTransform: "uppercase",
              }}
            >
              Loading
            </span>
            <span
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
                color: "oklch(0.71 0.17 138)",
              }}
            >
              {String(progress).padStart(2, "0")}%
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes preloader-enter {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
