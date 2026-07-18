"use client";

import { Container } from "@/components/layout/Container";
import { useScrollReveal } from "@/components/gsap/useScrollReveal";

export function Nosotros() {
  const imageRef = useScrollReveal<HTMLDivElement>({ y: 32 });
  const textRef = useScrollReveal<HTMLDivElement>({ y: 32, delay: 0.15 });

  return (
    <section id="nosotros" className="bg-surface-container-low">
      <Container className="grid grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        {/* TODO: reemplazar por next/image con fotografía real del local/equipo */}
        <div
          ref={imageRef}
          className="h-72 rounded-lg lg:h-[420px]"
          style={{ background: "linear-gradient(135deg, #f4dfcb, #dbc2b2)" }}
        />

        <div ref={textRef} className="flex flex-col gap-5">
          <span className="label-sm text-secondary">Nuestra historia</span>
          <h2 className="headline-lg text-on-background">
            Café con oficio, servido sin apuro
          </h2>
          <p className="body-lg text-on-surface-variant">
            Apolo Coffee nació de la obsesión por encontrar el punto exacto entre origen, tueste y
            extracción. Trabajamos con productores que cuidan cada etapa del proceso y tostamos en
            pequeños lotes para que cada taza llegue en su mejor momento.
          </p>
          <p className="body-md text-on-surface-variant">
            Más que una cafetería, un espacio para pausar el día: mesas de madera, luz natural y un
            equipo que conoce el nombre de cada grano que sirve.
          </p>
        </div>
      </Container>
    </section>
  );
}
