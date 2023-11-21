/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Graphik", "sans-serif"],
        serif: ["Merriweather", "serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#6741D9",
        secondary: "#F0C3F1",
        background: "#030303",
        font: "#FFFFFF",
        grayed: "#C2C2C2",
      },
      fontSize: {
        body: "16px",
        heading: "32px",
      },
      width: {
        content: "300px",
        field: "600px",
      },
      maxWidth: {
        content: "300px",
        field: "600px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
