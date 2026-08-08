import { useState } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { IMAGES } from "../config";

// Derive categories dynamically from config
const ALL_CATEGORIES = ["All", ...Array.from(new Set(IMAGES.gallery.map((i) => i.category)))];

export default function Gallery() {
  const [active,   setActive]   = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered =
    active === "All"
      ? IMAGES.gallery
      : IMAGES.gallery.filter((i) => i.category === active);

  return (
    <>
      {/* Hero */}
      <section className="bg-forest-900 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 to-forest-900" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <p className="font-heading font-light tracking-[0.25em] text-gold-400/70 text-xs uppercase mb-4">
            Our Work
          </p>
          <h1 className="font-display text-ivory-50 font-semibold mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Gallery
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold-500/50" />
            <span className="text-gold-500 text-sm">✦</span>
            <span className="h-px w-10 bg-gold-500/50" />
          </div>
          <p className="text-ivory-200/70 text-base">
            A glimpse into the celebrations we've had the privilege of crafting.
          </p>
        </div>
      </section>

      {/* Filter tabs — sticky below navbar */}
      <section className="py-5 bg-ivory-50 border-b border-ivory-200 sticky top-[69px] z-30">
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

      {/* Masonry grid */}
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
                    {/* Category badge */}
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

      {/* CTA strip */}
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

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-forest-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
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
