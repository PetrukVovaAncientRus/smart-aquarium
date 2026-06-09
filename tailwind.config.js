/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tealBase: "#008080",
        tealDark: "#004D4D",
        coral: "#FF7F50",
        coralDark: "#8B3A1E",
        good: "#39FF14",
        bad: "#FF0000",
        normal: "#FFFF00",
        verydarkCoral: "#000000B3",
      },
      fontFamily: {
        display: ["Inter", "Arial", "sans-serif"],
        rounded: ["Fredoka One", "Arial", "sans-serif"],
      },
      boxShadow: {
        figma: "8px 8px 4px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [],
}
