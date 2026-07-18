"use client";

import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import { useScrollReveal } from "@/components/gsap/useScrollReveal";
import { businessInfo } from "@/lib/business-info";

export function Ubicacion() {
  const mapRef = useScrollReveal<HTMLDivElement>({ y: 32 });
  const infoRef = useScrollReveal<HTMLDivElement>({ y: 32, delay: 0.15 });

  return (
    <section id="ubicacion" className="bg-surface">
      <Container className="grid grid-cols-1 items-start gap-12 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
        <div ref={mapRef} className="overflow-hidden rounded-lg border border-outline-variant">
          <iframe
            src={businessInfo.googleMapsEmbedSrc}
            title={`Ubicación de ${businessInfo.name}`}
            width="100%"
            height="380"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block"
          />
        </div>

        <div ref={infoRef} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="label-sm text-secondary">Visítanos</span>
            <h2 className="headline-lg text-on-background">{businessInfo.addressDisplay}</h2>
          </div>

          <ul className="flex flex-col divide-y divide-outline-variant/50 border-t border-outline-variant/50">
            {businessInfo.openingHours.map((hours) => (
              <li key={hours.label} className="flex items-center justify-between py-4">
                <span className="body-md text-on-background">{hours.label}</span>
                <span className="body-md text-on-surface-variant">
                  {hours.opens} – {hours.closes}
                </span>
              </li>
            ))}
          </ul>

          <a
            href={businessInfo.googleMapsDirectionsUrl}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: "lg", className: "w-fit px-6 py-5 text-base" })}
          >
            Cómo llegar
          </a>
        </div>
      </Container>
    </section>
  );
}
