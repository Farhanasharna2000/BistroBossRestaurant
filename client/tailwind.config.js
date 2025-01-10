/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: "'Lato', sans-serif",
      },
    },
  },
  plugins: [daisyui],
}
