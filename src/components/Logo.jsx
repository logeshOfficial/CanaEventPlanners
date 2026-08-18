import { BUSINESS_NAME, BUSINESS_SUBTITLE } from "../config";
import logoSvg from "../assets/logo.svg";
import logoIconSvg from "../assets/logo-icon.svg";

export default function Logo({ variant = "nav", className = "" }) {
  if (variant === "full") {
    return (
      <img
        src={logoSvg}
        alt={`${BUSINESS_NAME} — ${BUSINESS_SUBTITLE}`}
        className={className || "w-48"}
        draggable={false}
      />
    );
  }

  if (variant === "icon") {
    return (
      <img
        src={logoIconSvg}
        alt={`${BUSINESS_NAME} icon`}
        className={className || "w-10 h-10"}
        draggable={false}
      />
    );
  }

  // variant === "nav" — icon + stacked text
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <img
        src={logoIconSvg}
        alt=""
        aria-hidden="true"
        className="w-16 h-16 shrink-0"
        draggable={false}
      />
      <span className="flex flex-col leading-tight">
        <span
          className="font-heading font-bold tracking-widest text-gold-400 uppercase"
          style={{ fontSize: "0.95rem", letterSpacing: "0.12em" }}
        >
          {BUSINESS_NAME}
        </span>
        <span
          className="font-heading font-light tracking-[0.2em] text-gold-500/70 uppercase"
          style={{ fontSize: "0.62rem" }}
        >
          {BUSINESS_SUBTITLE}
        </span>
      </span>
    </span>
  );
}
