"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsapConfig";

interface UseStaggerRevealOptions {
  selector?: string;
  stagger?: number;
  y?: number;
  start?: string;
}

/**
 * Anima los hijos de un contenedor en cascada (stagger 60-100ms) al entrar
 * en viewport. Bajo prefers-reduced-motion, el stagger colapsa a 0.
 */
export function useStaggerReveal<T extends HTMLElement>(
  options: UseStaggerRevealOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { selector = ":scope > *", stagger = 0.08, y = 20, start = "top 85%" } = options;

  useGSAP(
    () => {
      if (!ref.current) return;
      const children = ref.current.querySelectorAll(selector);
      if (!children.length) return;

      gsap.matchMedia().add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const conditions = context.conditions as { reduce: boolean };

          gsap.from(children, {
            opacity: 0,
            y: conditions.reduce ? 0 : y,
            duration: conditions.reduce ? 0.01 : 0.6,
            stagger: conditions.reduce ? 0 : stagger,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start,
              once: true,
            },
          });
        }
      );
    },
    { scope: ref }
  );

  return ref;
}
