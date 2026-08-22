import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import ServiceIcon from "./ServiceIcon";
import {
  BUSINESS_ADDRESS, BUSINESS_PHONE, BUSINESS_EMAIL,
  SOCIAL_LINKS, GOOGLE_MAPS_EMBED_URL,
} from "../config";

const QUICK_LINKS = [
  { to: "/",         label: "Home"     },
  { to: "/about",    label: "About"    },
  { to: "/services", label: "Services" },
  { to: "/gallery",  label: "Gallery"  },
  { to: "/contact",  label: "Contact"  },
];

const SERVICE_LIST = [
  { label: "Catering",       to: "/gallery?category=Catering"    },
  { label: "Decoration",     to: "/gallery?category=Decoration"  },
  { label: "Garlands",       to: "/gallery?category=Wedding"     },
  { label: "Mandap Setup",   to: "/gallery?category=Wedding"     },
  { label: "Photography",    to: "/gallery?category=Wedding"     },
  { label: "Event Planning", to: "/services"                     },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const { pathname } = useLocation();
  const isAbout = pathname === "/about";

  return (
    <footer className="bg-forest-950 text-ivory-200">
      {/* Top gold rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12 items-start">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Logo variant="icon" className="w-16 h-16 shrink-0" />
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-bold tracking-widest text-gold-400 uppercase"
                      style={{ fontSize: "0.95rem", letterSpacing: "0.12em" }}>
                  Cana Dream Events
                </span>
                <span className="font-heading font-light tracking-[0.2em] text-gold-500/70 uppercase"
                      style={{ fontSize: "0.62rem" }}>
                  The Event Planners
                </span>
              </div>
            </div>
            <p className="text-ivory-300/70 text-sm leading-relaxed">
              Making your special moments unforgettable — from intimate gatherings to grand celebrations across Tamil Nadu.
            </p>

            {/* Social row */}
            <div className="flex gap-2 mt-5">
              {SOCIAL_LINKS.instagram && (
                <SocialBtn href={SOCIAL_LINKS.instagram} label="Instagram">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </SocialBtn>
              )}
              {SOCIAL_LINKS.facebook && (
                <SocialBtn href={SOCIAL_LINKS.facebook} label="Facebook">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </SocialBtn>
              )}
              {SOCIAL_LINKS.youtube && (
                <SocialBtn href={SOCIAL_LINKS.youtube} label="YouTube">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </SocialBtn>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-heading font-semibold text-[0.7rem] tracking-[0.2em] uppercase text-gold-500 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-ivory-300/70 hover:text-gold-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-semibold text-[0.7rem] tracking-[0.2em] uppercase text-gold-500 mb-4">
              Our Services
            </h3>
            <ul className="space-y-2">
              {SERVICE_LIST.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-ivory-300/70 hover:text-gold-400 text-sm transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-[0.7rem] tracking-[0.2em] uppercase text-gold-500 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex gap-3 text-ivory-300/70">
                <ServiceIcon name="address" size="sm" className="shrink-0 mt-0.5 bg-forest-800 border-forest-700 text-gold-400" />
                <span>{BUSINESS_ADDRESS}</span>
              </li>
              <li>
                <a href={`tel:${BUSINESS_PHONE.replace(/\s/g, "")}`}
                   className="flex gap-3 text-ivory-300/70 hover:text-gold-400 transition-colors">
                  <ServiceIcon name="phone" size="sm" className="shrink-0 bg-forest-800 border-forest-700 text-gold-400" />
                  <span>{BUSINESS_PHONE}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${BUSINESS_EMAIL}`}
                   className="flex gap-3 items-center text-ivory-300/70 hover:text-gold-400 transition-colors min-w-0">
                  <ServiceIcon name="email" size="sm" className="shrink-0 bg-forest-800 border-forest-700 text-gold-400" />
                  <span className="text-xs break-all">{BUSINESS_EMAIL}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Find Us map — only on About page */}
        {isAbout && GOOGLE_MAPS_EMBED_URL && (
          <div className="mb-10">
            <h3 className="font-heading font-semibold text-[0.7rem] tracking-[0.2em] uppercase text-gold-500 mb-4 flex items-center gap-2">
              <ServiceIcon name="address" size="sm" className="bg-forest-800 border-forest-700 text-gold-400" />
              Find Us
            </h3>
            <div className="rounded-xl overflow-hidden border border-forest-800" style={{ height: "240px" }}>
              <iframe
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Cana Dream Events location"
              />
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_ADDRESS)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-2 text-xs font-heading text-gold-500/70 hover:text-gold-400 transition-colors"
            >
              Open in Google Maps →
            </a>
          </div>
        )}

        {/* Bottom bar */}
        <div className="border-t border-forest-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-ivory-300/50">
          <span>© {year} Cana Dream Events. All rights reserved.</span>
          <span className="hidden sm:block">Crafted with ♥ for every celebration</span>
        </div>
      </div>
    </footer>
  );
}

function SocialBtn({ href, label, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-full bg-forest-800 hover:bg-gold-500 hover:text-forest-950 text-ivory-300 flex items-center justify-center transition-all"
    >
      {children}
    </a>
  );
}
