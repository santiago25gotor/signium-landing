import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: { center: true, padding: "1.5rem", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        signium: {
          // Paleta extraída del logo
          cyan: "#00BFFF",     // cyan brillante (lado izquierdo del logo)
          sky:  "#1E90FF",     // azul medio
          blue: "#0066FF",     // azul vivo (lado derecho del logo)
          deep: "#003B99",     // azul profundo para acentos
          ink:  "#0A1B3D",     // texto oscuro
          mist: "#E8F4FF",     // fondo claro tintado
        },
      },
      backgroundImage: {
        // Igual que el logo: cyan -> azul, en diagonal
        "signium-gradient":
          "linear-gradient(135deg, #00BFFF 0%, #1E90FF 45%, #0066FF 100%)",
        "signium-soft":
          "linear-gradient(135deg, rgba(0,191,255,0.10) 0%, rgba(0,102,255,0.10) 100%)",
        "radial-fade":
          "radial-gradient(circle at 50% 0%, rgba(0,191,255,0.18), transparent 60%)",
      },
      boxShadow: {
        "signium-glow": "0 20px 60px -10px rgba(0, 102, 255, 0.35)",
        "signium-glow-cyan": "0 20px 60px -10px rgba(0, 191, 255, 0.45)",
      },
      keyframes: {
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        spotlight: "spotlight 2s ease .35s 1 forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
