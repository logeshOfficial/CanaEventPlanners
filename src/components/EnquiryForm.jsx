import { useState } from "react";
import { WHATSAPP_NUMBER } from "../config";
import ServiceOption from "./ServiceOption";

// ─────────────────────────────────────────────────────────────
//  Initial form state — single object (Phase 2: POST this to API)
// ─────────────────────────────────────────────────────────────
const INITIAL_STATE = {
  fullName:        "",
  eventDate:       "",
  eventTime:       "",
  eventType:       "",
  eventTypeOther:  "",

  serviceCatering:   false,
  serviceGarlands:   false,
  serviceDecoration: false,

  cateringTiffin: "",
  cateringLunch:  "",
  cateringDinner: "",

  garlandsQty:    "",

  decorationType: "",

  notes: "",
};

// ─────────────────────────────────────────────────────────────
//  Validation — pure function (reusable server-side in Phase 2)
// ─────────────────────────────────────────────────────────────
function validate(form) {
  const errors = {};
  if (!form.fullName.trim())  errors.fullName  = "Name is required.";
  if (!form.eventDate)        errors.eventDate  = "Event date is required.";
  if (!form.eventTime)        errors.eventTime  = "Event time is required.";
  if (!form.eventType)        errors.eventType  = "Please select an event type.";
  if (form.eventType === "other" && !form.eventTypeOther.trim())
    errors.eventTypeOther = "Please specify your event type.";
  return errors;
}

// ─────────────────────────────────────────────────────────────
//  Message builder — only includes filled / non-zero fields
// ─────────────────────────────────────────────────────────────
function buildMessage(form) {
  const lines = [];

  lines.push("*New Enquiry from Website*");
  lines.push("");
  lines.push(`Name: ${form.fullName.trim()}`);
  if (form.eventDate) {
    const dateStr = form.eventTime
      ? `${form.eventDate} at ${form.eventTime}`
      : form.eventDate;
    lines.push(`Event Date: ${dateStr}`);
  }
  if (form.eventType) {
    const label =
      form.eventType === "other"
        ? form.eventTypeOther.trim()
        : form.eventType.charAt(0).toUpperCase() + form.eventType.slice(1);
    lines.push(`Event Type: ${label}`);
  }

  const serviceLines = [];

  if (form.serviceCatering) {
    const tiffin = parseInt(form.cateringTiffin, 10) || 0;
    const lunch  = parseInt(form.cateringLunch,  10) || 0;
    const dinner = parseInt(form.cateringDinner, 10) || 0;
    const parts  = [];
    if (tiffin > 0) parts.push(`  Tiffin: ${tiffin} members`);
    if (lunch  > 0) parts.push(`  Lunch: ${lunch} members`);
    if (dinner > 0) parts.push(`  Dinner: ${dinner} members`);
    serviceLines.push(`- Catering:${parts.length ? "\n" + parts.join("\n") : ""}`);
  }

  if (form.serviceGarlands) {
    const qty = parseInt(form.garlandsQty, 10) || 0;
    serviceLines.push(`- Garlands${qty > 0 ? `: ${qty}` : ""}`);
  }

  if (form.serviceDecoration) {
    const type = form.decorationType.trim();
    serviceLines.push(`- Decoration${type ? `: ${type}` : ""}`);
  }

  if (serviceLines.length > 0) {
    lines.push("");
    lines.push("*Services Requested:*");
    serviceLines.forEach((l) => lines.push(l));
  }

  if (form.notes.trim()) {
    lines.push("");
    lines.push(`Additional Notes: ${form.notes.trim()}`);
  }

  return lines.join("\n");
}

// ─────────────────────────────────────────────────────────────
//  Shared input class
// ─────────────────────────────────────────────────────────────
const inputCls =
  "w-full px-4 py-3 rounded-xl border border-ivory-300 bg-white " +
  "focus:border-forest-600 focus:ring-2 focus:ring-forest-200 outline-none " +
  "text-sm text-forest-900 placeholder-forest-400/50 transition-colors font-body";

