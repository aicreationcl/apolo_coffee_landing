"use client";

import { useStaggerReveal } from "@/components/gsap/useStaggerReveal";
import { MenuCard } from "@/components/sections/menu/MenuCard";
import type { MenuItem } from "@/types/menu";

export function MenuGrid({ items }: { items: MenuItem[] }) {
  const gridRef = useStaggerReveal<HTMLDivElement>({ stagger: 0.08 });

  return (
    <div
      ref={gridRef}
      key={items.map((item) => item.id).join("-")}
      className="grid grid-cols-1 gap-6 py-10 sm:grid-cols-2 lg:grid-cols-3"
    >
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}
