const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        container: "1100px",
        blog: "900px",
      },
      colors: {
        ...colors,
        black: "#000",
        text: "#1F1F1F",
        primary: "#4781FF",
        disable: "#C2C2C2",
        lightGray: "#f0f0f0",
        white: "#fff",
        twitter: "#1DA1F2",
        github: "#1D2227",
        instagram: "#000000",
        linkedin: "#2567C2",
        contact: "#222",
      },
      backgroundImage: {
        "bg-gradient":
          "linear-gradient(180deg, rgba(187, 20, 130, 0) 0%, rgb(241 129 189 / 42%) 36%, rgba(71, 129, 255, 0.7) 80.5%);",
      },
    },
  },
  plugins: [],
};
