"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/components/layout/useHydrated";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useHydrated();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label={mounted && resolvedTheme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
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
