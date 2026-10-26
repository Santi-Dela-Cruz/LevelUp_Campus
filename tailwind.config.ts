import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/views/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/controllers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/models/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Avolisse", "system-ui", "sans-serif"],
      },
      colors: {
        mystic: {
          night: "#141E30",
          deep: "#0D1524",
          mountain: "#242F59",
          ridge: "#324175",
          sky: "#1E4D7B",
        },
        guardian: {
          dark: "#2E1A47",
          DEFAULT: "#4A2574",
          crystal: "#6B3FA0",
          glow: "#8B5CF6",
          lavender: "#C084FC",
        },
        rune: {
          yellow: "#FACC15",
          bright: "#FFE600",
          amber: "#F59E0B",
        },
        poly: {
          lime: "#84CC16",
          brightLime: "#A3E635",
          forest: "#2D5A27",
          river: "#06B6D4",
          turquoise: "#22D3EE",
          shroom: "#F472B6",
          warrior: "#E11D48",
          earth: "#7C4D3A",
        },
      },
      boxShadow: {
        "rune-glow": "0 0 20px rgba(250, 204, 21, 0.35)",
        "crystal-glow": "0 0 25px rgba(139, 92, 246, 0.4)",
        "river-glow": "0 0 20px rgba(6, 182, 212, 0.35)",
        "warrior-glow": "0 0 25px rgba(225, 29, 72, 0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
