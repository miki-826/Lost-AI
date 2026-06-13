import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#05070D",
        subbg: "#0B1020",
        ink: "#EAF6FF",
        subink: "#8FA7B8",
        accent: "#00D9FF",
        glow: "#5BE7FF",
        warn: "#FF4D6D",
        success: "#38F8C8",
        fail: "#B026FF",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 12px rgba(91, 231, 255, 0.5)",
        "glow-lg": "0 0 24px rgba(91, 231, 255, 0.6)",
      },
    },
  },
  plugins: [],
};

export default config;
