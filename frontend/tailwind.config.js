/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        color1 : '#F5F1E9',
        color2: '#B48217',
        color3: '#DDD9D0',
        color4: '#E39F0E',
        color5: '#8D8686',
        color6: '#FBECD3',
      }
    },
  },
  plugins: [],
}

