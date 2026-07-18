"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/gsap/gsapConfig";
import { cn } from "@/lib/utils";
import type { MenuCategory } from "@/types/menu";

interface CategoryTabsProps {
  categories: { id: MenuCategory; label: string }[];
  active: MenuCategory;
  onChange: (category: MenuCategory) => void;
}

export function CategoryTabs({ categories, active, onChange }: CategoryTabsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useGSAP(
    () => {
      const activeIndex = categories.findIndex((category) => category.id === active);
      const activeButton = buttonRefs.current[activeIndex];
      if (!activeButton || !indicatorRef.current) return;

      gsap.to(indicatorRef.current, {
        x: activeButton.offsetLeft,
        width: activeButton.offsetWidth,
        duration: 0.35,
        ease: "power2.out",
      });
    },
    { scope: containerRef, dependencies: [active] }
  );

  return (
    <div ref={containerRef} className="relative flex gap-2 overflow-x-auto border-b border-outline-variant/50">
      <span
        ref={indicatorRef}
        data-testid="category-indicator"
        className="absolute bottom-0 h-[2px] bg-primary"
        style={{ width: 0 }}
      />
      {categories.map((category, index) => (
        <button
          key={category.id}
          ref={(el) => {
            buttonRefs.current[index] = el;
          }}
          type="button"
          onClick={() => onChange(category.id)}
          aria-pressed={active === category.id}
          className={cn(
            "label-sm shrink-0 px-4 py-3 transition-colors",
            active === category.id ? "text-on-background" : "text-on-surface-variant hover:text-on-background"
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}
