import SectionHeading from "../components/SectionHeading";
import ServiceIcon from "../components/ServiceIcon";
import Reveal from "../components/Reveal";
import { BUSINESS_NAME, ESTABLISHED_YEAR, ABOUT_VALUES, ABOUT_TEAM, IMAGES } from "../config";

export default function About() {
  const yearsExp = new Date().getFullYear() - ESTABLISHED_YEAR;

  return (
    <>
      {/* Page hero */}
      <section className="bg-forest-900 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 to-forest-900" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <p className="font-heading font-light tracking-[0.25em] text-gold-400/70 text-xs uppercase mb-4">
            Our Story
          </p>
          <h1 className="font-display text-ivory-50 font-semibold mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            About {BUSINESS_NAME}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold-500/50" />
            <span className="text-gold-500 text-sm">✦</span>
            <span className="h-px w-10 bg-gold-500/50" />
          </div>
          <p className="text-ivory-200/70 text-base leading-relaxed">
            {yearsExp} years of passion, precision, and unforgettable celebrations.
          </p>
        </div>
      </section>

      {/* Story section */}
      <section className="py-24 bg-ivory-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <Reveal direction="left">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-forest-100 relative"
                   style={{ boxShadow: "var(--shadow-card-hover)" }}>
                <img src={IMAGES.aboutTeam} alt="Event planning team" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-forest-950/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                  <p className="font-display text-base sm:text-lg text-ivory-50 font-semibold leading-tight drop-shadow">Our Team at Work</p>
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <SectionHeading eyebrow={`Est. ${ESTABLISHED_YEAR}`} title="How We Started" center={false} />
              <p className="text-forest-800/80 leading-relaxed mb-4">
                {BUSINESS_NAME} was born from a simple belief: every family deserves a
                celebration that feels magical, not stressful. Founded in {ESTABLISHED_YEAR}
                by a passionate team of event enthusiasts, we started with small birthday
                parties and grew into one of the region's most trusted event management companies.
              </p>
              <p className="text-forest-800/80 leading-relaxed mb-4">
                Over the years, we've had the honour of planning hundreds of weddings,
                corporate galas, housewarmings, and milestone birthdays. Each event has
                taught us something new and deepened our commitment to excellence.
              </p>
              <p className="text-forest-800/80 leading-relaxed">
                Today, our team of 50+ dedicated professionals brings together expertise
                in catering, décor, photography, logistics, and event coordination —
                all under one roof, so you have a single point of contact for everything.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Why Choose Us" title="What Sets Us Apart" subtitle="We don't just manage events — we create experiences your guests will remember for years." />
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_VALUES.map(({ icon, title, desc }, idx) => (
              <Reveal key={title} delay={`${idx * 80}ms`}>
                <div className="p-7 rounded-2xl border border-ivory-200 bg-ivory-50 hover:border-gold-400/50 transition-all text-center group h-full" style={{ boxShadow: "var(--shadow-card)" }}>
                  <div className="flex justify-center mb-4"><ServiceIcon name={icon} size="lg" /></div>
                  <h3 className="font-display text-lg text-forest-900 font-semibold mb-2 group-hover:text-gold-600 transition-colors">{title}</h3>
                  <p className="text-forest-700/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the team */}
      <section className="py-24 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <SectionHeading eyebrow="Our People" title="Meet the Team" subtitle="Passionate professionals who treat your event as if it were their own." />
          </Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {ABOUT_TEAM.map(({ name, role, initials }, i) => (
              <Reveal key={`${name}-${i}`} delay={`${i * 80}ms`}>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-forest-800 text-ivory-100 flex items-center justify-center font-display text-2xl font-bold mx-auto mb-3 shadow-md">{initials}</div>
                  <p className="font-heading font-semibold text-forest-900 text-sm">{name}</p>
                  <p className="text-forest-600/60 text-xs mt-0.5">{role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
