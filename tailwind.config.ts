import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nori: {
          black: "#000000",
          lilac: "#A855F7",
          purple: "#C084FC",
          deep: "#7E22CE",
          darkViolet: "#3B0764",
          light: "#F3E8FF",
        },
      },
      animation: {
        "float-gentle": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(168, 85, 247, 0.4), 0 0 30px rgba(192, 132, 252, 0.2)",
          },
          "50%": {
            boxShadow: "0 0 25px rgba(168, 85, 247, 0.7), 0 0 50px rgba(192, 132, 252, 0.4)",
          },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
