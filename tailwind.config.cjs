module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts,js}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        surface: "var(--color-surface)",
        text: "var(--color-text)",
        ink: "var(--color-ink)",
        accent: "var(--color-accent)"
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        script: ["var(--font-script)", "cursive"]
      }
    }
  },
  plugins: []
};
