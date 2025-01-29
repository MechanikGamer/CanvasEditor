export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3762FB",
        primary50: "rgba(114, 9, 183, 0.5)",
        black100: "#353535",
        black75: "#676767",
        black50: "#9B9B9B",
        black25: "#CDCDCD",
        white: "#FFFFFF",
        white98: "#FAFAFA",
        white97: "#F7F7F8",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
