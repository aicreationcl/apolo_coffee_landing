"use client";

import type { MouseEvent } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/components/layout/useHydrated";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();

  function handleToggle(event: MouseEvent<HTMLButtonElement>) {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    const { clientX: x, clientY: y } = event;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      setTheme(next);
      return;
    }

    // Mismo patrón que portafolio_next/ThemeToggle.tsx: revela el tema nuevo
    // con un círculo que crece desde el punto exacto del click, vía View
    // Transitions API + Web Animations API sobre el pseudo-elemento nuevo.
    const transition = document.startViewTransition(() => setTheme(next));
    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`],
        },
        {
          duration: 550,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={mounted && resolvedTheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      onClick={handleToggle}
      className="text-on-background hover:bg-surface-container"
    >
      {mounted && resolvedTheme === "dark" ? (
        <Sun className="size-[18px]" strokeWidth={1.75} />
      ) : (
        <Moon className="size-[18px]" strokeWidth={1.75} />
      )}
    </Button>
  );
}
