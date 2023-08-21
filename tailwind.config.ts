/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      white: '#dadada',
      darker: '#1e1e1e',
      dark: '#262626',
      'dark-light': '#363636',
      'dark-lighter': '#A4A4A4',
      info: '#06b6d4',
      error: '#ff5252',
      primary: '#00ff96'
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: []
}
