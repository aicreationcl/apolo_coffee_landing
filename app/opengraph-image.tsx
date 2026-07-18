import { ImageResponse } from "next/og";

export const alt = "Apolo Coffee — Café de especialidad";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          background: "#fcf9f8",
        }}
      >
        <svg
          width="160"
          height="160"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="#120702"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 30 C13 20 16 8 22 4 C26 10 26 20 25 29" />
            <path d="M50 30 C51 20 48 8 42 4 C38 10 38 20 39 29" />
            <path d="M32 16 C20 16 12 26 13 36 C14 46 22 53 32 53 C42 53 50 46 51 36 C52 26 44 16 32 16 Z" />
            <path d="M20 29 C23 25 27 25 29 28" />
            <path d="M44 29 C41 25 37 25 35 28" />
            <path d="M20 34 C22 37 26 37 28 34" />
            <path d="M44 34 C42 37 38 37 36 34" />
            <path d="M24 39 C24 45 28 49 32 49 C36 49 40 45 40 39" />
            <ellipse cx="32" cy="39.5" rx="3" ry="2.1" />
            <path d="M27 43 C29 46 35 46 37 43" />
            <ellipse cx="32" cy="58" rx="3.4" ry="4.4" transform="rotate(-10 32 58)" />
            <path d="M32 54 C30 56 30 60 32 62" />
          </g>
        </svg>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -1.5,
            color: "#120702",
          }}
        >
          APOLO COFFEE
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            fontWeight: 400,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#6b5c4c",
          }}
        >
          Café de especialidad
        </div>
      </div>
    ),
    size
  );
}