// ─────────────────────────────────────────────────────────────
//  Field wrapper
// ─────────────────────────────────────────────────────────────
function Field({ label, htmlFor, required, error, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor}
             className="font-heading font-medium text-[0.75rem] tracking-[0.08em] uppercase text-forest-700">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs flex items-center gap-1 mt-0.5">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Number sub-field helper
// ─────────────────────────────────────────────────────────────
function NumberField({ id, label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id}
             className="font-heading font-medium text-[0.7rem] tracking-wide text-forest-600">
        {label}
      </label>
      <input
        id={id}
        type="number"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0"
        className={inputCls}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main component
// ─────────────────────────────────────────────────────────────
export default function EnquiryForm() {
  const [form,      setForm]      = useState(INITIAL_STATE);
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);

  const set = (field) => (val) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handle = (field) => (e) => set(field)(e.target.value);

  const handleCheck = (id, checked) =>
    setForm((prev) => ({ ...prev, [id]: checked }));

  // ── Submit handler — isolated for Phase 2 API replacement ──
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstId = Object.keys(errs)[0];
      document.getElementById(firstId)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setErrors({});

    const message = buildMessage(form);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl p-7 sm:p-10 space-y-10"
      style={{ boxShadow: "var(--shadow-card-hover)" }}
      aria-label="Event enquiry form"
    >
      {/* ── ① Basic Details ─────────────────────────────────── */}
      <fieldset>
        <legend className="flex items-center gap-3 mb-6">
          <span className="font-heading font-bold text-[0.68rem] tracking-[0.2em] uppercase text-gold-600 bg-gold-50 border border-gold-200 px-2.5 py-1 rounded-full">
            Step 1
          </span>
          <span className="font-display text-xl text-forest-900 font-semibold">Basic Details</span>
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Full Name" htmlFor="fullName" required error={errors.fullName}>
            <input id="fullName" type="text" value={form.fullName}
                   onChange={handle("fullName")}
                   placeholder="Your full name"
                   className={inputCls} autoComplete="name" />
          </Field>

          <Field label="Event Date" htmlFor="eventDate" required error={errors.eventDate}>
            <input id="eventDate" type="date" value={form.eventDate}
                   onChange={handle("eventDate")}
                   className={inputCls}
                   min={new Date().toISOString().split("T")[0]} />
          </Field>

          <Field label="Preferred Time" htmlFor="eventTime" required error={errors.eventTime}>
            <input id="eventTime" type="time" value={form.eventTime}
                   onChange={handle("eventTime")}
                   className={inputCls} />
          </Field>

          <Field label="Type of Event" htmlFor="eventType" required error={errors.eventType}>
            <select id="eventType" value={form.eventType}
                    onChange={handle("eventType")} className={inputCls}>
              <option value="">Select event type…</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday Party</option>
              <option value="corporate">Corporate Event</option>
              <option value="housewarming">Housewarming</option>
              <option value="engagement">Engagement</option>
              <option value="other">Other</option>
            </select>
          </Field>

          {form.eventType === "other" && (
            <div className="sm:col-span-2">
              <Field label="Please specify" htmlFor="eventTypeOther"
                     required error={errors.eventTypeOther}>
                <input id="eventTypeOther" type="text"
                       value={form.eventTypeOther}
                       onChange={handle("eventTypeOther")}
                       placeholder="e.g. Baby shower, Farewell party…"
                       className={inputCls} />
              </Field>
            </div>
          )}
        </div>
      </fieldset>

      {/* Divider */}
      <div className="h-px bg-ivory-200" />

      {/* ── ② Services ──────────────────────────────────────── */}
      <fieldset>
        <legend className="flex items-center gap-3 mb-3">
          <span className="font-heading font-bold text-[0.68rem] tracking-[0.2em] uppercase text-gold-600 bg-gold-50 border border-gold-200 px-2.5 py-1 rounded-full">
            Step 2
          </span>
          <span className="font-display text-xl text-forest-900 font-semibold">Services Required</span>
        </legend>
        <p className="text-forest-600/60 text-xs mb-4 font-heading tracking-wide">
          Check a service to reveal its options.
        </p>

        <div className="space-y-3">
          {/* ─ Catering ─ */}
          <ServiceOption id="serviceCatering" label="Catering" icon="🍽️"
                         checked={form.serviceCatering} onChange={handleCheck}>
            <p className="text-xs text-forest-600/60 font-heading tracking-wide mb-2">
              Enter expected number of members (leave at 0 to omit).
            </p>
            <div className="grid grid-cols-3 gap-3">
              <NumberField id="cateringTiffin" label="Tiffin / Breakfast"
                           value={form.cateringTiffin} onChange={set("cateringTiffin")} />
              <NumberField id="cateringLunch"  label="Lunch"
                           value={form.cateringLunch}  onChange={set("cateringLunch")} />
              <NumberField id="cateringDinner" label="Dinner"
                           value={form.cateringDinner} onChange={set("cateringDinner")} />
            </div>
          </ServiceOption>

          {/* ─ Garlands ─ */}
          <ServiceOption id="serviceGarlands" label="Garlands" icon="💐"
                         checked={form.serviceGarlands} onChange={handleCheck}>
            <NumberField id="garlandsQty" label="How many garlands?"
                         value={form.garlandsQty} onChange={set("garlandsQty")} />
          </ServiceOption>

          {/* ─ Decoration ─ */}
          <ServiceOption id="serviceDecoration" label="Decoration" icon="🌸"
                         checked={form.serviceDecoration} onChange={handleCheck}>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="decorationType"
                     className="font-heading font-medium text-[0.7rem] tracking-wide text-forest-600">
                Type of decoration / event theme
              </label>
              <input id="decorationType" type="text"
                     value={form.decorationType}
                     onChange={handle("decorationType")}
                     placeholder="e.g. Stage decoration for wedding reception"
                     className={inputCls} />
            </div>
          </ServiceOption>

          {/*
            ══════════════════════════════════════════════════
            ADD NEW SERVICES HERE — one ServiceOption block.
            Also add its flag to INITIAL_STATE above.

            <ServiceOption
              id="servicePhotography"
              label="Photography"
              icon="📸"
              checked={form.servicePhotography}
              onChange={handleCheck}
            >
              ... sub-fields ...
            </ServiceOption>
            ══════════════════════════════════════════════════
          */}
        </div>
      </fieldset>

      {/* Divider */}
      <div className="h-px bg-ivory-200" />

      {/* ── ③ Additional notes ──────────────────────────────── */}
      <fieldset>
        <legend className="flex items-center gap-3 mb-5">
          <span className="font-heading font-bold text-[0.68rem] tracking-[0.2em] uppercase text-gold-600 bg-gold-50 border border-gold-200 px-2.5 py-1 rounded-full">
            Step 3
          </span>
          <span className="font-display text-xl text-forest-900 font-semibold">Additional Notes</span>
        </legend>
        <textarea
          id="notes"
          value={form.notes}
          onChange={handle("notes")}
          rows={4}
          placeholder="Any other requirements, special requests, or messages for us…"
          className={inputCls + " resize-none"}
        />
      </fieldset>

      {/* Confirmation banner */}
      {submitted && (
        <div role="status"
             className="flex items-start gap-3 p-5 bg-forest-50 border border-forest-200 rounded-xl text-forest-800">
          <span className="text-xl shrink-0">✅</span>
          <div>
            <p className="font-heading font-semibold text-sm tracking-wide">
              Redirecting you to WhatsApp to confirm your enquiry…
            </p>
            <p className="text-xs mt-1 text-forest-700/70">
              A pre-filled message should have opened in a new tab. If it didn't,{" "}
              <button
                type="button"
                onClick={() => {
                  const msg = buildMessage(form);
                  window.open(
                    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
                    "_blank", "noopener,noreferrer"
                  );
                }}
                className="underline font-medium hover:text-forest-900"
              >
                click here to open WhatsApp
              </button>
              .
            </p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-4 font-heading font-semibold tracking-[0.12em] uppercase text-sm bg-forest-800 hover:bg-forest-700 text-ivory-50 rounded-full transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
             className="w-5 h-5 text-[#25D366]" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.335-1.507A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.376l-.36-.214-3.73.888.939-3.638-.235-.374A9.818 9.818 0 1112 21.818z" />
        </svg>
        Send Enquiry on WhatsApp
      </button>

      <p className="text-center font-heading text-[0.68rem] tracking-wide text-forest-500/60">
        Your information is only used to respond to your enquiry. We never share it with third parties.
      </p>
    </form>
  );
}
