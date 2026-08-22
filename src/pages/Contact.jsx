import EnquiryForm from "../components/EnquiryForm";
import ServiceIcon from "../components/ServiceIcon";
import Reveal from "../components/Reveal";
import {
  BUSINESS_PHONE, BUSINESS_EMAIL, BUSINESS_ADDRESS,
  BUSINESS_HOURS,
} from "../config";

const CONTACT_DETAILS = [
  { icon: "phone",   label: "Phone",   value: BUSINESS_PHONE,   href: `tel:${BUSINESS_PHONE.replace(/\s/g, "")}` },
  { icon: "email",   label: "Email",   value: BUSINESS_EMAIL,   href: `mailto:${BUSINESS_EMAIL}` },
  { icon: "address", label: "Address", value: BUSINESS_ADDRESS, href: null },
];

export default function Contact() {
  return (
    <>
      {/* Page hero */}
      <section className="bg-forest-900 py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/60 to-forest-900" aria-hidden="true" />
        <div className="relative z-10 max-w-2xl mx-auto px-4">
          <p className="font-heading font-light tracking-[0.25em] text-gold-400/70 text-xs uppercase mb-4">
            Get in Touch
          </p>
          <h1 className="font-display text-ivory-50 font-semibold mb-4"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Plan Your Event With Us
          </h1>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-gold-500/50" />
            <span className="text-gold-500 text-sm">✦</span>
            <span className="h-px w-10 bg-gold-500/50" />
          </div>
          <p className="text-ivory-200/70 text-base leading-relaxed">
            Fill in the form and we'll send your enquiry directly to our team via WhatsApp.
            We typically respond within a few hours.
          </p>
        </div>
      </section>

      {/* Main section */}
      <section className="py-16 bg-ivory-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10 items-start">

            {/* ── Sidebar ──────────────────────────────────── */}
            <Reveal direction="left">
              <aside className="space-y-7">
                <div>
                  <h2 className="font-display text-2xl text-forest-900 font-semibold mb-2">
                    Contact Information
                  </h2>
                  <p className="text-forest-700/70 text-sm leading-relaxed">
                    Prefer to reach out directly? Use any of the channels below.
                  </p>
                </div>

                {CONTACT_DETAILS.map(({ icon, label, value, href }) => (
                  <div key={label} className="flex gap-4 items-start">
                    <ServiceIcon name={icon} size="sm" className="shrink-0 mt-0.5" />
                    <div>
                      <p className="font-heading font-semibold text-[0.65rem] tracking-[0.18em] uppercase text-forest-500/70 mb-0.5">
                        {label}
                      </p>
                      {href ? (
                        <a href={href}
                           target={href.startsWith("http") ? "_blank" : undefined}
                           rel="noopener noreferrer"
                           className="text-forest-900 font-medium text-sm hover:text-gold-600 transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-forest-800 text-sm">{value}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Business hours card */}
                <div className="bg-forest-900 rounded-2xl p-6 text-ivory-100">
                  <h3 className="font-heading font-semibold text-[0.68rem] tracking-[0.2em] uppercase text-gold-400 mb-4">
                    Business Hours
                  </h3>
                  <ul className="space-y-2">
                    {BUSINESS_HOURS.map(({ days, hours }) => (
                      <li key={days} className="flex justify-between text-sm">
                        <span className="text-ivory-200/70">{days}</span>
                        <span className="text-gold-300 font-medium">{hours}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-ivory-300/50 mt-4 font-heading tracking-wide">
                    For urgent enquiries, WhatsApp is the fastest way to reach us.
                  </p>
                </div>
              </aside>
            </Reveal>

            {/* ── Form ─────────────────────────────────────── */}
            <Reveal direction="right" className="lg:col-span-2">
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
