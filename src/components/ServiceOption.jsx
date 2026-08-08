import { useRef, useEffect, useState } from "react";

/**
 * ServiceOption — reusable accordion checkbox with animated sub-fields.
 *
 * Props:
 *  id        — unique field key (matches form state key)
 *  label     — checkbox label
 *  icon      — emoji / icon character
 *  checked   — boolean
 *  onChange  — (id, checked) => void
 *  children  — sub-fields revealed when checked
 */
export default function ServiceOption({ id, label, icon, checked, onChange, children }) {
  const contentRef = useRef(null);
  const [height, setHeight]   = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(checked ? contentRef.current.scrollHeight : 0);
    }
  }, [checked, children]);

  return (
    <div className={`rounded-xl border transition-colors ${
      checked ? "border-gold-400/60 bg-ivory-50" : "border-ivory-200 bg-white"
    }`}>
      <label className="flex items-center gap-3 px-5 py-4 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(id, e.target.checked)}
          className="w-4.5 h-4.5 accent-forest-800 cursor-pointer shrink-0"
          aria-expanded={checked}
        />
        {icon && <span className="text-xl shrink-0">{icon}</span>}
        <span className="font-heading font-medium text-[0.82rem] tracking-wide text-forest-900 flex-1">
          {label}
        </span>
        <span
          className={`text-forest-400 text-xs transition-transform duration-300 ${checked ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </label>

      <div
        className="accordion-content"
        style={{ maxHeight: `${height}px`, opacity: checked ? 1 : 0 }}
        aria-hidden={!checked}
      >
        <div ref={contentRef} className="px-5 pb-5 space-y-3 border-t border-ivory-200 pt-4">
          {children}
        </div>
      </div>
    </div>
  );
}
