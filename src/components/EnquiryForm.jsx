import { useState } from "react";
import { WHATSAPP_NUMBER } from "../config";
import { useToast } from "./Toast";
import ServiceIcon from "./ServiceIcon";

// ─────────────────────────────────────────────────────────────
//  Per-day card factory
// ─────────────────────────────────────────────────────────────
const newDay = () => ({
  id:               Date.now() + Math.random(),
  date:             "",
  time:             "",
  // Catering
  catering:         false,
  tiffin:           "",
  lunch:            "",
  dinner:           "",
  // Garlands
  garlands:         false,
  garlandsQty:      "",
  // Decoration
  decoration:       false,
  decorationTheme:  "",
});

// ─────────────────────────────────────────────────────────────
//  Top-level form state
// ─────────────────────────────────────────────────────────────
const INITIAL_STATE = {
  fullName:       "",
  eventType:      "",
  eventTypeOther: "",
  days:           [newDay()],   // starts with one day card
  notes:          "",
};

// ─────────────────────────────────────────────────────────────
//  Validation
// ─────────────────────────────────────────────────────────────
function validate(form) {
  const errors = {};
  if (!form.fullName.trim()) errors.fullName = "Name is required.";
  if (!form.eventType)       errors.eventType = "Please select an event type.";
  if (form.eventType === "other" && !form.eventTypeOther.trim())
    errors.eventTypeOther = "Please specify your event type.";

  const dayErrors = form.days.map((d) => {
    const e = {};
    if (!d.date) e.date = "Date is required.";
    return e;
  });

  // Only add dayErrors to errors object if at least one day has a problem
  const hasDayErrors = dayErrors.some((e) => Object.keys(e).length > 0);
  if (hasDayErrors) errors.days = dayErrors;

  return errors;
}

// ─────────────────────────────────────────────────────────────
//  Format date safely for WhatsApp:  2026-08-22  →  22 Aug 2026
//  Keep year away from * markers to avoid bold-parsing bugs
// ─────────────────────────────────────────────────────────────
function fmtDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun",
                  "Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${parseInt(d, 10)} ${months[parseInt(m, 10) - 1]} ${y}`;
}

// ─────────────────────────────────────────────────────────────
//  Message builder
// ─────────────────────────────────────────────────────────────
function buildMessage(form) {
  const lines = [];
  lines.push("New Enquiry from Website");
  lines.push("------------------------");
  lines.push(`Name: ${form.fullName.trim()}`);

  if (form.eventType) {
    const label = form.eventType === "other"
      ? form.eventTypeOther.trim()
      : form.eventType.charAt(0).toUpperCase() + form.eventType.slice(1);
    lines.push(`Event Type: ${label}`);
  }

  form.days.forEach((d, i) => {
    lines.push("");
    const dateLabel = fmtDate(d.date) || `Day ${i + 1}`;
    const timeLabel = d.time ? `, ${d.time}` : "";
    lines.push(`Day ${i + 1}: ${dateLabel}${timeLabel}`);

    let hasService = false;

    if (d.catering) {
      const tiffin = parseInt(d.tiffin, 10) || 0;
      const lunch  = parseInt(d.lunch,  10) || 0;
      const dinner = parseInt(d.dinner, 10) || 0;
      const parts  = [];
      if (tiffin > 0) parts.push(`  Tiffin: ${tiffin} members`);
      if (lunch  > 0) parts.push(`  Lunch: ${lunch} members`);
      if (dinner > 0) parts.push(`  Dinner: ${dinner} members`);
      if (parts.length) {
        lines.push(`Catering:`);
        parts.forEach((p) => lines.push(p));
        hasService = true;
      }
    }

    if (d.garlands) {
      const qty = parseInt(d.garlandsQty, 10) || 0;
      lines.push(`Garlands${qty > 0 ? `: ${qty}` : ""}`);
      hasService = true;
    }

    if (d.decoration) {
      lines.push(`Decoration${d.decorationTheme.trim() ? `: ${d.decorationTheme.trim()}` : ""}`);
      hasService = true;
    }

    if (!hasService) lines.push("  No services specified for this day");
  });

  if (form.notes.trim()) {
    lines.push("");
    lines.push(`Notes: ${form.notes.trim()}`);
  }

  return lines.join("\n");
}

