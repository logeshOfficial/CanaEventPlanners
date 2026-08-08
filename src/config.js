/**
 * ─────────────────────────────────────────────────────────────────
 *  SITE CONFIGURATION  — update this file before going live.
 *  All text, contact details, images, and social links live here.
 *  Components read from this file — nothing is hard-coded elsewhere.
 * ─────────────────────────────────────────────────────────────────
 */

// ── Identity ──────────────────────────────────────────────────
export const BUSINESS_NAME     = "Cana Dream Events";
export const BUSINESS_SHORT    = "CDE";                         // monogram in logo
export const BUSINESS_TAGLINE  = "Crafting Moments & Creating Memories";
export const BUSINESS_SUBTITLE = "The Event Planners";
export const ESTABLISHED_YEAR  = 2015;

// ── Contact ───────────────────────────────────────────────────
// ↓ Replace with real number (digits only, country code first, no + or spaces)
export const WHATSAPP_NUMBER = "919994288812";

export const BUSINESS_PHONE  = "+91 91999 XXXXX";  // ← REPLACE (display)
export const BUSINESS_EMAIL  = "hello@canadreamevents.com"; // ← REPLACE
export const BUSINESS_ADDRESS =
  "Trichy, Tamil Nadu — 620001"; // ← REPLACE

// ── Social Links ─────────────────────────────────────────────
// Leave a value as "" to hide that icon
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/cana_dream_events/",
  facebook:  "",   // ← REPLACE
  youtube:   "",  // ← ADD if available
};

