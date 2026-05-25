import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#f7f7f5",
        canvasSoft: "#f8f8f6",
        panel: "#ffffff",
        ink: "#080808",
        mist: "#6e6e6b",
        line: "rgba(8, 8, 8, 0.1)"
      },
      fontFamily: {
        display: ["Aptos", "Segoe UI Variable Display", "Segoe UI", "sans-serif"],
        body: ["Aptos", "Segoe UI Variable Text", "Segoe UI", "sans-serif"],
        serif: ["Iowan Old Style", "Palatino Linotype", "Georgia", "serif"]
      },
      boxShadow: {
        panel: "0 20px 60px rgba(0, 0, 0, 0.04)",
        soft: "0 18px 48px rgba(0, 0, 0, 0.038)",
        cursor: "0 18px 44px rgba(0, 0, 0, 0.16)"
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)"
      },
      maxWidth: {
        site: "1080px"
      }
    }
  },
  plugins: []
};

export default config;
