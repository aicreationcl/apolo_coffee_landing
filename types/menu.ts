export type MenuCategory = "espresso" | "filtrado" | "especiales" | "frio";
export type RoastLevel = "light" | "medium" | "dark";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  roastLevel?: RoastLevel;
  tags?: string[];
  image?: string;
}
