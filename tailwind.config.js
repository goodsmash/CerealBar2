const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        // Brand Colors
        "brand": {
          pink: {
            lighter: "#FFB6C1",  // Lighter pink for hover states
            light: "#FF69B4",    // Primary brand pink
            DEFAULT: "#FF1493",  // Default pink for buttons
            dark: "#C71585",     // Dark pink for active states
          },
          blue: {
            lighter: "#87CEEB",  // Lighter blue for hover states
            light: "#4B9CD3",    // Primary brand blue
            DEFAULT: "#4169E1",  // Default blue for buttons
            dark: "#0000CD",     // Dark blue for active states
          },
          cream: {
            lighter: "#FFFFF0",  // Lightest cream for backgrounds
            light: "#F5F5DC",    // Light cream for cards
            DEFAULT: "#EEE8AA",  // Default cream for accents
            dark: "#DAA520",     // Dark cream for borders
          }
        },
        // Semantic Colors
        primary: {
          DEFAULT: "#FF1493",     // Brand pink default
          50: "#FFF0F7",          // Lightest pink
          100: "#FFE1EF",         // Very light pink
          200: "#FFB6D6",         // Light pink
          300: "#FF8AC0",         // Medium light pink
          400: "#FF69B4",         // Brand pink
          500: "#FF1493",         // Default pink
          600: "#C71585",         // Dark pink
          700: "#8B0A50",         // Darker pink
          800: "#4A0728",         // Very dark pink
          900: "#2D0418",         // Darkest pink
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#4169E1",     // Brand blue default
          50: "#F0F4FF",          // Lightest blue
          100: "#E1E9FF",         // Very light blue
          200: "#B6CCFF",         // Light blue
          300: "#87CEEB",         // Medium light blue
          400: "#4B9CD3",         // Brand blue
          500: "#4169E1",         // Default blue
          600: "#0000CD",         // Dark blue
          700: "#00008B",         // Darker blue
          800: "#000066",         // Very dark blue
          900: "#000044",         // Darkest blue
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#EEE8AA",     // Brand cream default
          50: "#FFFFF0",          // Lightest cream
          100: "#FFFACD",         // Very light cream
          200: "#F5F5DC",         // Light cream
          300: "#EEE8AA",         // Medium light cream
          400: "#DAA520",         // Brand cream
          500: "#B8860B",         // Default cream
          600: "#8B6914",         // Dark cream
          700: "#5C4A1D",         // Darker cream
          800: "#2E2A16",         // Very dark cream
          900: "#1A1810",         // Darkest cream
          foreground: "#000000",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
