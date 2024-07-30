/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bigorange: '#ff8200',
        xgraydark: '#262626',
        xgraysmokey: '#4b4b4b',
        xgraymid: '#a5a5a5',
        xgraylight: '#d2d2d2',
        xgraywhite: '#e9e9e9',
      },
    },
  },
  plugins: [],
}
