import { useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IMAGES } from "../config";

// Derive filter categories from gallery data
const ALL_CATEGORIES = ["All", ...Array.from(new Set(IMAGES.gallery.map((i) => i.category)))];

export default function Gallery() {
  const [searchParams] = useSearchParams();

  // ── Banner slideshow state ────────────────────────────────
  const bannerSlides = IMAGES.galleryBannerSlides;
  const bannerInterval = IMAGES.galleryBannerInterval ?? 4500;
  const [bannerIdx, setBannerIdx] = useState(0);
  const [prevIdx,   setPrevIdx]   = useState(null);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((next) => {
    if (animating || next === bannerIdx) return;
    setPrevIdx(bannerIdx);
    setBannerIdx(next);
    setAnimating(true);
    setTimeout(() => { setPrevIdx(null); setAnimating(false); }, 800);
  }, [animating, bannerIdx]);

  useEffect(() => {
    const t = setInterval(() => {
      goTo((bannerIdx + 1) % bannerSlides.length);
    }, bannerInterval);
    return () => clearInterval(t);
  }, [bannerIdx, bannerInterval, bannerSlides.length, goTo]);

  // ── Gallery filter state ──────────────────────────────────
  const [active,   setActive]   = useState(() => {
    const cat = searchParams.get("category");
    return cat && ALL_CATEGORIES.includes(cat) ? cat : "All";
  });
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && ALL_CATEGORIES.includes(cat)) setActive(cat);
  }, [searchParams]);

  const filtered =
    active === "All"
      ? IMAGES.gallery
      : IMAGES.gallery.filter((i) => i.category === active);

  const current = bannerSlides[bannerIdx];
  const prev    = prevIdx !== null ? bannerSlides[prevIdx] : null;

  return (
    <>
      {/* ── OTT-style Hero Banner ──────────────────────────── */}
      <section className="relative h-[70vh] min-h-[480px] max-h-[680px] overflow-hidden bg-forest-950">

        {/* Previous slide fading out */}
        {prev && (
          <div
            key={`prev-${prevIdx}`}
            className="absolute inset-0 transition-opacity duration-700 opacity-0"
            aria-hidden="true"
          >
            <img src={prev.src} alt="" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Current slide fading in */}
        <div
          key={`curr-${bannerIdx}`}
          className="absolute inset-0 transition-opacity duration-700 opacity-100"
        >
          <img
            src={current.src}
            alt={current.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-forest-950/50 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/30" aria-hidden="true" />

        {/* Slide content */}
        <div className="relative z-10 h-full flex items-end pb-16 sm:pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-xl">
              {/* Category pill */}
              <span
                className="inline-block font-heading text-[0.68rem] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4 transition-all duration-500"
                style={{ background: `${current.accent}25`, color: current.accent, border: `1px solid ${current.accent}60` }}
              >
                {current.category}
              </span>

              {/* Title */}
              <h1
                className="font-display font-bold text-ivory-50 mb-3 leading-tight transition-all duration-500"
                style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
              >
                {current.title}
              </h1>

              {/* Gold divider */}
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-10 bg-gold-500/60" />
                <span className="text-gold-500 text-xs">✦</span>
              </div>

              {/* Tagline */}
              <p className="text-ivory-200/70 text-base leading-relaxed mb-6">
                {current.tagline}
              </p>

              {/* Jump-to-filter button */}
              <button
                onClick={() => setActive(current.category)}
                className="font-heading font-semibold text-[0.78rem] tracking-[0.12em] uppercase px-6 py-2.5 rounded-full transition-all"
                style={{
                  background: current.accent,
                  color: "#1a2e1e",
                  boxShadow: `0 4px 20px ${current.accent}55`,
                }}
              >
                Browse {current.title} →
              </button>
            </div>
          </div>
        </div>

        {/* Slide counter + dots — bottom right */}
        <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3">
          <span className="font-heading text-ivory-200/40 text-[0.65rem] tracking-widest">
            {String(bannerIdx + 1).padStart(2, "0")} / {String(bannerSlides.length).padStart(2, "0")}
          </span>
          <div className="flex gap-1.5">
            {bannerSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === bannerIdx
                    ? "w-6 h-1.5 bg-gold-400"
                    : "w-1.5 h-1.5 bg-ivory-100/30 hover:bg-ivory-100/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Prev / Next arrows */}
        <button
          onClick={() => goTo((bannerIdx - 1 + bannerSlides.length) % bannerSlides.length)}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-forest-950/50 hover:bg-forest-950/80 border border-ivory-200/10 hover:border-gold-400/40 flex items-center justify-center text-ivory-100/70 hover:text-gold-300 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => goTo((bannerIdx + 1) % bannerSlides.length)}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-forest-950/50 hover:bg-forest-950/80 border border-ivory-200/10 hover:border-gold-400/40 flex items-center justify-center text-ivory-100/70 hover:text-gold-300 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Thumbnail strip — right side, desktop only */}
        <div className="absolute right-16 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-2">
          {bannerSlides.map((slide, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={slide.title}
              className={`w-16 h-10 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                i === bannerIdx
                  ? "border-gold-400 scale-110 shadow-[0_0_12px_rgba(201,148,58,0.5)]"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img src={slide.src} alt={slide.title} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      {/* ── Filter tabs ────────────────────────────────────── */}
      <section className="py-5 bg-ivory-50 border-b border-ivory-200 sticky top-[90px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`font-heading font-medium text-[0.75rem] tracking-[0.12em] uppercase px-5 py-2 rounded-full transition-all ${
                  active === cat
                    ? "bg-forest-800 text-ivory-100 shadow-sm"
                    : "bg-white border border-ivory-200 text-forest-700 hover:border-gold-400/50 hover:text-forest-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Masonry grid ───────────────────────────────────── */}
      <section className="py-16 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <p className="text-center text-forest-600/60 py-20">No photos in this category yet.</p>
          ) : (
            <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
              {filtered.map((img, idx) => (
                <div
                  key={`${img.src}-${idx}`}
                  className="break-inside-avoid rounded-xl overflow-hidden cursor-zoom-in group"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onClick={() => setLightbox(img)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View: ${img.alt}`}
                  onKeyDown={(e) => e.key === "Enter" && setLightbox(img)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full block object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute bottom-2 left-2 font-heading text-[0.6rem] tracking-[0.1em] uppercase px-2 py-0.5 bg-forest-950/70 text-ivory-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA strip ──────────────────────────────────────── */}
      <section className="py-14 bg-gold-500 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-display text-forest-950 font-semibold text-2xl sm:text-3xl mb-3">
            Want an Event That Ends Up in Our Gallery?
          </h2>
          <p className="text-forest-800/80 text-sm mb-7">
            Get in touch and let's start planning your beautiful celebration.
          </p>
          <Link
            to="/contact"
            className="font-heading font-semibold tracking-[0.1em] uppercase text-sm inline-block px-9 py-3.5 bg-forest-900 hover:bg-forest-800 text-ivory-100 rounded-full transition-colors"
          >
            Book Us Now
          </Link>
        </div>
      </section>

      {/* ── Lightbox ───────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-forest-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-10 right-0 font-heading text-ivory-200/80 hover:text-gold-400 transition-colors text-sm tracking-wide"
              onClick={() => setLightbox(null)}
              aria-label="Close preview"
            >
              ✕ Close
            </button>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="w-full rounded-2xl max-h-[80vh] object-contain shadow-2xl"
            />
            <p className="text-center text-ivory-200/60 font-heading text-xs tracking-wide mt-3">
              {lightbox.alt}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
