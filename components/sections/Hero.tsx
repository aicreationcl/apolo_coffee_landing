"use client";

import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { useSplitTextHeadline } from "@/components/gsap/useSplitTextHeadline";
import { useScrollReveal } from "@/components/gsap/useScrollReveal";

export function Hero() {
  const headlineRef = useSplitTextHeadline<HTMLHeadingElement>({ type: "words" });
  const bodyRef = useScrollReveal<HTMLDivElement>({ delay: 0.3 });

  return (
    <section id="hero" className="grid grid-cols-1 md:grid-cols-2">
      <div className="flex min-h-[50vh] flex-col justify-center gap-8 px-5 py-16 lg:min-h-[85vh] lg:px-16 lg:py-24">
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
      </div>

      <div className="relative min-h-[50vh] overflow-hidden lg:min-h-[85vh]">
        <Image
          src="/hero/aerial-view-cup-coffee-table.jpg"
          alt="Taza de café, cafetera moka y granos tostados sobre un fondo neutro"
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-6 right-5 text-right lg:bottom-10 lg:right-16">
          <p className="label-sm text-white/70">Tueste artesanal</p>
          <div className="ml-auto mb-3 h-px w-12 bg-white/70" />
          <p className="headline-md text-white">Pasión por el origen.</p>
        </div>
      </div>
    </section>
  );
}
