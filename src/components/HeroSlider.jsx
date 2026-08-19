import { useState, useEffect, useCallback } from "react";
import { HERO_SLIDES, HERO_SLIDE_INTERVAL } from "../config";
import logoIconSvg from "../assets/logo-icon.svg";

/**
 * HeroSlider
 *   Slide 0   = branded theme-colour panel (logo + headline only, no divider/para/buttons)
 *   Slides 1+ = HERO_SLIDES event photos, object-cover, no cropping
 */
export default function HeroSlider() {
  const total = HERO_SLIDES.length + 1; // +1 for branded slide
  const [current,   setCurrent]   = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 500);
  }, [animating]);

  const next = useCallback(() => goTo((current + 1) % total), [current, total, goTo]);
  const prev = useCallback(() => goTo((current - 1 + total) % total), [current, total, goTo]);

  useEffect(() => {
    const timer = setInterval(next, HERO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full h-full overflow-hidden" aria-label="Hero carousel">

      {/* ── Slide 0 — Branded panel ─────────────────────────── */}
      <div
        className="absolute inset-0 transition-opacity duration-700 flex flex-col items-center justify-center px-6"
        style={{
          opacity:    current === 0 && !animating ? 1 : 0,
          zIndex:     current === 0 ? 1 : 0,
          background: "linear-gradient(160deg, #0a2d20 0%, #0d3b2a 50%, #0a2d20 100%)",
        }}
        aria-hidden={current !== 0}
      >
        {/* Gold radial glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,148,58,0.10) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        {/* Logo */}
        <img
          src={logoIconSvg}
          alt="Cana Dream Events"
          className="relative z-10 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 drop-shadow-2xl mb-5 shimmer"
          draggable={false}
        />
        {/* Headline only */}
        <h1 className="relative z-10 text-center leading-tight">
          <span
            className="block font-display font-bold text-ivory-50"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.4rem)" }}
          >
            Crafting Moments
          </span>
          <span
            className="block italic"
            style={{
              fontFamily:    "'Allura', 'Great Vibes', cursive",
              fontSize:      "clamp(1.5rem, 3vw, 2.6rem)",
              color:         "#e8b048",
              textShadow:    "0 2px 20px rgba(232,176,72,0.55)",
              letterSpacing: "0.05em",
            }}
          >
            &amp; Creating Memories
          </span>
        </h1>
      </div>

      {/* ── Slides 1+ — Event photos ────────────────────────── */}
      {HERO_SLIDES.map((slide, i) => {
        const idx = i + 1;
        return (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: current === idx && !animating ? 1 : 0, zIndex: current === idx ? 1 : 0 }}
            aria-hidden={current !== idx}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* gradient + title bottom-left */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-5 z-10">
              <p className="font-display text-sm sm:text-base text-ivory-50 font-semibold drop-shadow leading-tight">
                {slide.alt}
              </p>
            </div>
          </div>
        );
      })}

      {/* ── Dot indicators ──────────────────────────────────── */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-gold-400" : "w-2 h-2 bg-ivory-200/40 hover:bg-ivory-200/70"
            }`}
          />
        ))}
      </div>

      {/* ── Arrows ──────────────────────────────────────────── */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-forest-950/50 hover:bg-gold-500 text-ivory-100 hover:text-forest-950 flex items-center justify-center transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-forest-950/50 hover:bg-gold-500 text-ivory-100 hover:text-forest-950 flex items-center justify-center transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
