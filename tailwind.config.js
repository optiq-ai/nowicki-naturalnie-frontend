/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        background: "var(--background-color)",
        text: "var(--text-color)",
      },
      fontFamily: {
        header: ["var(--header-font)", "serif"],
        body: ["var(--body-font)", "sans-serif"],
      },
    },
  },
  plugins: [],
}
