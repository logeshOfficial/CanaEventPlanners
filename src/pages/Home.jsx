import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "../components/SectionHeading";
import HeroSlider from "../components/HeroSlider";
import ServiceIcon from "../components/ServiceIcon";
import Reveal from "../components/Reveal";
import {
  BUSINESS_NAME,
  HOME_STATS, HOME_SERVICES, HOME_TESTIMONIALS, HOME_EVENT_TYPES,
  IMAGES, WHATSAPP_NUMBER,
} from "../config";

export default function Home() {
  const [introIdx, setIntroIdx] = useState(0);
  const slides = IMAGES.introSlides;
  const interval = IMAGES.introSlideInterval ?? 3500;

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setIntroIdx((i) => (i + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="bg-forest-950" aria-label="Hero">

        {/* Slider — full width, reduced height so it doesn't dominate */}
        {/* mobile: 260px  tablet: 420px  desktop: 520px              */}
        <div className="w-full h-[260px] sm:h-[420px] lg:h-[520px]">
          <HeroSlider />
        </div>

        {/* ── Content strip — below the slider ─────────────── */}
        <div className="bg-forest-950 pt-7 pb-10 px-4 flex flex-col items-center text-center">
          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-12 sm:w-20 bg-gold-500/50" />
            <span className="text-gold-400 text-base">✦</span>
            <span className="h-px w-12 sm:w-20 bg-gold-500/50" />
          </div>

          {/* Tagline */}
          <p className="text-ivory-200/75 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
            From grand weddings to intimate celebrations — we plan, decorate, cater,
            and coordinate every detail so your special day is nothing short of perfect.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I would like to enquire about your event management services.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-heading font-semibold tracking-[0.1em] uppercase text-sm px-9 py-3.5 bg-gold-500 hover:bg-gold-400 text-forest-950 rounded-full transition-all shadow-[0_4px_24px_rgba(201,148,58,0.45)] hover:shadow-[0_6px_32px_rgba(201,148,58,0.60)] hover:-translate-y-0.5 whitespace-nowrap"
            >
              Quick Enquire
            </a>
            <Link
              to="/services"
              className="font-heading font-medium tracking-[0.1em] uppercase text-sm px-9 py-3.5 border border-ivory-200/35 hover:border-gold-400/60 text-ivory-200/80 hover:text-gold-300 rounded-full transition-all whitespace-nowrap"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────── */}
      <section className="bg-gold-500 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              {HOME_STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="font-display text-3xl sm:text-4xl font-bold text-forest-950">{value}</p>
                  <p className="font-heading text-[0.72rem] tracking-[0.15em] uppercase text-forest-800 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Intro / Who We Are ────────────────────────────────── */}
      <section className="py-24 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <Reveal direction="left">
              <SectionHeading eyebrow="Who We Are" title="Your Trusted Event Partner" center={false} />
              <p className="text-forest-800/80 leading-relaxed mb-4">
                At {BUSINESS_NAME}, we believe every event deserves to be a masterpiece.
                With years of experience transforming venues and crafting extraordinary
                experiences, we bring passion, precision, and creativity to every celebration.
              </p>
              <p className="text-forest-800/80 leading-relaxed mb-8">
                From intimate housewarming ceremonies to lavish wedding receptions and
                large-scale corporate events — our dedicated team handles every detail
                so you can be fully present in your moment.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-heading font-semibold text-sm tracking-wide text-forest-800 hover:text-gold-600 transition-colors group"
              >
                <span>Learn more about us</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Reveal>
            <Reveal direction="right">
              <div className="rounded-2xl overflow-hidden shadow-[var(--shadow-card-hover)] aspect-[4/3] bg-forest-100 relative">
                {slides.map((slide, i) => (
                  <img
                    key={slide.src}
                    src={slide.src}
                    alt={slide.alt}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                    style={{ opacity: i === introIdx ? 1 : 0 }}
                    loading="lazy"
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                  <p className="font-display text-base sm:text-lg text-ivory-50 font-semibold leading-tight drop-shadow">
                    Our Events in Action
                  </p>
                </div>
                {slides.length > 1 && (
                  <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setIntroIdx(i)}
                        aria-label={`Show image ${i + 1}`}
                        className={`w-1.5 h-1.5 rounded-full transition-all ${
                          i === introIdx ? "bg-gold-400 w-4" : "bg-ivory-100/60"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Services highlights ────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading
              eyebrow="What We Offer"
              title="Our Services"
              subtitle="A complete range of event services designed to make your celebration seamless, beautiful, and unforgettable."
            />
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {HOME_SERVICES.map(({ icon, title, desc, galleryCategory, preview }, idx) => (
              <Reveal key={title} delay={`${idx * 80}ms`}>
                <Link
                  to={galleryCategory ? `/gallery?category=${galleryCategory}` : "/gallery"}
                  className="rounded-2xl border border-ivory-200 bg-ivory-50 hover:border-gold-400/50 transition-all group block overflow-hidden h-full"
                  style={{ boxShadow: "var(--shadow-card)" }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "var(--shadow-card-hover)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "var(--shadow-card)"}
                >
                  <div className="relative h-44 overflow-hidden bg-forest-100">
                    {preview ? (
                      <img src={preview} alt={`${title} sample`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-ivory-100">
                        <ServiceIcon name={icon} size="lg" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-forest-950/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                      <h3 className="font-display text-base sm:text-lg text-ivory-50 font-semibold leading-tight group-hover:text-gold-300 transition-colors drop-shadow">{title}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-forest-700/70 text-sm leading-relaxed mb-4">{desc}</p>
                    <span className="inline-flex items-center gap-1.5 font-heading text-xs font-semibold tracking-wide text-gold-600 group-hover:gap-2.5 transition-all">
                      View Gallery
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay="100ms">
            <div className="text-center mt-10">
              <Link to="/services" className="font-heading font-semibold tracking-[0.1em] uppercase text-sm inline-flex items-center gap-2 px-9 py-3.5 bg-forest-800 hover:bg-forest-700 text-ivory-100 rounded-full transition-colors">
                View All Services
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Event types ────────────────────────────────────────── */}
      <section className="py-24 bg-forest-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Events We Love" title="Every Occasion, Perfectly Planned" subtitle="No event is too big or too small — we pour the same dedication into each one." light />
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {HOME_EVENT_TYPES.map(({ label, galleryCategory, image, alt }, idx) => (
              <Reveal key={label} delay={`${idx * 60}ms`}>
                <Link
                  to={`/gallery?category=${galleryCategory}`}
                  className="group relative rounded-2xl overflow-hidden aspect-[3/4] block"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
                >
                  <img src={image} alt={alt} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/30 to-transparent" />
                  <div className="absolute inset-0 bg-gold-500/0 group-hover:bg-gold-500/10 transition-all duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                    <p className="font-heading font-semibold text-[0.75rem] tracking-[0.14em] uppercase text-ivory-100 group-hover:text-gold-300 transition-colors">{label}</p>
                    <p className="font-heading text-[0.6rem] tracking-wide text-gold-400/70 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">View Gallery →</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────── */}
      <section className="py-24 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Happy Clients" title="What Our Clients Say" subtitle="Real stories from families and organisations who trusted us with their special day." />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-7">
            {HOME_TESTIMONIALS.map(({ name, event, quote, initials }, idx) => (
              <Reveal key={name} delay={`${idx * 100}ms`}>
                <div className="bg-white rounded-2xl p-7 border border-ivory-200 flex flex-col h-full" style={{ boxShadow: "var(--shadow-card)" }}>
                  <span className="font-display text-5xl text-gold-400/50 leading-none mb-1 select-none">"</span>
                  <p className="text-forest-800/75 text-sm leading-relaxed flex-1 italic font-display">{quote}</p>
                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-ivory-200">
                    <div className="w-10 h-10 rounded-full bg-forest-800 text-ivory-100 flex items-center justify-center font-heading font-bold text-sm shrink-0">{initials}</div>
                    <div>
                      <p className="font-heading font-semibold text-forest-900 text-sm">{name}</p>
                      <p className="text-forest-600/60 text-xs mt-0.5">{event}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA banner ─────────────────────────────────────────── */}
      <section className="py-20 bg-forest-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950 via-forest-900 to-forest-950" aria-hidden="true" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-gold-500/8 blur-3xl rounded-full pointer-events-none" aria-hidden="true" />
        <Reveal className="relative z-10 max-w-2xl mx-auto px-4 text-center">
          <p className="font-heading tracking-[0.2em] text-gold-500/70 text-xs uppercase mb-4">Ready to Begin?</p>
          <h2 className="font-display text-ivory-50 font-semibold mb-4" style={{ fontSize: "clamp(1.6rem, 4vw, 2.5rem)" }}>
            Let's Plan Your Dream Event Together
          </h2>
          <p className="text-ivory-200/60 mb-9 text-base">Tell us about your event and we'll get back to you within 24 hours.</p>
          <Link to="/contact" className="font-heading font-semibold tracking-[0.12em] uppercase text-sm inline-block px-12 py-4 bg-gold-500 hover:bg-gold-400 text-forest-950 rounded-full transition-all shadow-[0_4px_24px_rgba(201,148,58,0.40)] hover:shadow-[0_6px_36px_rgba(201,148,58,0.55)] hover:-translate-y-0.5">
            Send Us an Enquiry
          </Link>
        </Reveal>
      </section>
    </>
  );
}
