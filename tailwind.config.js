/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6F5F2",
        ink: "#221F1D",
        charcoal: {
          50: "#EFEEEC",
          100: "#D9D6D1",
          400: "#5C5650",
          600: "#3A3531",
          700: "#2E2926",
          800: "#221F1D",
          900: "#181614",
        },
        coral: {
          400: "#FF8A6E",
          500: "#FF6B4A",
          600: "#E8532F",
        },
        teal: {
          400: "#3FBAAC",
          500: "#2AA198",
          600: "#22857D",
        },
        amber: {
          400: "#E8B54A",
          500: "#D9A233",
        },
      },
      fontFamily: {
        display: ["Sora", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(34,31,29,0.06), 0 10px 26px -12px rgba(34,31,29,0.22)",
      },
    },
  },
  plugins: [],
}
