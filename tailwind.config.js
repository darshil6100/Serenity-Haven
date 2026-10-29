/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Jost', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
      },
      // Components use two-digit opacity modifiers like `/08` and `/12`.
      opacity: {
        '03': '0.03',
        '04': '0.04',
        '05': '0.05',
        '06': '0.06',
        '08': '0.08',
        12: '0.12',
        88: '0.88',
        92: '0.92',
      },
      spacing: {
        4.5: '1.125rem',
      },
      transitionDuration: {
        400: '400ms',
      },
    },
  },
  plugins: [],
};
