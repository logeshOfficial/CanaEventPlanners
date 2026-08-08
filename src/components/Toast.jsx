import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react";

// ─────────────────────────────────────────────────────────────
//  Context
// ─────────────────────────────────────────────────────────────
const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

// ─────────────────────────────────────────────────────────────
//  Config per type
// ─────────────────────────────────────────────────────────────
const STYLES = {
  success: {
    bar:  "bg-white border-l-4 border-emerald-500",
    icon: "✅",
    title: "text-emerald-700",
    text:  "text-emerald-600",
  },
  error: {
    bar:  "bg-white border-l-4 border-red-500",
    icon: "⚠️",
    title: "text-red-700",
    text:  "text-red-600",
  },
  warning: {
    bar:  "bg-white border-l-4 border-gold-500",
    icon: "⚡",
    title: "text-gold-700",
    text:  "text-gold-600",
  },
  info: {
    bar:  "bg-white border-l-4 border-forest-600",
    icon: "ℹ️",
    title: "text-forest-800",
    text:  "text-forest-600",
  },
};

// ─────────────────────────────────────────────────────────────
//  Single toast item
// ─────────────────────────────────────────────────────────────
function ToastItem({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);
  const s = STYLES[toast.type] || STYLES.info;

  // Animate in on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => onRemove(toast.id), 350);
  }, [toast.id, onRemove]);

  // Auto-dismiss
  useEffect(() => {
    const t = setTimeout(dismiss, toast.duration || 4000);
    return () => clearTimeout(t);
  }, [dismiss, toast.duration]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`
        flex items-start gap-3 px-4 py-3.5 rounded-xl shadow-xl max-w-sm w-full
        transition-all duration-300 ease-out
        ${s.bar}
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}
      `}
      style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}
    >
      {/* Icon */}
      <span className="text-lg shrink-0 mt-0.5">{s.icon}</span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className={`font-heading font-semibold text-sm ${s.title}`}>
            {toast.title}
          </p>
        )}
        {toast.message && (
          <p className={`text-xs mt-0.5 leading-relaxed ${s.text}`}>
            {toast.message}
          </p>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={dismiss}
        className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors mt-0.5"
        aria-label="Dismiss notification"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
//  Provider — wrap around <App /> or <Layout />
// ─────────────────────────────────────────────────────────────
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const counter = useRef(0);

  const push = useCallback(({ type = "info", title, message, duration = 4000 }) => {
    const id = ++counter.current;
    setToasts((prev) => [...prev, { id, type, title, message, duration }]);
  }, []);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Convenience helpers
  const toast = {
    success: (title, message, duration) => push({ type: "success", title, message, duration }),
    error:   (title, message, duration) => push({ type: "error",   title, message, duration }),
    warning: (title, message, duration) => push({ type: "warning", title, message, duration }),
    info:    (title, message, duration) => push({ type: "info",    title, message, duration }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      {/* Portal — fixed top-right */}
      <div
        aria-label="Notifications"
        className="fixed top-20 right-4 z-[100] flex flex-col gap-2 items-end"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onRemove={remove} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}
