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

export const BUSINESS_PHONE  = "+91 99942 88812";  
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

  // "Who We Are" rotating panel (Home page) — add/remove/reorder freely
  // Each entry: { src: "URL or /images/photo.jpg", alt: "description" }
  introSlides: [
    {
      src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      alt: "Elegant event decoration",
    },
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
      alt: "Beautiful wedding ceremony",
    },
    {
      src: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80",
      alt: "Birthday celebration setup",
    },
    {
      src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
      alt: "Festive event decoration",
    },
  ],
  // How long each intro slide stays visible (milliseconds)
  introSlideInterval: 3500,

  // About page — team / venue photo
  aboutTeam: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",

  // Gallery page — OTT-style hero banner slides
  // Each slide represents a category with a featured image, title & tagline
  // Add/remove/reorder freely; interval controls auto-advance speed
  galleryBannerSlides: [
    {
      src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=80",
      category: "Wedding",
      title: "Weddings",
      tagline: "Where two souls become one — crafted with love and tradition.",
      accent: "#c9943a",
    },
    {
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80",
      category: "Birthday",
      title: "Birthdays",
      tagline: "Every age deserves a celebration worth remembering.",
      accent: "#e07b39",
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80",
      category: "Corporate",
      title: "Corporate Events",
      tagline: "Professional excellence meets unforgettable experiences.",
      accent: "#4a7c8e",
    },
    {
      src: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1600&q=80",
      category: "Decoration",
      title: "Décor & Florals",
      tagline: "Breathtaking spaces that tell your story in every petal.",
      accent: "#b06b8a",
    },
    {
      src: "https://images.unsplash.com/photo-1567683866049-f0f7ee94602a?w=1600&q=80",
      category: "Engagement",
      title: "Engagements",
      tagline: "The perfect beginning to your forever.",
      accent: "#c9943a",
    },
  ],
  galleryBannerInterval: 4500,

  // Gallery grid — replace with real event photos
  gallery: [
    { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", alt: "Wedding ceremony decoration", category: "Wedding" },
    { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", alt: "Reception stage decoration",  category: "Wedding" },
    { src: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&q=80", alt: "Birthday party decoration",   category: "Birthday" },
    { src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Balloon decoration",          category: "Birthday" },
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

// ── Hero Slideshow Images ─────────────────────────────────────
// Replace these URLs with your own event photos
// Put photos in /public/images/ and reference as "/images/photo.jpg"
export const HERO_SLIDES = [
  {
    // Wide wedding banquet hall — long decorated dining tables
    src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&h=700&fit=crop&crop=center&q=85",
    alt: "Elegant wedding banquet hall",
  },
  {
    // Outdoor wedding ceremony — chairs lined up, floral arch
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&h=700&fit=crop&crop=center&q=85",
    alt: "Wedding ceremony setup",
  },
  {
    // Birthday celebration — colourful party table
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&h=700&fit=crop&crop=center&q=85",
    alt: "Birthday party decoration",
  },
  {
    // Corporate / gala event — wide stage with audience
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&h=700&fit=crop&crop=center&q=85",
    alt: "Corporate gala event",
  },
];

// Slide interval in milliseconds (3000 = 3 seconds)
export const HERO_SLIDE_INTERVAL = 3000;
export const HOME_STATS = [
  { value: "A Decade of Magic",     label: "Years of Experience" },
  { value: "Countless Celebrations", label: "Events Delivered" },
  { value: "Smiles All Around",      label: "Happy Families" },
  { value: "A Passionate Crew",      label: "Expert Team Members" },
];

export const HOME_SERVICES = [
  { icon: "catering",      title: "Catering",       galleryCategory: "Catering",    preview: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80", desc: "Authentic multi-cuisine menus — from traditional South Indian spreads to continental buffets." },
  { icon: "decoration",    title: "Decoration",     galleryCategory: "Decoration",  preview: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80", desc: "Stunning stage, floral, and thematic décor tailored to your vision and colour palette." },
  { icon: "garlands",      title: "Garlands",       galleryCategory: "Wedding",     preview: "https://images.unsplash.com/photo-1538678722183-f6d0a5c5ccf0?w=600&q=80", desc: "Fresh, fragrant garlands crafted for weddings, pujas, and every auspicious occasion." },
  { icon: "mandap",        title: "Mandap Setup",   galleryCategory: "Wedding",     preview: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80", desc: "Elegant mandap structures with customisable draping, lighting, and floral accents." },
  { icon: "photography",   title: "Photography",    galleryCategory: "Wedding",     preview: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80", desc: "Professional photo and video coverage capturing every precious moment." },
  { icon: "planning",      title: "Event Planning", galleryCategory: "Corporate",   preview: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80", desc: "End-to-end coordination so you enjoy the day stress-free while we handle everything." },
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
  {
    label: "Weddings",
    galleryCategory: "Wedding",
    // Tamil thaali / South Indian wedding ceremony
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    alt: "Tamil wedding thaali ceremony",
  },
  {
    label: "Birthdays",
    galleryCategory: "Birthday",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Birthday celebration with balloons",
  },
  {
    label: "Corporate",
    galleryCategory: "Corporate",
    // Conference / corporate event setup
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80",
    alt: "Corporate event and conference",
  },
  {
    label: "Housewarmings",
    galleryCategory: "Housewarming",
    // Indian pooja / housewarming ceremony
    image: "https://images.unsplash.com/photo-1604014237256-11d475e2a2d8?w=600&q=80",
    alt: "Housewarming ceremony with diyas",
  },
  {
    label: "Engagements",
    galleryCategory: "Engagement",
    // Ring ceremony — man placing ring on woman's finger
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
    alt: "Engagement ring ceremony",
  },
  {
    label: "Get-togethers",
    galleryCategory: "All",
    // Group celebration / gathering
    image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80",
    alt: "Family and friends get-together celebration",
  },
];

// ── About Page Content ────────────────────────────────────────
export const ABOUT_VALUES = [
  { icon: "trust",       title: "Trust & Transparency", desc: "Clear communication and honest pricing — no hidden surprises." },
  { icon: "detail",      title: "Attention to Detail",   desc: "Every flower, every light, every plate — crafted with care." },
  { icon: "punctuality", title: "Punctuality",           desc: "We respect your timeline and deliver on our commitments, always." },
  { icon: "creative",    title: "Creative Vision",       desc: "Fresh ideas that translate your dream into reality." },
];

export const ABOUT_TEAM = [
  { name: "Placeholder Name", role: "Founder & Lead Planner",  initials: "PN" },
  { name: "Placeholder Name", role: "Head of Catering",        initials: "PN" },
  { name: "Placeholder Name", role: "Decor Specialist",        initials: "PN" },
  { name: "Placeholder Name", role: "Photography Lead",        initials: "PN" },
];

// ── Services Page Content ─────────────────────────────────────
export const ALL_SERVICES = [
  {
    icon: "catering", title: "Catering", tag: "Most Popular", galleryCategory: "Catering",
    preview: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80",
    desc: "From traditional South Indian spreads to elaborate lunch and dinner buffets with live counters.",
    highlights: ["Tiffin / Breakfast menus", "Vegetarian & non-vegetarian lunch", "Dinner buffets & live counters", "Custom dietary menus"],
  },
  {
    icon: "decoration", title: "Decoration", tag: "", galleryCategory: "Decoration",
    preview: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&q=80",
    desc: "Our décor team creates breathtaking settings using fresh flowers, fabric draping, lighting, and themed props.",
    highlights: ["Stage & backdrop decoration", "Floral centrepieces", "Thematic balloon setups", "Entrance & pathway décor"],
  },
  {
    icon: "garlands", title: "Garlands", tag: "", galleryCategory: "Wedding",
    preview: "https://images.unsplash.com/photo-1538678722183-f6d0a5c5ccf0?w=600&q=80",
    desc: "Fresh, handcrafted garlands using jasmine, roses, and seasonal flowers — perfect for weddings and pujas.",
    highlights: ["Wedding garlands (maalai)", "Jasmine strings & veni", "Door & mandap garlands", "Bulk orders welcome"],
  },
  {
    icon: "mandap", title: "Mandap Setup", tag: "", galleryCategory: "Wedding",
    preview: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    desc: "Elegant mandap installations with customisable pillars, fabric canopies, floral accents.",
    highlights: ["Traditional & modern styles", "Custom fabric & floral", "Full assembly & dismantling", "Indoor & outdoor"],
  },
  {
    icon: "photography", title: "Photography & Video", tag: "", galleryCategory: "Wedding",
    preview: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    desc: "Professional photographers capturing candid emotions alongside portraits — delivered as edited prints and cinematic films.",
    highlights: ["Candid & portrait photography", "Cinematic wedding films", "Drone shots (where permitted)", "Same-day preview reels"],
  },
  {
    icon: "planning", title: "Full Event Planning", tag: "", galleryCategory: "Corporate",
    preview: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    desc: "Hand everything over to us — vendor coordination, venue booking, timeline management on the day.",
    highlights: ["Vendor & venue coordination", "Day-of scheduling", "Guest management", "Budget tracking"],
  },
  {
    icon: "music", title: "DJ & Sound", tag: "Coming Soon", galleryCategory: null,
    preview: null,
    desc: "Professional DJ setups, PA systems, and live music coordination.",
    highlights: ["DJ with curated playlists", "Professional PA / AV setup", "Live band coordination", "Announcer / emcee service"],
  },
  {
    icon: "transport", title: "Guest Transport", tag: "Coming Soon", galleryCategory: null,
    preview: null,
    desc: "Coordinated transport for out-of-town guests, bridal parties, and VIP delegates.",
    highlights: ["Bus & mini-van hire", "Airport transfers", "Bridal car decoration", "Logistics planning"],
  },
];

// ── Contact Page ──────────────────────────────────────────────
export const BUSINESS_HOURS = [
  { days: "Mon – Sat", hours: "9 AM – 7 PM" },
  { days: "Sunday",    hours: "10 AM – 4 PM" },
];

// ── Google Maps ───────────────────────────────────────────────
// Paste your Google Maps embed URL here.
// How to get it: Google Maps → search your location → Share → Embed a map → copy the src URL
export const GOOGLE_MAPS_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62555.22557108334!2d78.65437!3d10.79008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baaf50ff0000001%3A0xbe2b96f4fa77e53c!2sTiruchirappalli%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000";
