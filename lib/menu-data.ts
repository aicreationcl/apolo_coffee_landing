// PLACEHOLDER CONTENT — único punto de verdad del menú de infusiones.
// Precios en CLP, ficticios pero realistas para el mercado chileno.
// Reemplazar por la carta real, precios y fotografía de Apolo Coffee antes
// de lanzar el sitio a producción.

import type { MenuItem, MenuCategory } from "@/types/menu";

export const menuCategories: { id: MenuCategory; label: string }[] = [
  { id: "espresso", label: "Espresso" },
  { id: "filtrado", label: "Filtrado" },
  { id: "especiales", label: "Especiales" },
  { id: "frio", label: "Frío" },
];

export const menuItems: MenuItem[] = [
  {
    id: "espresso-apolo",
    name: "Espresso Apolo",
    description: "Doble shot de nuestra mezcla de la casa, cuerpo denso y notas a cacao.",
    price: 2200,
    category: "espresso",
    roastLevel: "dark",
  },
  {
    id: "cortado-roasted-tan",
    name: "Cortado",
    description: "Espresso cortado con un toque de leche vaporizada, textura sedosa.",
    price: 2500,
    category: "espresso",
    roastLevel: "dark",
  },
  {
    id: "v60-finca-esperanza",
    name: "V60 Finca La Esperanza",
    description: "Perfil floral y cítrico, tueste claro de altura, ideal para paladares curiosos.",
    price: 3200,
    category: "filtrado",
    roastLevel: "light",
    tags: ["temporada"],
  },
  {
    id: "chemex-sur",
    name: "Chemex del Sur",
    description: "Taza limpia y balanceada, notas a caramelo y frutos secos.",
    price: 3400,
    category: "filtrado",
    roastLevel: "medium",
  },
  {
    id: "latte-avellanas",
    name: "Latte de Avellanas",
    description: "Espresso, leche vaporizada y jarabe artesanal de avellanas tostadas.",
    price: 3800,
    category: "especiales",
    roastLevel: "medium",
    tags: ["nuevo"],
  },
  {
    id: "flat-white-apolo",
    name: "Flat White Apolo",
    description: "Microespuma aterciopelada sobre un doble ristretto, equilibrio perfecto.",
    price: 3500,
    category: "especiales",
    roastLevel: "medium",
  },
  {
    id: "cold-brew-12h",
    name: "Cold Brew 12h",
    description: "Extracción en frío por 12 horas, dulzura natural y baja acidez.",
    price: 3600,
    category: "frio",
    roastLevel: "dark",
    tags: ["temporada"],
  },
  {
    id: "iced-latte-coco",
    name: "Iced Latte de Coco",
    description: "Espresso, leche de coco y hielo — fresco, cremoso y sin lactosa.",
    price: 3900,
    category: "frio",
    roastLevel: "light",
    tags: ["nuevo"],
  },
];