// ─────────────────────────────────────────────────────────────
//  Shared styles
// ─────────────────────────────────────────────────────────────
const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-ivory-300 bg-white " +
  "focus:border-forest-600 focus:ring-2 focus:ring-forest-200 outline-none " +
  "text-sm text-forest-900 placeholder-forest-400/50 transition-colors";

// ─────────────────────────────────────────────────────────────
//  Reusable field wrapper
// ─────────────────────────────────────────────────────────────
function Field({ label, htmlFor, required, error, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor}
             className="font-heading font-medium text-[0.72rem] tracking-[0.08em] uppercase text-forest-700">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className={error ? "field-pulse rounded-xl" : ""}>
        {children}
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-0.5 flex items-center gap-1">
          <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Number input helper
// ─────────────────────────────────────────────────────────────
function NumInput({ id, label, value, onChange }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-heading text-[0.68rem] tracking-wide text-forest-600">{label}</label>
      <input id={id} type="number" min="0" value={value}
             onChange={(e) => onChange(e.target.value)}
             placeholder="0" className={inputCls} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Inline checkbox toggle row
// ─────────────────────────────────────────────────────────────
function Toggle({ checked, onChange, label, iconName }) {
  return (
    <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer select-none transition-colors text-sm font-heading font-medium ${
      checked
        ? "border-gold-400/60 bg-gold-50 text-forest-900"
        : "border-ivory-200 bg-white text-forest-600 hover:border-gold-300"
    }`}>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
             className="accent-forest-800 w-4 h-4 shrink-0" />
      {iconName && <ServiceIcon name={iconName} size="sm" className="w-6 h-6" />}
      <span>{label}</span>
    </label>
  );
}

// ─────────────────────────────────────────────────────────────
//  Single day card
// ─────────────────────────────────────────────────────────────
function DayCard({ day, index, total, onChange, onRemove, dateError }) {
  const upd = (field) => (val) => onChange(day.id, field, val);
  const updE = (field) => (e) => upd(field)(e.target.value);

  return (
    <div className="rounded-2xl border border-ivory-200 bg-ivory-50 overflow-hidden">
      {/* Card header */}
      <div className="flex items-center justify-between px-5 py-3 bg-forest-800">
        <span className="font-heading font-semibold text-gold-400 text-sm tracking-wide">
          Day {index + 1}{day.date ? ` — ${fmtDate(day.date)}` : ""}
        </span>
        {total > 1 && (
          <button type="button" onClick={() => onRemove(day.id)}
                  className="text-ivory-300/60 hover:text-red-400 text-xs font-heading tracking-wide transition-colors">
            ✕ Remove
          </button>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date" htmlFor={`date-${day.id}`} required error={dateError}>
            <input id={`date-${day.id}`} type="date" value={day.date}
                   onChange={updE("date")} className={inputCls}
                   min={new Date().toISOString().split("T")[0]} />
          </Field>
          <Field label="Time (optional)" htmlFor={`time-${day.id}`}>
            <input id={`time-${day.id}`} type="time" value={day.time}
                   onChange={updE("time")} className={inputCls} />
          </Field>
        </div>

        {/* Service toggles */}
        <div>
          <p className="font-heading text-[0.68rem] tracking-[0.15em] uppercase text-forest-500 mb-2">
            Services for this day
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            <Toggle checked={day.catering}   onChange={upd("catering")}   label="Catering"    iconName="catering" />
            <Toggle checked={day.garlands}   onChange={upd("garlands")}   label="Garlands"    iconName="garlands" />
            <Toggle checked={day.decoration} onChange={upd("decoration")} label="Decoration"  iconName="decoration" />
          </div>

          {/* Catering sub-fields */}
          {day.catering && (
            <div className="bg-white rounded-xl border border-ivory-200 p-3 mb-2">
              <p className="font-heading text-[0.68rem] text-forest-500 tracking-wide mb-2">
                Members per meal (0 = not required)
              </p>
              <div className="grid grid-cols-3 gap-2">
                <NumInput id={`tiffin-${day.id}`}  label="Tiffin"  value={day.tiffin}  onChange={upd("tiffin")} />
                <NumInput id={`lunch-${day.id}`}   label="Lunch"   value={day.lunch}   onChange={upd("lunch")} />
                <NumInput id={`dinner-${day.id}`}  label="Dinner"  value={day.dinner}  onChange={upd("dinner")} />
              </div>
            </div>
          )}

          {/* Garlands sub-field */}
          {day.garlands && (
            <div className="bg-white rounded-xl border border-ivory-200 p-3 mb-2">
              <NumInput id={`garlands-${day.id}`} label="How many garlands?"
                        value={day.garlandsQty} onChange={upd("garlandsQty")} />
            </div>
          )}

          {/* Decoration sub-field */}
          {day.decoration && (
            <div className="bg-white rounded-xl border border-ivory-200 p-3">
              <Field label="Decoration theme" htmlFor={`deco-${day.id}`}>
                <input id={`deco-${day.id}`} type="text"
                       value={day.decorationTheme} onChange={updE("decorationTheme")}
                       placeholder="e.g. Mehandhi theme, Marriage stage setup…"
                       className={inputCls} />
              </Field>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Main form component
// ─────────────────────────────────────────────────────────────
export default function EnquiryForm() {
  const [form,      setForm]      = useState(INITIAL_STATE);
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  // Top-level field update
  const setField = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  // Day card update: change one field on one day
  const updateDay = (id, field, value) =>
    setForm((prev) => ({
      ...prev,
      days: prev.days.map((d) => d.id === id ? { ...d, [field]: value } : d),
    }));

  // Add a new blank day card
  const addDay = () =>
    setForm((prev) => ({ ...prev, days: [...prev.days, newDay()] }));

  // Remove a day card
  const removeDay = (id) =>
    setForm((prev) => ({ ...prev, days: prev.days.filter((d) => d.id !== id) }));

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);

    const { days: dayErrs, ...topErrs } = errs;
    const hasTopErrors = Object.keys(topErrs).length > 0;
    const hasDayErrors = dayErrs && dayErrs.some((de) => Object.keys(de).length > 0);

    if (hasTopErrors || hasDayErrors) {
      setErrors(errs);

      // Count total missing fields
      const topCount = Object.keys(topErrs).length;
      const dayCount = dayErrs
        ? dayErrs.reduce((acc, de) => acc + Object.keys(de).length, 0)
        : 0;
      const total = topCount + dayCount;

      toast.error(
        "Please fill the required fields",
        `${total} required field${total > 1 ? "s are" : " is"} missing — scroll down to complete them.`
      );

      // Scroll to the first invalid field
      // Priority: top-level fields first, then day fields
      const firstTopKey = Object.keys(topErrs)[0];
      if (firstTopKey) {
        const el = document.getElementById(firstTopKey);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
          setTimeout(() => el.focus(), 400);
          return;
        }
      }

      // Find the first day with a missing date
      if (dayErrs) {
        const badDayIndex = dayErrs.findIndex((de) => Object.keys(de).length > 0);
        if (badDayIndex > -1) {
          const dayId = form.days[badDayIndex]?.id;
          const el = document.getElementById(`date-${dayId}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            setTimeout(() => el.focus(), 400);
          }
        }
      }
      return;
    }

    setErrors({});
    const message = buildMessage(form);
    const opened = window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
      "_blank", "noopener,noreferrer"
    );
    setSubmitted(true);

    if (opened) {
      toast.success(
        "Enquiry sent!",
        "WhatsApp has opened with your pre-filled message. Please hit Send to confirm."
      );
    } else {
      toast.warning(
        "Pop-up blocked",
        "Your browser blocked WhatsApp. Click the retry link below the form."
      );
    }
  };

  const dayErrors = errors.days || [];

  return (
    <form onSubmit={handleSubmit} noValidate
          className="bg-white rounded-2xl p-5 sm:p-8 space-y-8"
          style={{ boxShadow: "var(--shadow-card-hover)" }}
          aria-label="Event enquiry form">

      {/* ── ① Basic Details ───────────────────────────────── */}
      <fieldset>
        <legend className="flex items-center gap-3 mb-5">
          <span className="font-heading font-bold text-[0.65rem] tracking-[0.2em] uppercase text-gold-600 bg-gold-50 border border-gold-200 px-2.5 py-1 rounded-full">Step 1</span>
          <span className="font-display text-lg text-forest-900 font-semibold">Basic Details</span>
        </legend>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name" htmlFor="fullName" required error={errors.fullName}>
            <input id="fullName" type="text" value={form.fullName}
                   onChange={setField("fullName")}
                   placeholder="Your full name"
                   className={inputCls} autoComplete="name" />
          </Field>

          <Field label="Type of Event" htmlFor="eventType" required error={errors.eventType}>
            <select id="eventType" value={form.eventType}
                    onChange={setField("eventType")} className={inputCls}>
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
              <Field label="Please specify" htmlFor="eventTypeOther" required error={errors.eventTypeOther}>
                <input id="eventTypeOther" type="text" value={form.eventTypeOther}
                       onChange={setField("eventTypeOther")}
                       placeholder="e.g. Baby shower, Farewell party…"
                       className={inputCls} />
              </Field>
            </div>
          )}
        </div>
      </fieldset>

      <div className="h-px bg-ivory-200" />

      {/* ── ② Event Days ──────────────────────────────────── */}
      <fieldset>
        <legend className="flex items-center gap-3 mb-2">
          <span className="font-heading font-bold text-[0.65rem] tracking-[0.2em] uppercase text-gold-600 bg-gold-50 border border-gold-200 px-2.5 py-1 rounded-full">Step 2</span>
          <span className="font-display text-lg text-forest-900 font-semibold">Event Days & Services</span>
        </legend>
        <p className="text-forest-500/70 text-xs font-heading tracking-wide mb-4">
          Add one card per day. Each day can have its own catering counts, garlands, and decoration theme.
        </p>

        <div className="space-y-4">
          {form.days.map((day, i) => (
            <DayCard
              key={day.id}
              day={day}
              index={i}
              total={form.days.length}
              onChange={updateDay}
              onRemove={removeDay}
              dateError={dayErrors[i]?.date}
            />
          ))}
        </div>

        {/* Add day button */}
        <button
          type="button"
          onClick={addDay}
          className="mt-4 w-full py-2.5 rounded-xl border-2 border-dashed border-gold-300 hover:border-gold-500 text-gold-600 hover:text-gold-700 font-heading font-semibold text-sm tracking-wide transition-colors"
        >
          + Add Another Day
        </button>
      </fieldset>

      <div className="h-px bg-ivory-200" />

      {/* ── ③ Notes ───────────────────────────────────────── */}
      <fieldset>
        <legend className="flex items-center gap-3 mb-4">
          <span className="font-heading font-bold text-[0.65rem] tracking-[0.2em] uppercase text-gold-600 bg-gold-50 border border-gold-200 px-2.5 py-1 rounded-full">Step 3</span>
          <span className="font-display text-lg text-forest-900 font-semibold">Additional Notes</span>
        </legend>
        <textarea
          id="notes" value={form.notes}
          onChange={setField("notes")}
          rows={3}
          placeholder="Any special requests, setup timings, dietary requirements…"
          className={inputCls + " resize-none"}
        />
      </fieldset>

      {/* Retry link — shown only if popup was blocked */}
      {submitted && (
        <p className="text-center text-xs text-forest-600/70">
          WhatsApp didn't open?{" "}
          <button type="button"
                  onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(form))}`, "_blank")}
                  className="underline font-semibold text-forest-800 hover:text-gold-600 transition-colors">
            Click here to retry
          </button>
        </p>
      )}

      {/* Submit */}
      <button type="submit"
              className="w-full py-4 font-heading font-semibold tracking-[0.12em] uppercase text-sm bg-forest-800 hover:bg-forest-700 text-ivory-50 rounded-full transition-all flex items-center justify-center gap-3 shadow-md">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
             className="w-5 h-5 text-[#25D366]" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L0 24l6.335-1.507A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.017-1.376l-.36-.214-3.73.888.939-3.638-.235-.374A9.818 9.818 0 1112 21.818z"/>
        </svg>
        Send Enquiry on WhatsApp
      </button>

      <p className="text-center font-heading text-[0.65rem] tracking-wide text-forest-500/50">
        Your information is only used to respond to your enquiry.
      </p>
    </form>
  );
}
