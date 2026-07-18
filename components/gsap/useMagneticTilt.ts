"use client";

import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "./gsapConfig";

interface UseMagneticTiltOptions {
  max?: number;
}

/**
 * Tilt 3D sutil + seguimiento de cursor en hover/tap (gsap.quickTo mapeando
 * pointermove a rotateX/rotateY). Los listeners solo se adjuntan bajo la
 * rama "sin reduced-motion" de gsap.matchMedia() — bajo reduced-motion, el
 * tilt queda completamente desactivado (ni siquiera se registra el listener).
 */
export function useMagneticTilt<T extends HTMLElement>(
  options: UseMagneticTiltOptions = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null);
  const { max = 10 } = options;

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;

      gsap.matchMedia().add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const conditions = context.conditions as { reduce: boolean };
          if (conditions.reduce) return;

          const rotateX = gsap.quickTo(el, "rotateX", { duration: 0.4, ease: "power3.out" });
          const rotateY = gsap.quickTo(el, "rotateY", { duration: 0.4, ease: "power3.out" });

          const handlePointerMove = (event: PointerEvent) => {
            const rect = el.getBoundingClientRect();
            const px = (event.clientX - rect.left) / rect.width - 0.5;
            const py = (event.clientY - rect.top) / rect.height - 0.5;
            rotateY(px * max);
            rotateX(-py * max);
          };

          const handlePointerLeave = () => {
            rotateX(0);
            rotateY(0);
          };

          gsap.set(el, { transformPerspective: 600, force3D: true });
          el.addEventListener("pointermove", handlePointerMove);
          el.addEventListener("pointerleave", handlePointerLeave);

          return () => {
            el.removeEventListener("pointermove", handlePointerMove);
            el.removeEventListener("pointerleave", handlePointerLeave);
          };
        }
      );
    },
    { scope: ref }
  );

  return ref;
}
