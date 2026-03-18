/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0f172a",
        neon: "#38bdf8",
        card: "rgba(15, 23, 42, 0.54)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(3, 8, 20, 0.6)",
      },
      backdropBlur: {
        xs: "2px",
        md: "16px",
      },
    },
  },
  plugins: [],
};
