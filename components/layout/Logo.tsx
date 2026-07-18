"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useHydrated } from "@/components/layout/useHydrated";

export function Logo({ className, iconSize = 36 }: { className?: string; iconSize?: number }) {
  const { resolvedTheme } = useTheme();
  const mounted = useHydrated();

  // El logo se selecciona según `resolvedTheme` de next-themes, nunca con un
  // filtro CSS sobre un solo archivo (regla no negociable). Antes de montar,
  // usamos la versión light por defecto para evitar parpadeo de layout.
  const src = mounted && resolvedTheme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image src={src} alt="" width={iconSize} height={iconSize} priority />
      <span className="font-heading font-bold uppercase leading-[0.95] tracking-wide text-on-background text-sm">
        Apolo
        <br />
        Coffee
      </span>
    </span>
  );
}
