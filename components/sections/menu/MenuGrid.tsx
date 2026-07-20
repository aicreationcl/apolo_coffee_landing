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
      className="flex flex-col py-10 lg:grid lg:grid-cols-2 lg:gap-x-16"
    >
      {items.map((item) => (
        <MenuCard key={item.id} item={item} />
      ))}
    </div>
  );
}
