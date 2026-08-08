import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import { ALL_SERVICES } from "../config";

export default function Services() {
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
            {ALL_SERVICES.map(({ icon, title, tag, desc, highlights }) => (
              <div
                key={title}
                className="relative bg-white rounded-2xl border border-ivory-200 hover:border-gold-400/50 p-7 flex flex-col transition-all group"
                style={{ boxShadow: "var(--shadow-card)" }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "var(--shadow-card-hover)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "var(--shadow-card)"}
              >
                {tag && (
                  <span className={`absolute top-4 right-4 font-heading text-[0.62rem] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full ${
                    tag === "Most Popular"
                      ? "bg-gold-500 text-forest-950"
                      : "bg-forest-100 text-forest-600"
                  }`}>
                    {tag}
                  </span>
                )}
                <span className="text-3xl mb-4 block">{icon}</span>
                <h3 className="font-display text-xl text-forest-900 font-semibold mb-2 group-hover:text-gold-600 transition-colors">
                  {title}
                </h3>
                <p className="text-forest-700/70 text-sm leading-relaxed mb-5 flex-1">{desc}</p>
                <ul className="space-y-1.5 mt-auto">
                  {highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-forest-600/70">
                      <span className="text-gold-500 mt-0.5 shrink-0">✓</span>
                      {h}
                    </li>
                  ))}
                </ul>
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
