import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        bAndc: {
          "0% ": {
            transform: "translate(0,10vw)",
            backgroundColor: "#5651e5",
          },
          "25%": {
            transform: "translate(100v,0)",
            backgroundColor: "transparent",
          },
          "50%": {
            transform: "translate(0,450vh)",
            backgroundColor: "transparent",
          },
          "75%": {
            transform: "translate(0,100vh)",
            backgroundColor: "transparent",
          },
          "100%": {
            transform: "translate(0,0)",
            backgroundColor: "#FFFF00",
          },
        },
      },
      animation: {
        bAndc: "bAndc 15s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
