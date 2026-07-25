module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          950: "#07111f",
          900: "#0c1d33",
          800: "#132b47",
          700: "#183c62",
        },
        accent: {
          500: "#34d6c5",
          400: "#67f0dd",
          300: "#a3fff1",
        },
        gold: {
          400: "#f9b949",
          300: "#ffd57d",
        },
        rose: {
          300: "#ff9fc0",
        },
        slate: {
          50: "#f7fbff",
          100: "#edf4fb",
          200: "#d7e4f1",
        },
      },
      fontFamily: {
        display: ['"Outfit"', '"Segoe UI"', "sans-serif"],
        body: ['"Inter"', '"Segoe UI"', "sans-serif"],
      },
      boxShadow: {
        panel: "0 24px 80px rgba(0, 0, 0, 0.32)",
        glow: "0 0 0 1px rgba(103, 240, 221, 0.22), 0 18px 50px rgba(52, 214, 197, 0.12)",
      },
    },
  },
  plugins: [],
};
