import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: "rgb(var(--background-main) / <alpha-value>)",
          white: "rgb(var(--background-white) / <alpha-value>)",
          glass: "rgb(var(--background-glass) / <alpha-value>)",
        },
        surface: {
          DEFAULT: "rgb(var(--surface-default) / <alpha-value>)",
          border: "rgb(var(--surface-border) / <alpha-value>)",
          hover: "rgb(var(--surface-hover) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--primary-default) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
          accent: "#2D5A27",
          warm: "#D97706",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
        },
        status: {
          success: "#10B981", // More standard success green
          warning: "#F59E0B",
          error: "#EF4444",
        }
      },
      borderRadius: {
        '3xl': '32px',
        '2xl': '24px',
        'xl': '18px',
        'lg': '12px',
        'md': '8px',
      },
      boxShadow: {
        'soft-glow': '0 0 25px -5px rgba(45, 90, 39, 0.25)',
        'paper': '0 1px 3px rgba(0,0,0,0.02), 0 4px 12px rgba(0,0,0,0.03)',
        'elevated': '0 20px 40px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
};
export default config;
