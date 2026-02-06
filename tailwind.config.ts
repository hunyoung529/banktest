import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F8F9FA',
        surface: '#FFFFFF',
        surface2: '#F1F5FB',
        line: '#E7EDF6',
        brand: {
          DEFAULT: '#1976F3',
          hover: '#1565C0'
        },
        text: {
          primary: '#0E1014',
          secondary: '#7A8699',
          muted: '#9AA6B2',
          inverse: '#FFFFFF'
        },
        info: '#2B82F6',
        pos: '#16A34A',
        neg: '#E11D48'
      },
      borderRadius: {
        xl: '16px',
        '2xl': '20px',
        pill: '9999px'
      },
      boxShadow: {
        card: '0 6px 24px rgba(0,0,0,0.06)',
        sheet: '0 -12px 32px rgba(0,0,0,0.18)'
      },
      spacing: {
        '1.5': '6px'
      }
    },
  },
  plugins: [],
};

export default config;
