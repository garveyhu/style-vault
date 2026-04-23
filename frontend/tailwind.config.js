/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'PingFang SC',
          'Microsoft YaHei',
          'Segoe UI',
          'sans-serif',
        ],
        display: [
          'Fraunces',
          'Instrument Serif',
          'Georgia',
          'PingFang SC',
          'Microsoft YaHei',
          'serif',
        ],
      },
    },
  },
  plugins: [],
};
