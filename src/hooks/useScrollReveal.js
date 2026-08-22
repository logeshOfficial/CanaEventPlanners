import { useEffect, useRef, useState } from "react";

/**
 * useScrollReveal — returns a [ref, isVisible] pair.
 * Attach `ref` to the element you want to animate.
 * `isVisible` flips true once the element enters the viewport.
 *
 * @param {number} threshold  — 0–1, how much of the element must be visible (default 0.15)
 * @param {string} rootMargin — optional margin around root (default "0px 0px -60px 0px")
 */
export default function useScrollReveal(threshold = 0.15, rootMargin = "0px 0px -60px 0px") {
  const ref        = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el); // fire once only
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}
