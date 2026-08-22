import useScrollReveal from "../hooks/useScrollReveal";

/**
 * Reveal — wraps any content and animates it in when it enters the viewport.
 *
 * Props:
 *   direction  — "up" | "left" | "right" | "none"  (default "up")
 *   delay      — CSS delay string e.g. "0ms", "150ms", "300ms"  (default "0ms")
 *   className  — extra classes for the wrapper div
 *   threshold  — 0–1 intersection threshold  (default 0.12)
 */
export default function Reveal({
  children,
  direction  = "up",
  delay      = "0ms",
  className  = "",
  threshold  = 0.12,
}) {
  const [ref, visible] = useScrollReveal(threshold);

  const directionMap = {
    up:    "reveal-up",
    left:  "reveal-left",
    right: "reveal-right",
    none:  "reveal-fade",
  };

  const animClass = directionMap[direction] ?? "reveal-up";

  return (
    <div
      ref={ref}
      className={`${animClass} ${visible ? "revealed" : ""} ${className}`}
      style={{ transitionDelay: delay }}
    >
      {children}
    </div>
  );
}
