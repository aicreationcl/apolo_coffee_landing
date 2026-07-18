"use client";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { useSplitTextHeadline } from "@/components/gsap/useSplitTextHeadline";
import { useScrollReveal } from "@/components/gsap/useScrollReveal";

export function Hero() {
  const headlineRef = useSplitTextHeadline<HTMLHeadingElement>({ type: "words" });
  const bodyRef = useScrollReveal<HTMLDivElement>({ delay: 0.3 });

  return (
    <section id="hero" className="relative overflow-hidden">
      {/* TODO: reemplazar por public/images/hero-illustration-light.png y
          -dark.png (recorte manual de la ilustración detallada del cliente)
          cuando estén disponibles — hasta entonces, este SVG decorativo
          (mismo trazo que public/hero-fallback.svg, inlineado para heredar
          currentColor del tema activo) cubre el lugar sin bloquear el build. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-0 h-[520px] w-[520px] text-primary opacity-[0.07] dark:text-on-background dark:opacity-[0.1] lg:-right-10"
      >
        <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <g stroke="currentColor" strokeWidth={6} strokeLinecap="round" strokeLinejoin="round">
            <path d="M170 190 C158 173 182 162 170 145 C158 128 182 117 172 100" />
            <path d="M200 196 C188 179 212 168 200 151 C188 134 212 123 202 106" />
            <path d="M230 190 C218 173 242 162 230 145 C218 128 242 117 232 100" />
            <ellipse cx="200" cy="210" rx="70" ry="15" />
            <path d="M132 212 L146 318 C147 325 153 329 160 329 L240 329 C247 329 253 325 254 318 L268 212" />
            <path d="M267 226 C302 226 302 282 267 288" />
            <ellipse cx="200" cy="333" rx="102" ry="11" opacity="0.5" />
          </g>
        </svg>
      </div>

      <Container className="relative flex min-h-[85vh] flex-col justify-center gap-8 py-24 lg:py-32">
        <span className="label-sm text-secondary">Cafetería de especialidad — Las Condes</span>

        <h1 ref={headlineRef} className="headline-display max-w-2xl text-on-background">
          El ritual del buen café, servido con calma
        </h1>

        <div ref={bodyRef} className="flex flex-col gap-8">
          <p className="body-lg max-w-lg text-on-surface-variant">
            Granos de origen, tueste propio y un espacio pensado para disfrutar cada taza sin
            apuro. Bienvenido a Apolo Coffee.
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#menu" className={buttonVariants({ size: "lg", className: "px-6 py-5 text-base" })}>
              Ver el menú
            </a>
            <a
              href="#ubicacion"
              className={buttonVariants({ variant: "outline", size: "lg", className: "px-6 py-5 text-base" })}
            >
              Cómo llegar
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
