import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "./Logo";

const NAV_LINKS = [
  { to: "/",        label: "Home"     },
  { to: "/about",   label: "About"    },
  { to: "/services",label: "Services" },
  { to: "/gallery", label: "Gallery"  },
  { to: "/contact", label: "Contact"  },
];

export default function Navbar() {
  const [open,       setOpen]       = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  // Add shadow when user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-forest-900 transition-shadow ${
        scrolled ? "shadow-[0_4px_24px_rgba(0,0,0,0.35)]" : ""
      }`}
    >
      {/* Top thin gold rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-60" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[80px]">

          {/* Logo */}
          <Link to="/" onClick={() => setOpen(false)} aria-label="Cana Dream Events — Home">
            <Logo variant="nav" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary navigation">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === "/"}
                className={({ isActive }) =>
                  `font-heading font-medium text-[0.8rem] tracking-[0.12em] uppercase px-4 py-2 rounded-md transition-all ${
                    isActive
                      ? "text-gold-400 bg-forest-800"
                      : "text-ivory-200/80 hover:text-gold-300 hover:bg-forest-800/60"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}

            <Link
              to="/contact"
              className="ml-3 font-heading font-semibold text-[0.78rem] tracking-[0.14em] uppercase px-5 py-2.5 bg-gold-500 hover:bg-gold-400 text-forest-950 rounded-full transition-all shadow-[0_2px_12px_rgba(201,148,58,0.4)] hover:shadow-[0_4px_20px_rgba(201,148,58,0.55)]"
            >
              Enquire Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-ivory-100 hover:text-gold-400 p-2 rounded-md transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Bottom gold rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold-600/40 to-transparent" />

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-forest-950 border-t border-forest-800 px-4 py-4 space-y-1" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block font-heading font-medium text-[0.82rem] tracking-[0.14em] uppercase px-4 py-2.5 rounded-md transition-colors ${
                  isActive
                    ? "bg-gold-500 text-forest-950"
                    : "text-ivory-200/80 hover:text-gold-300 hover:bg-forest-800/60"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="block mt-3 font-heading font-semibold text-[0.82rem] tracking-[0.14em] uppercase px-4 py-3 bg-gold-500 hover:bg-gold-400 text-forest-950 rounded-full text-center transition-colors"
          >
            Enquire Now
          </Link>
        </nav>
      </div>
    </header>
  );
}
