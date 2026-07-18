"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, SplitText } from "@/components/gsap/gsapConfig";
import { useReducedMotion } from "@/components/gsap/useReducedMotion";
import { Container } from "@/components/layout/Container";

const STAGES = [
  {
    id: "light",
    label: "Tueste Claro",
    title: "Floral y luminoso",
    description: "Notas florales y cítricas, acidez brillante. Ideal para métodos filtrados.",
    toneFrom: "#fcf9f8",
    toneTo: "#f4dfcb",
    chipBg: "#f4dfcb",
    chipText: "#120702",
    textColor: "#120702",
    mutedTextColor: "#4e453f",
  },
  {
    id: "medium",
    label: "Tueste Medio",
    title: "Equilibrado y dulce",
    description: "Cuerpo balanceado, dulzura a caramelo y frutos secos. El punto medio perfecto.",
    toneFrom: "#f4dfcb",
    toneTo: "#dbc2b2",
    chipBg: "#dbc2b2",
    chipText: "#120702",
    textColor: "#120702",
    mutedTextColor: "#4e453f",
  },
  {
    id: "dark",
    label: "Tueste Oscuro",
    title: "Denso y envolvente",
    description: "Cuerpo denso, notas a cacao y madera tostada. El clásico de espresso.",
    toneFrom: "#dbc2b2",
    toneTo: "#120702",
    chipBg: "#120702",
    chipText: "#f8ddcd",
    textColor: "#f8ddcd",
    mutedTextColor: "#dbc2b2",
  },
] as const;

function burstHeadline(el: HTMLElement | null) {
  if (!el) return;
  const split = new SplitText(el, { type: "chars" });
  gsap.from(split.chars, {
    opacity: 0,
    yPercent: 60,
    stagger: 0.02,
    duration: 0.5,
    ease: "power2.out",
    overwrite: true,
  });
}

