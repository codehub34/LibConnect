/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#002B36',
          light: '#004d5a',
          dark: '#001a1f',
        },
        secondary: {
          DEFAULT: '#FFB347',
          light: '#ffc266',
          dark: '#e69c3e',
        },
        light: '#F9F9F9',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'lato': ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [
    // The plugin is removed as it's now a core feature
  ],
}