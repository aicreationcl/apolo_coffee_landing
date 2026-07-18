import { businessInfo } from "@/lib/business-info";

export const siteConfig = {
  name: businessInfo.name,
  description: businessInfo.description,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export function getLocalBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    name: businessInfo.name,
    legalName: businessInfo.legalName,
    description: businessInfo.description,
    url: siteConfig.url,
    telephone: businessInfo.phone,
    email: businessInfo.email,
    priceRange: "$$",
    servesCuisine: "Coffee",
    image: `${siteConfig.url}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.geo.latitude,
      longitude: businessInfo.geo.longitude,
    },
    openingHoursSpecification: businessInfo.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: hours.dayOfWeek,
      opens: hours.opens,
      closes: hours.closes,
    })),
    sameAs: [businessInfo.social.instagram.url, businessInfo.social.facebook.url],
  };
}
