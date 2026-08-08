/**
 * SectionHeading — reusable section title.
 *
 * Props:
 *  eyebrow  — small label above the title (optional)
 *  title    — main heading text
 *  subtitle — paragraph below the title (optional)
 *  center   — boolean, defaults true
 *  light    — boolean, use light text (for dark backgrounds)
 */
export default function SectionHeading({ eyebrow, title, subtitle, center = true, light = false }) {
  return (
    <div className={`mb-10 ${center ? "text-center" : ""}`}>
      {eyebrow && (
        <p className={`font-heading font-semibold text-[0.68rem] tracking-[0.22em] uppercase mb-3 ${
          light ? "text-gold-300" : "text-gold-600"
        }`}>
          {eyebrow}
        </p>
      )}

      <h2 className={`font-display font-semibold leading-[1.15] ${
        light ? "text-ivory-100" : "text-forest-900"
      }`}
        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
      >
        {title}
      </h2>

      {/* Decorative rule */}
      <div className={`flex items-center gap-3 mt-3 ${center ? "justify-center" : ""}`}>
        <span className={`h-px w-10 ${light ? "bg-gold-500/50" : "bg-gold-400/60"}`} />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 1 L9.5 6.5 L15 8 L9.5 9.5 L8 15 L6.5 9.5 L1 8 L6.5 6.5 Z"
                fill={light ? "#c9943a" : "#c9943a"} />
        </svg>
        <span className={`h-px w-10 ${light ? "bg-gold-500/50" : "bg-gold-400/60"}`} />
      </div>

      {subtitle && (
        <p className={`mt-4 max-w-2xl ${center ? "mx-auto" : ""} text-base leading-relaxed ${
          light ? "text-ivory-200/80" : "text-forest-700/80"
        }`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
