import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { businessInfo } from "@/lib/business-info";

// lucide-react no incluye logotipos de marcas (Instagram/Facebook) — se
// dibujan a mano como SVG de trazo simple, consistentes con el stroke-width
// 1.5-2px del resto de los íconos del sitio.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth={1.75} />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth={1.75} />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth={1.75} />
      <path
        d="M13.2 20V12.6H15.4L15.7 9.9H13.2L13.2 8.4C13.2 7.6 13.4 7.1 14.5 7.1H15.8V4.7C15.3 4.6 14.6 4.6 13.8 4.6C12 4.6 10.8 5.7 10.8 8.1V9.9H8.8V12.6H10.8V20"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-outline-variant/50 bg-surface-container-low">
      <Container className="flex flex-col gap-8 py-12 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="body-md max-w-xs text-on-surface-variant">
            {businessInfo.description}
          </p>
          <div className="flex items-center gap-3">
            <a
              href={businessInfo.social.instagram.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Apolo Coffee"
              className="text-on-surface-variant transition-colors hover:text-on-background"
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={businessInfo.social.facebook.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook de Apolo Coffee"
              className="text-on-surface-variant transition-colors hover:text-on-background"
            >
              <FacebookIcon className="size-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="label-sm text-on-surface-variant">Horario</span>
          {businessInfo.openingHours.map((hours) => (
            <p key={hours.label} className="body-md text-on-background">
              {hours.label}: {hours.opens} – {hours.closes}
            </p>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          <span className="label-sm text-on-surface-variant">Contacto</span>
          <a href={`mailto:${businessInfo.email}`} className="body-md text-on-background hover:underline">
            {businessInfo.email}
          </a>
          <a href={`tel:${businessInfo.phone}`} className="body-md text-on-background hover:underline">
            {businessInfo.phoneDisplay}
          </a>
          <p className="body-md text-on-surface-variant">{businessInfo.addressDisplay}</p>
        </div>
      </Container>

      <div className="border-t border-outline-variant/30 py-6">
        <Container>
          <p className="label-sm text-on-surface-variant">
            © {year} {businessInfo.name}. Todos los derechos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
