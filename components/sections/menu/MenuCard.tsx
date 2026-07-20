import type { MenuItem, RoastLevel } from "@/types/menu";

const ROAST_LABEL: Record<RoastLevel, string> = {
  light: "Claro",
  medium: "Medio",
  dark: "Oscuro",
};

const ROAST_CHIP_STYLE: Record<RoastLevel, { background: string; color: string }> = {
  light: { background: "#f4dfcb", color: "#120702" },
  medium: { background: "#dbc2b2", color: "#120702" },
  dark: { background: "#120702", color: "#f8ddcd" },
};

const priceFormatter = new Intl.NumberFormat("es-CL", {
  style: "currency",
  currency: "CLP",
  maximumFractionDigits: 0,
});

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-outline-variant/30 py-4">
      <div className="flex flex-col gap-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="headline-md text-on-background">{item.name}</h4>
          {item.roastLevel && (
            <span
              className="label-sm rounded-full px-2.5 py-0.5"
              style={ROAST_CHIP_STYLE[item.roastLevel]}
            >
              {ROAST_LABEL[item.roastLevel]}
            </span>
          )}
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="label-sm rounded-full bg-secondary-container px-2.5 py-0.5 text-on-secondary-container"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="body-md italic text-on-surface-variant">{item.description}</p>
      </div>
      <span className="body-lg shrink-0 font-semibold text-secondary">
        {priceFormatter.format(item.price)}
      </span>
    </div>
  );
}
