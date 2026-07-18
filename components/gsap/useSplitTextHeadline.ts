"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, SplitText } from "./gsapConfig";

interface UseSplitTextHeadlineOptions {
  type?: "chars" | "words" | "chars,words";
  stagger?: number;
  start?: string;
  triggerRef?: RefObject<HTMLElement | null>;
}

/**
 * Anima un titular carácter/palabra por palabra con SplitText + stagger y
 * un leve blur-to-focus. Bajo prefers-reduced-motion se omite SplitText por
 * completo (el texto queda intacto, sin animar) por accesibilidad.
 */
export function useSplitTextHeadline<T extends HTMLElement>(
  options: UseSplitTextHeadlineOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { type = "chars", stagger = 0.02, start = "top 85%", triggerRef } = options;

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
          if (conditions.reduce) {
            gsap.set(ref.current, { opacity: 1 });
            return;
          }

          const split = new SplitText(ref.current, {
            type,
            autoSplit: true,
            onSplit: (self) => {
              const targets = self.chars.length ? self.chars : self.words;
              return gsap.from(targets, {
                opacity: 0,
                yPercent: 100,
                filter: "blur(6px)",
                stagger,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: triggerRef?.current ?? ref.current,
                  start,
                  once: true,
                },
              });
            },
          });

          return () => split.revert();
        }
      );
    },
    { scope: ref, dependencies: [type] }
  );

  return ref;
}
