import { Link, useNavigate } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import ServiceIcon from "../components/ServiceIcon";
import { ALL_SERVICES } from "../config";

export default function Services() {
  const navigate = useNavigate();
  return (
    <>
      {/* Hero */}
      <section className="bg-forest-900 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 to-forest-900" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <p className="font-heading font-light tracking-[0.25em] text-gold-400/70 text-xs uppercase mb-4">
            What We Do
          </p>
          <h1 className="font-display text-ivory-50 font-semibold mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Our Services
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold-500/50" />
            <span className="text-gold-500 text-sm">✦</span>
            <span className="h-px w-10 bg-gold-500/50" />
          </div>
          <p className="text-ivory-200/70 text-base">
            Everything you need for a flawless event — under one roof.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Offerings"
            title="Complete Event Services"
            subtitle="Mix and match services to build a package that's perfect for your event and budget."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {ALL_SERVICES.map(({ icon, title, tag, desc, highlights, galleryCategory, preview }) => (
              <div
                key={title}
                className={`relative bg-white rounded-2xl border border-ivory-200 hover:border-gold-400/50 flex flex-col transition-all group overflow-hidden ${galleryCategory ? "cursor-pointer" : ""}`}
                style={{ boxShadow: "var(--shadow-card)" }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "var(--shadow-card-hover)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "var(--shadow-card)"}
                onClick={() => galleryCategory && navigate(`/gallery?category=${galleryCategory}`)}
                role={galleryCategory ? "button" : undefined}
                tabIndex={galleryCategory ? 0 : undefined}
                onKeyDown={(e) => galleryCategory && e.key === "Enter" && navigate(`/gallery?category=${galleryCategory}`)}
                aria-label={galleryCategory ? `${title} — view gallery` : title}
              >
                {/* Preview image — title & tag overlaid bottom-left */}
                <div className="relative h-40 overflow-hidden bg-forest-100 shrink-0">
                  {preview ? (
                    <img
                      src={preview}
                      alt={`${title} sample`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-ivory-100">
                      <ServiceIcon name={icon} size="lg" />
                    </div>
                  )}
                  {/* Gradient for text legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent" />
                  {/* Tag badge — top right */}
                  {tag && (
                    <span className={`absolute top-3 right-3 font-heading text-[0.62rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full ${
                      tag === "Most Popular"
                        ? "bg-gold-500 text-forest-950"
                        : "bg-forest-900/80 text-ivory-100"
                    }`}>
                      {tag}
                    </span>
                  )}
                  {/* Title — bottom left */}
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                    <h3 className="font-display text-base text-ivory-50 font-semibold leading-tight group-hover:text-gold-300 transition-colors drop-shadow">
                      {title}
                    </h3>
                  </div>
                </div>

                {/* Card body — desc + highlights + View Gallery, no title */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-forest-700/70 text-sm leading-relaxed mb-5 flex-1">{desc}</p>
                  <ul className="space-y-1.5 mt-auto">
                    {highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-forest-600/70">
                        <span className="text-gold-500 mt-0.5 shrink-0">✓</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  {galleryCategory && (
                    <span className="inline-flex items-center gap-1.5 font-heading text-xs font-semibold tracking-wide text-gold-600 mt-5 group-hover:gap-2.5 transition-all">
                      View Gallery
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-forest-950 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-ivory-50 font-semibold mb-4"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
            Need a Custom Package?
          </h2>
          <p className="text-ivory-200/60 mb-8">
            We'll build a tailored quote around your event type, guest count, and budget.
          </p>
          <Link
            to="/contact"
            className="font-heading font-semibold tracking-[0.1em] uppercase text-sm inline-block px-10 py-4 bg-gold-500 hover:bg-gold-400 text-forest-950 rounded-full transition-all"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </>
  );
}
