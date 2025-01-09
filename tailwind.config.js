const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        first: "moveVertical 30s ease infinite",
        second: "moveInCircle 20s reverse infinite",
        third: "moveInCircle 40s linear infinite",
        fourth: "moveHorizontal 40s ease infinite",
        fifth: "moveInCircle 20s ease infinite",
        aurora: "aurora 60s linear infinite",
      },
      keyframes: {
        moveHorizontal: {
          "0%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
          "50%": {
            transform: "translateX(50%) translateY(10%)",
          },
          "100%": {
            transform: "translateX(-50%) translateY(-10%)",
          },
        },
        moveInCircle: {
          "0%": {
            transform: "rotate(0deg)",
          },
          "50%": {
            transform: "rotate(180deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        moveVertical: {
          "0%": {
            transform: "translateY(-50%)",
          },
          "50%": {
            transform: "translateY(50%)",
          },
          "100%": {
            transform: "translateY(-50%)",
          },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      colors: {
        primary: {
          DEFAULT: "#FF69B4", // Brand pink
          light: "#FFB6C1",
          dark: "#FF1493",
        },
        secondary: {
          DEFAULT: "#4B9CD3", // Brand blue
          light: "#87CEEB",
          dark: "#4169E1",
        },
        accent: {
          DEFAULT: "#F5F5DC", // Brand cream
          light: "#FFFFF0",
          dark: "#EEE8AA",
        },
        background: "#1A1A1A", // Dark background
        foreground: "#FFFFFF",
        muted: {
          DEFAULT: "#374151",
          foreground: "#9CA3AF",
        },
        border: "#2D2D2D",
        ring: "#2D2D2D",
        input: "#2D2D2D",
        destructive: {
          DEFAULT: "#FF69B4", // Brand pink
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#1A1A1A", // Dark background
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#1A1A1A", // Dark background
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [addVariablesForColors],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
