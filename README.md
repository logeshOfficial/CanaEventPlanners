# Cana Event Planners — Website

A responsive marketing website for an event management company. Built with **React + Vite + Tailwind CSS v4**.

---

## Quick Start

```bash
npm install
npm run dev       # development server → http://localhost:5173
npm run build     # production build  → dist/
npm run preview   # preview production build locally
```

---

## Before Going Live — Things to Update

### 1. WhatsApp Number (`src/config.js`)

```js
export const WHATSAPP_NUMBER = "919199999XXXXX"; // ← Replace with real number
```

Use the format: country code + number, digits only, no `+` or spaces.  
Example for `+91 98765 43210`: `"919876543210"`

### 2. Business Details (`src/config.js`)

Update all the constants:

| Constant | What it controls |
|---|---|
| `BUSINESS_NAME` | Site-wide name in nav, footer, SEO |
| `BUSINESS_TAGLINE` | Hero headline |
| `BUSINESS_ADDRESS` | Footer + Contact page |
| `BUSINESS_PHONE` | Footer + Contact page (display) |
| `BUSINESS_EMAIL` | Footer + Contact page |
| `SOCIAL_LINKS` | Footer social icons (leave empty to hide) |
| `ESTABLISHED_YEAR` | Calculates "X years of experience" automatically |

### 3. Replace Placeholder Images

Search for `placeholder` in the codebase to find all placeholder images:

- **Home page** (`src/pages/Home.jsx`) — hero background, intro section image
- **About page** (`src/pages/About.jsx`) — team photo, team member portraits
- **Gallery page** (`src/pages/Gallery.jsx`) — all 12 gallery images

Replace `src="https://images.unsplash.com/..."` with paths to your real photos.  
Put your images in the `public/images/` folder and reference as `/images/your-photo.jpg`.

### 4. Update `index.html` Meta Description

```html
<meta name="description" content="Your real SEO description here" />
<title>Your Business Name — Tagline</title>
```

---

## Deployment

### AWS Amplify Hosting (recommended)

1. Push the repo to GitHub / CodeCommit.
2. Open [AWS Amplify Console](https://console.aws.amazon.com/amplify/).
3. Connect your repository.
4. Amplify auto-detects Vite. Confirm build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. Deploy. Amplify handles SSL and CDN automatically.

### S3 + CloudFront

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
```

Then invalidate the CloudFront distribution:
```bash
aws cloudfront create-invalidation --distribution-id YOURID --paths "/*"
```

Enable **static website hosting** on the S3 bucket and set the index/error documents to `index.html` (required for client-side routing).

---

## Project Structure

```
src/
  config.js              ← All editable constants (WhatsApp, address, socials)
  main.jsx               ← Entry point
  App.jsx                ← Router
  index.css              ← Tailwind + theme tokens + Google Fonts
  components/
    Layout.jsx           ← Wraps all pages (Navbar + Footer + FAB)
    Navbar.jsx           ← Sticky responsive navigation
    Footer.jsx           ← Links, contact, social icons
    WhatsAppFAB.jsx      ← Floating WhatsApp button (all pages)
    SectionHeading.jsx   ← Reusable section title with gold divider
    EnquiryForm.jsx      ← Main enquiry form + WhatsApp message builder
    ServiceOption.jsx    ← Reusable accordion checkbox + sub-fields
  pages/
    Home.jsx             ← Hero, services highlights, testimonials, CTAs
    About.jsx            ← Company story, values, team
    Services.jsx         ← Full services grid with details
    Gallery.jsx          ← Filterable image grid with lightbox
    Contact.jsx          ← EnquiryForm + contact sidebar
```

---

## Adding New Services to the Enquiry Form

The `ServiceOption` component makes this a one-liner. In `EnquiryForm.jsx`:

1. Add the flag to `INITIAL_STATE`:
   ```js
   servicePhotography: false,
   photographyStyle: "",
   ```

2. Add the `<ServiceOption>` block (copy any existing one as a template):
   ```jsx
   <ServiceOption
     id="servicePhotography"
     label="Photography"
     icon="📸"
     checked={form.servicePhotography}
     onChange={handleCheck}
   >
     <input ... value={form.photographyStyle} ... />
   </ServiceOption>
   ```

3. Add the field to `buildMessage()` following the same pattern as the others.

---

## Phase 2 Preparation

The form is structured for easy Phase 2 (backend) integration:

- **Single state object** (`INITIAL_STATE` / `form`) — POST this directly to an API endpoint.
- **`handleSubmit` is isolated** — replace the `window.open(...)` call with an `axios.post()` or `fetch()`.
- **Validation is a pure function** (`validate(form)`) — reuse on the server too.

---

## Tech Stack

- [React 19](https://react.dev/)
- [Vite 8](https://vite.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router v7](https://reactrouter.com/)
- Google Fonts: Playfair Display + Inter
