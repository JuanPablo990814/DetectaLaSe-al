import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        primary: {
          DEFAULT: "#ec4899", // pink-500
          light: "#f9a8d4",   // pink-300
          dark: "#be185d",    // pink-700
        },
        alert: "#ef4444",    // red-500
        myth: "#9ca3af",     // gray-400
        prevention: "#22c55e",// green-500
      },
    },
  },
  plugins: [],
};
export default config;