// ── Images ────────────────────────────────────────────────────
// All images are centralised here. Swap URLs with real photos before launch.
// Tip: put your own photos in /public/images/ and reference as "/images/my-photo.jpg"
export const IMAGES = {
  // Hero section background (Home page)
  hero: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80",

  // "Who We Are" section (Home + About pages)
  intro: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",

  // About page — team / venue photo
  aboutTeam: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",

  // Gallery grid — replace with real event photos
  gallery: [
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", alt: "Wedding ceremony decoration", category: "Wedding" },
    { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", alt: "Reception stage decoration",  category: "Wedding" },
    { src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80", alt: "Birthday party decoration",   category: "Birthday" },
    { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", alt: "Balloon decoration",          category: "Birthday" },
    { src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", alt: "Corporate event setup",       category: "Corporate" },
    { src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80", alt: "Corporate conference",        category: "Corporate" },
    { src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", alt: "Catering spread",             category: "Catering" },
    { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Food presentation",           category: "Catering" },
    { src: "https://images.unsplash.com/photo-1538678722183-f6d0a5c5ccf0?w=800&q=80", alt: "Floral garlands",             category: "Decoration" },
    { src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800&q=80", alt: "Stage floral decoration",     category: "Decoration" },
    { src: "https://images.unsplash.com/photo-1567683866049-f0f7ee94602a?w=800&q=80", alt: "Engagement ceremony",         category: "Engagement" },
    { src: "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=800&q=80", alt: "Housewarming event",          category: "Housewarming" },
  ],
};

// ── Home Page Content ─────────────────────────────────────────
export const HOME_STATS = [
  { value: `${new Date().getFullYear() - ESTABLISHED_YEAR}+`, label: "Years of Experience" },
  { value: "500+",  label: "Events Delivered" },
  { value: "1000+", label: "Happy Families" },
  { value: "50+",   label: "Expert Team Members" },
];

export const HOME_SERVICES = [
  { icon: "🍽️", title: "Catering",        desc: "Authentic multi-cuisine menus — from traditional South Indian spreads to continental buffets." },
  { icon: "🌸", title: "Decoration",      desc: "Stunning stage, floral, and thematic décor tailored to your vision and colour palette." },
  { icon: "💐", title: "Garlands",        desc: "Fresh, fragrant garlands crafted for weddings, pujas, and every auspicious occasion." },
  { icon: "🏛️", title: "Mandap Setup",    desc: "Elegant mandap structures with customisable draping, lighting, and floral accents." },
  { icon: "📸", title: "Photography",     desc: "Professional photo and video coverage capturing every precious moment." },
  { icon: "🎉", title: "Event Planning",  desc: "End-to-end coordination so you enjoy the day stress-free while we handle everything." },
];

export const HOME_TESTIMONIALS = [
  {
    name: "Priya & Karthik",
    event: "Wedding, Chennai",
    quote: "Our wedding was absolutely magical. Every detail was handled with such care. Guests are still talking about the decoration and food!",
    initials: "PK",
  },
  {
    name: "Ramesh Kumar",
    event: "Corporate Event, Chennai",
    quote: "Professional, punctual, and polished. The team managed our 400-person annual day flawlessly. Highly recommend for corporate events.",
    initials: "RK",
  },
  {
    name: "Anitha S.",
    event: "Birthday Party, Trichy",
    quote: "My daughter's birthday was a dream come true. The balloon décor and catering were perfect. We'll definitely book again!",
    initials: "AS",
  },
];

export const HOME_EVENT_TYPES = [
  ["💍", "Weddings"],
  ["🎂", "Birthdays"],
  ["🏢", "Corporate"],
  ["🏠", "Housewarmings"],
  ["💝", "Engagements"],
  ["🎊", "Get-togethers"],
];

// ── About Page Content ────────────────────────────────────────
export const ABOUT_VALUES = [
  { icon: "🤝", title: "Trust & Transparency", desc: "Clear communication and honest pricing — no hidden surprises." },
  { icon: "✨", title: "Attention to Detail",   desc: "Every flower, every light, every plate — crafted with care." },
  { icon: "⏰", title: "Punctuality",           desc: "We respect your timeline and deliver on our commitments, always." },
  { icon: "💡", title: "Creative Vision",       desc: "Fresh ideas that translate your dream into reality." },
];

export const ABOUT_TEAM = [
  { name: "Placeholder Name", role: "Founder & Lead Planner",  initials: "PN" },
  { name: "Placeholder Name", role: "Head of Catering",        initials: "PN" },
  { name: "Placeholder Name", role: "Décor Specialist",        initials: "PN" },
  { name: "Placeholder Name", role: "Photography Lead",        initials: "PN" },
];

// ── Services Page Content ─────────────────────────────────────
export const ALL_SERVICES = [
  {
    icon: "🍽️", title: "Catering", tag: "Most Popular",
    desc: "From traditional South Indian spreads to elaborate lunch and dinner buffets with live counters.",
    highlights: ["Tiffin / Breakfast menus", "Vegetarian & non-vegetarian lunch", "Dinner buffets & live counters", "Custom dietary menus"],
  },
  {
    icon: "🌸", title: "Decoration", tag: "",
    desc: "Our décor team creates breathtaking settings using fresh flowers, fabric draping, lighting, and themed props.",
    highlights: ["Stage & backdrop decoration", "Floral centrepieces", "Thematic balloon setups", "Entrance & pathway décor"],
  },
  {
    icon: "💐", title: "Garlands", tag: "",
    desc: "Fresh, handcrafted garlands using jasmine, roses, and seasonal flowers — perfect for weddings and pujas.",
    highlights: ["Wedding garlands (maalai)", "Jasmine strings & veni", "Door & mandap garlands", "Bulk orders welcome"],
  },
  {
    icon: "🏛️", title: "Mandap Setup", tag: "",
    desc: "Elegant mandap installations with customisable pillars, fabric canopies, floral accents.",
    highlights: ["Traditional & modern styles", "Custom fabric & floral", "Full assembly & dismantling", "Indoor & outdoor"],
  },
  {
    icon: "📸", title: "Photography & Video", tag: "",
    desc: "Professional photographers capturing candid emotions alongside portraits — delivered as edited prints and cinematic films.",
    highlights: ["Candid & portrait photography", "Cinematic wedding films", "Drone shots (where permitted)", "Same-day preview reels"],
  },
  {
    icon: "🗓️", title: "Full Event Planning", tag: "",
    desc: "Hand everything over to us — vendor coordination, venue booking, timeline management on the day.",
    highlights: ["Vendor & venue coordination", "Day-of scheduling", "Guest management", "Budget tracking"],
  },
  {
    icon: "🎵", title: "DJ & Sound", tag: "Coming Soon",
    desc: "Professional DJ setups, PA systems, and live music coordination.",
    highlights: ["DJ with curated playlists", "Professional PA / AV setup", "Live band coordination", "Announcer / emcee service"],
  },
  {
    icon: "🚌", title: "Guest Transport", tag: "Coming Soon",
    desc: "Coordinated transport for out-of-town guests, bridal parties, and VIP delegates.",
    highlights: ["Bus & mini-van hire", "Airport transfers", "Bridal car decoration", "Logistics planning"],
  },
];

// ── Contact Page ──────────────────────────────────────────────
export const BUSINESS_HOURS = [
  { days: "Mon – Sat", hours: "9 AM – 7 PM" },
  { days: "Sunday",    hours: "10 AM – 4 PM" },
];
