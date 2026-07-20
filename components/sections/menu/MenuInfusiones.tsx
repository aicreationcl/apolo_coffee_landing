"use client";

import { useMemo, useState } from "react";
import { Container } from "@/components/layout/Container";
import { useSplitTextHeadline } from "@/components/gsap/useSplitTextHeadline";
import { CategoryTabs } from "@/components/sections/menu/CategoryTabs";
import { MenuGrid } from "@/components/sections/menu/MenuGrid";
import { DownloadMenuButton } from "@/components/sections/menu/DownloadMenuButton";
import { menuCategories, menuItems } from "@/lib/menu-data";
import type { MenuCategory } from "@/types/menu";

export function MenuInfusiones() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(menuCategories[0].id);
  const headlineRef = useSplitTextHeadline<HTMLHeadingElement>({ type: "words" });

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  return (
    <section id="menu" className="bg-surface">
      <Container className="flex flex-col gap-6 py-20 lg:py-28">
        <div className="flex flex-col gap-3">
          <span className="label-sm text-secondary">Nuestra carta</span>
          <h2 ref={headlineRef} className="headline-lg text-on-background">
            Infusiones para cada momento del día
          </h2>
        </div>

        <CategoryTabs categories={menuCategories} active={activeCategory} onChange={setActiveCategory} />
        <MenuGrid items={filteredItems} />

        <div className="mt-14 flex flex-col items-center gap-6 text-center">
          <p className="body-md text-on-surface-variant">
            Todos nuestros cafés se sirven con granos frescos de tueste local.
          </p>
          <DownloadMenuButton />
        </div>
      </Container>
    </section>
  );
}
