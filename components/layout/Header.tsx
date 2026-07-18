"use client";

import { useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/components/gsap/gsapConfig";
import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#menu", label: "Menú" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#ubicacion", label: "Ubicación" },
  { href: "#contacto", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!panelRef.current) return;

      gsap.matchMedia().add(
        {
          reduce: "(prefers-reduced-motion: reduce)",
          full: "(prefers-reduced-motion: no-preference)",
        },
        (context) => {
          const conditions = context.conditions as { reduce: boolean };
          const duration = conditions.reduce ? 0.01 : 0.35;

          if (open) {
            gsap.fromTo(
              panelRef.current,
              { height: 0, opacity: 0 },
              { height: "auto", opacity: 1, duration, ease: "power2.out" }
            );
          } else {
            gsap.to(panelRef.current, { height: 0, opacity: 0, duration, ease: "power2.in" });
          }
        }
      );
    },
    { scope: panelRef, dependencies: [open] }
  );

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant/50 bg-background/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between lg:h-20">
        <a href="#hero" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden flex-1 items-center justify-center gap-10 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-sm text-on-surface-variant transition-colors hover:text-on-background"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-on-background hover:bg-surface-container lg:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
          </Button>
        </div>
      </Container>

      <div ref={panelRef} className="overflow-hidden lg:hidden" style={{ height: 0, opacity: 0 }}>
        <Container className="flex flex-col gap-1 pb-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="label-sm border-b border-outline-variant/30 py-3 text-on-surface-variant"
            >
              {link.label}
            </a>
          ))}
        </Container>
      </div>
    </header>
  );
}
