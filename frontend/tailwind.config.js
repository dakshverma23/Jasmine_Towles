/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Jost", "system-ui", "sans-serif"]
      },
      colors: {
        ven: {
          cream: "#f5f7f2",
          sand: "#e7ece5",
          ink: "#101314",
          muted: "#63706d",
          accent: "#00a6a6",
          line: "rgba(16, 19, 20, 0.12)"
        }
      },
      letterSpacing: {
        widest2: "0.35em"
      },
      transitionTimingFunction: {
        ven: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};
