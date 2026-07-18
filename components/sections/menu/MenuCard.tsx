"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/gsap/gsapConfig";
import { useMagneticTilt } from "@/components/gsap/useMagneticTilt";
import type { MenuItem, RoastLevel } from "@/types/menu";

const ROAST_LABEL: Record<RoastLevel, string> = {
  light: "Claro",
  medium: "Medio",
  dark: "Oscuro",
};

const ROAST_CHIP_STYLE: Record<RoastLevel, { background: string; color: string }> = {
  light: { background: "#f4dfcb", color: "#120702" },
  medium: { background: "#dbc2b2", color: "#120702" },
  dark: { background: "#120702", color: "#f8ddcd" },
};

const priceFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function MenuCard({ item }: { item: MenuItem }) {
  const tiltRef = useMagneticTilt<HTMLDivElement>({ max: 6 });
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!imageRef.current) return;

      gsap.matchMedia().add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const conditions = context.conditions as { reduce: boolean };

          gsap.fromTo(
            imageRef.current,
            {
              clipPath: conditions.reduce ? "inset(0% 0% 0% 0%)" : "inset(0% 0% 100% 0%)",
              opacity: conditions.reduce ? 0 : 1,
            },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: conditions.reduce ? 0.01 : 0.8,
              ease: "power3.out",
              scrollTrigger: { trigger: imageRef.current, start: "top 90%", once: true },
            }
          );
        }
      );
    },
    { scope: imageRef }
  );

  return (
    <div
      ref={tiltRef}
      className="flex flex-col overflow-hidden rounded-lg border border-outline-variant bg-surface"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        ref={imageRef}
        className="relative flex h-40 items-end justify-end p-3"
        style={{
          background:
            item.roastLevel === "dark"
              ? "linear-gradient(135deg, #2c1e14, #120702)"
              : item.roastLevel === "medium"
                ? "linear-gradient(135deg, #dbc2b2, #6b5c4c)"
                : "linear-gradient(135deg, #f8ddcd, #f4dfcb)",
        }}
      >
        {/* TODO: reemplazar por next/image con fotografía real del producto */}
        {item.roastLevel && (
          <span
            className="label-sm rounded-full px-3 py-1"
            style={ROAST_CHIP_STYLE[item.roastLevel]}
          >
            {ROAST_LABEL[item.roastLevel]}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-start justify-between gap-3">
          <h4 className="headline-md text-on-background">{item.name}</h4>
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="label-sm shrink-0 rounded-full bg-secondary-container px-2.5 py-1 text-on-secondary-container"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="body-md flex-1 text-on-surface-variant">{item.description}</p>
        <p className="body-lg font-medium text-on-background">{priceFormatter.format(item.price)}</p>
      </div>
    </div>
  );
}
