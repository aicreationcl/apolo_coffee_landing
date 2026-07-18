// PLACEHOLDER CONTENT — único punto de verdad de los datos del negocio
// (dirección, horario, contacto, redes sociales). Son datos ficticios pero
// creíbles para el mercado chileno; reemplazar por los datos reales de
// Apolo Coffee antes de lanzar el sitio a producción.

export interface OpeningHours {
  dayOfWeek: string[];
  opens: string;
  closes: string;
  label: string;
}

export const businessInfo = {
  name: "Apolo Coffee",
  legalName: "Apolo Coffee SpA",
  description:
    "Cafetería de especialidad en Las Condes — infusiones de autor, granos de origen y un espacio cálido para disfrutar el buen café.",
  email: process.env.CONTACT_TO_EMAIL ?? "hola@apolocoffee.cl",
  phone: "+56 9 1234 5678",
  phoneDisplay: "+56 9 1234 5678",
  address: {
    streetAddress: "Av. Apoquindo 1234, Local 3",
    addressLocality: "Las Condes",
    addressRegion: "Región Metropolitana",
    postalCode: "7550000",
    addressCountry: "CL",
  },
  addressDisplay: "Av. Apoquindo 1234, Local 3, Las Condes, Región Metropolitana",
  geo: {
    latitude: -33.4085,
    longitude: -70.5679,
  },
  googleMapsEmbedSrc:
    "https://www.google.com/maps?q=Av.+Apoquindo+1234,+Las+Condes,+Chile&output=embed",
  googleMapsDirectionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=Av.+Apoquindo+1234,+Las+Condes,+Chile",
  social: {
    instagram: { handle: "@apolocoffee.cl", url: "https://instagram.com/apolocoffee.cl" },
    facebook: { handle: "Apolo Coffee", url: "https://facebook.com/apolocoffee.cl" },
  },
  openingHours: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "20:00", label: "Lunes a Viernes" },
    { dayOfWeek: ["Saturday"], opens: "09:00", closes: "19:00", label: "Sábado" },
    { dayOfWeek: ["Sunday"], opens: "10:00", closes: "14:00", label: "Domingo" },
  ] satisfies OpeningHours[],
};
