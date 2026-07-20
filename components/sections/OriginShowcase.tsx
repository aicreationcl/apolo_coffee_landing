"use client";

import { useRef } from "react";
import Image from "next/image";
import { Leaf } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/components/gsap/gsapConfig";
import { useReducedMotion } from "@/components/gsap/useReducedMotion";
import { Container } from "@/components/layout/Container";

export function OriginShowcase() {
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !imageRef.current) return;

      if (reducedMotion) {
        // Defensa extra: en el primer render (SSR/hidratación) `reducedMotion`
        // puede arrancar en `false` y voltear a `true` justo después, lo que
        // dispara este efecto dos veces (dependencies:[reducedMotion]). Si el
        // primer pase alcanzó a crear el ScrollTrigger de scrub, hay que
        // matarlo explícitamente aquí — el revert de useGSAP no siempre
        // alcanza a limpiarlo antes de que se re-ejecute el efecto, y su
        // scrub seguiría moviendo la imagen en cada scroll.
        ScrollTrigger.getAll().forEach((instance) => {
          if (instance.trigger === sectionRef.current) instance.kill();
        });
        return;
      }

      // Paralaje simple: la foto se desplaza más lento que el scroll,
      // sin pin ni crossfade — una sola capa, un solo tween.
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: sectionRef, dependencies: [reducedMotion] }
  );

  return (
    <div ref={sectionRef} className="bg-surface">
      <Container className="grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-5">
          <span className="label-sm text-secondary">Selección anual</span>
          <h2 className="headline-lg mt-4 text-on-background">Granos seleccionados a mano.</h2>
          <p className="body-lg mt-6 text-on-surface-variant">
            Cada grano que llega a nuestro tostador pasa por un proceso de selección riguroso.
            Trabajamos directamente con fincas de origen para asegurar la trazabilidad y la
            excelencia en cada lote.
          </p>
          <div className="mt-8 flex items-center gap-4 text-on-background">
            <Leaf className="size-8 shrink-0" strokeWidth={1.5} />
            <div>
              <p className="label-sm">Producción</p>
              <p className="body-md text-on-surface-variant">100% sostenible y ética</p>
            </div>
          </div>
        </div>

        <div className="relative h-[420px] overflow-hidden rounded-lg lg:col-span-7 lg:h-[600px]">
          <div ref={imageRef} data-testid="origin-showcase-image" className="absolute inset-0 h-[130%] -top-[15%]">
            <Image
              src="/grano/cafe_bain.jpg"
              alt="Granos de café recién tostados en un bowl de madera"
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
