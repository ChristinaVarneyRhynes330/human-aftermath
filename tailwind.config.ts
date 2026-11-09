import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#172126",
        steel: "#3E6892",
        sage: "#617B8A",
        mint: "#BBD4C5",
        bone: "#FAF6F7",
        peach: "#EDAE9D",
        "peach-glow": "rgba(237, 174, 157, 0.25)",
        "bg-deep": "#080C10",
        "bg-surface": "#10161E",
        "bg-elevated": "#16202A",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "Inter", "system-ui", "sans-serif"],
        editorial: ["'Cormorant Garamond'", "'Playfair Display'", "Georgia", "serif"],
        brand: ["Cinzel", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;