"use client";

import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { useStaggerReveal } from "@/components/gsap/useStaggerReveal";

const GALLERY = [
   {
    id: "tueste",
    title: "Tueste",
    caption: "Tostamos en pequeños lotes para preservar los aceites esenciales y el aroma.",
    image: "/tueste/tueste_3.jpg",
    alt: "Granos de café recién tostados en textura macro",
  },
  {
    id: "extraccion",
    title: "Extracción",
    caption: "La precisión en el vertido determina la claridad de las notas de cada grano.",
    image: "/bebidas/prensa_cafe.webp",
    alt: "Espresso recién extraído junto a una cafetera moka y un bowl de granos",
  },
  {
    id: "la-taza",
    title: "La Taza",
    caption: "El destino final de un viaje que empieza a miles de kilómetros, servido con respeto.",
    image: "/bebidas/latte_1.avif",
    alt: "Taza de café negro sobre un fondo dividido en blanco y negro",
  },
] as const;

export function Nosotros() {
  const galleryRef = useStaggerReveal<HTMLDivElement>({ stagger: 0.12, y: 32 });

  return (
    <section id="nosotros" className="bg-surface-container-low">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="headline-display text-on-background">El arte de la pausa</h2>
          <div className="h-px w-12 bg-secondary" />
        </div>

        <div ref={galleryRef} className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {GALLERY.map((item) => (
            <div key={item.id} className="flex flex-col gap-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-container">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h3 className="headline-md text-on-background">{item.title}</h3>
              <p className="body-md text-on-surface-variant">{item.caption}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