export function RoastShowcase() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const stop1Ref = useRef<SVGStopElement>(null);
  const stop2Ref = useRef<SVGStopElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRefs = useRef<(HTMLHeadingElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const panels = panelRefs.current;
      const headings = headingRefs.current;

      if (reducedMotion) {
        // Defensa extra: en el primer render (SSR/hidratación) `reducedMotion`
        // puede arrancar en `false` y voltear a `true` justo después, lo que
        // dispara este efecto dos veces (dependencies:[reducedMotion]). Si el
        // primer pase alcanzó a crear el pin, hay que matarlo explícitamente
        // aquí — el revert de useGSAP no siempre alcanza a limpiar un pin
        // recién creado antes de que se re-ejecute el efecto.
        ScrollTrigger.getAll().forEach((instance) => {
          if (instance.trigger === containerRef.current) instance.kill();
        });
        // Sin ScrollTrigger: bajo reduced-motion el contenido queda visible
        // de inmediato (markup estático apilado, sin pin ni scrub). Un
        // reveal ligado a scroll aquí es innecesario y frágil (el panel
        // suele montarse ya dentro del viewport).
        panels.forEach((panel, index) => {
          if (!panel) return;
          // autoAlpha (no solo opacity) para limpiar también un posible
          // `visibility:hidden` residual dejado por la rama "full" si esta
          // corrió primero (ver defensa de ScrollTrigger.kill() arriba).
          gsap.set(panel, { autoAlpha: 1, yPercent: 0 });
          gsap.set(headings[index], { autoAlpha: 1 });
        });
        return;
      }

      // Estado inicial: solo el panel 0 (Light) visible; el fondo arranca en
      // su gradiente de tono correspondiente.
      gsap.set(panels[1], { autoAlpha: 0, yPercent: 6 });
      gsap.set(panels[2], { autoAlpha: 0, yPercent: 6 });
      gsap.set(stop1Ref.current, { attr: { "stop-color": STAGES[0].toneFrom } });
      gsap.set(stop2Ref.current, { attr: { "stop-color": STAGES[0].toneTo } });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // El chip/heading/texto de cada tueste vive DENTRO de su propio panel,
      // así que animar la opacidad del panel (autoAlpha) ya sincroniza todo
      // ese contenido (incluido el color del chip) con el crossfade.
      //
      // El fondo/tono interpola de forma lineal durante TODO el acto (0→1 y
      // 1→2), pero el crossfade de texto entre paneles se comprime a
      // ventanas cortas con una meseta ("hold") de lectura entre medio —
      // un crossfade lineal de duración completa hacía que dos bloques de
      // texto largos se superpusieran ilegibles al mismo tiempo (QA visual).
      tl.call(() => burstHeadline(headings[0]), [], 0)
        // Acto 1: Light -> Medium (tono interpola en todo el rango 0-1)
        .to(stop1Ref.current, { attr: { "stop-color": STAGES[1].toneFrom }, duration: 1, ease: "none" }, 0)
        .to(stop2Ref.current, { attr: { "stop-color": STAGES[1].toneTo }, duration: 1, ease: "none" }, 0)
        // panel0: meseta 0→0.15, sale 0.15→0.4
        .to(panels[0], { autoAlpha: 0, yPercent: -6, duration: 0.25, ease: "none" }, 0.15)
        // panel1: entra 0.45→0.7, meseta 0.7→1.3 (cruza el límite de actos)
        .to(panels[1], { autoAlpha: 1, yPercent: 0, duration: 0.25, ease: "none" }, 0.45)
        .call(() => burstHeadline(headings[1]), [], 0.45)
        // Acto 2: Medium -> Dark (tono interpola en todo el rango 1-2)
        .to(stop1Ref.current, { attr: { "stop-color": STAGES[2].toneFrom }, duration: 1, ease: "none" }, 1)
        .to(stop2Ref.current, { attr: { "stop-color": STAGES[2].toneTo }, duration: 1, ease: "none" }, 1)
        // panel1 sale 1.3→1.55; panel2 entra 1.6→1.85, meseta 1.85→2
        .to(panels[1], { autoAlpha: 0, yPercent: -6, duration: 0.25, ease: "none" }, 1.3)
        .to(panels[2], { autoAlpha: 1, yPercent: 0, duration: 0.25, ease: "none" }, 1.6)
        .call(() => burstHeadline(headings[2]), [], 1.6);
    },
    { scope: containerRef, dependencies: [reducedMotion] }
  );

  return (
    <div
      ref={containerRef}
      data-testid="roast-showcase"
      className={reducedMotion ? "relative flex flex-col gap-16 py-16" : "relative h-screen overflow-hidden"}
    >
      <svg className="absolute inset-0 -z-10 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="roast-tone-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop ref={stop1Ref} offset="0%" stopColor={STAGES[0].toneFrom} />
            <stop ref={stop2Ref} offset="100%" stopColor={STAGES[0].toneTo} />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#roast-tone-gradient)" />
      </svg>

      {STAGES.map((stage, index) => (
        <div
          key={stage.id}
          ref={(el) => {
            panelRefs.current[index] = el;
          }}
          className={reducedMotion ? "relative" : "absolute inset-0 flex items-center"}
        >
          <Container className="flex flex-col items-start gap-4">
            <span
              className="label-sm inline-flex w-fit rounded-full px-4 py-1.5"
              style={{ backgroundColor: stage.chipBg, color: stage.chipText }}
            >
              {stage.label}
            </span>
            <h3
              ref={(el) => {
                headingRefs.current[index] = el;
              }}
              className="headline-lg max-w-xl"
              style={{ color: stage.textColor }}
            >
              {stage.title}
            </h3>
            <p className="body-lg max-w-md" style={{ color: stage.mutedTextColor }}>
              {stage.description}
            </p>
          </Container>
        </div>
      ))}
    </div>
  );
}
