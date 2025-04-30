/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: '#f0f7ff',
          100: '#deecfc',
          200: '#c0dcfb',
          300: '#92c5f9',
          400: '#5fa7f3',
          500: '#3d8dee',
          600: '#2671e2',
          700: '#1e5cce',
          800: '#1e4ca7',
          900: '#1e4184',
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        earth: {
          50: '#f9f7ed',
          100: '#f0ead4',
          200: '#e2d4ac',
          300: '#d4bd82',
          400: '#c3a35e',
          500: '#b89049',
          600: '#a77a3b',
          700: '#8a6232',
          800: '#724f2e',
          900: '#5f4229',
        },
        forest: {
          50: '#f0f7f0',
          100: '#dbebdc',
          200: '#b9d8bc',
          300: '#8ebe93',
          400: '#63a06c',
          500: '#47854f',
          600: '#356b3d',
          700: '#2b5732',
          800: '#25472b',
          900: '#1f3c25',
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      boxShadow: {
        card: "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.05)",
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
        "slideIn": {
          from: { transform: "translateY(calc(100% + 1rem))" },
          to: { transform: "translateY(0)" },
        },
        "slideOut": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(100% + 1rem))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slideIn": "slideIn 0.2s ease-out",
        "slideOut": "slideOut 0.2s ease-out",
      },
    },
  },
  plugins: [],
};