"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsapConfig";

interface UseScrollRevealOptions {
  y?: number;
  duration?: number;
  start?: string;
  delay?: number;
}

/**
 * Fade + slide sutil al entrar en viewport (ScrollTrigger simple, sin pin).
 * Bajo prefers-reduced-motion, el mismo tween pasa a un fade casi instantáneo.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: UseScrollRevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { y = 24, duration = 0.6, start = "top 85%", delay = 0 } = options;

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.matchMedia().add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const conditions = context.conditions as { reduce: boolean };

          gsap.fromTo(
            ref.current,
            { opacity: 0, y: conditions.reduce ? 0 : y },
            {
              opacity: 1,
              y: 0,
              duration: conditions.reduce ? 0.01 : duration,
              delay: conditions.reduce ? 0 : delay,
              ease: "power2.out",
              scrollTrigger: {
                trigger: ref.current,
                start,
                once: true,
              },
            }
          );
        }
      );
    },
    { scope: ref }
  );

  return ref;
}
