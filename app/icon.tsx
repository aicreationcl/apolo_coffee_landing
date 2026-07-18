import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fcf9f8",
          borderRadius: 6,
        }}
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g
            stroke="#120702"
            strokeWidth={3.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 30 C13 20 16 8 22 4 C26 10 26 20 25 29" />
            <path d="M50 30 C51 20 48 8 42 4 C38 10 38 20 39 29" />
            <path d="M32 16 C20 16 12 26 13 36 C14 46 22 53 32 53 C42 53 50 46 51 36 C52 26 44 16 32 16 Z" />
            <path d="M20 34 C22 37 26 37 28 34" />
            <path d="M44 34 C42 37 38 37 36 34" />
            <ellipse cx="32" cy="39.5" rx="3" ry="2.1" />
          </g>
        </svg>
      </div>
    ),
    size
  );
}
