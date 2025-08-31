/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sb: {
          bg: '#141414',
          surface: '#181818',
          primary: '#E50914',
          accent: '#B81D24',
          text: '#FFFFFF',
          muted: '#B3B3B3',
        },
      },
      borderRadius: {
        xl: '12px',
      },
      boxShadow: {
        card: '0 4px 16px rgba(0,0,0,0.4)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      transitionDuration: {
        fast: '150ms',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

