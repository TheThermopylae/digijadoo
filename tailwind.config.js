/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          xl: '2rem',
          '2xl': '5rem'
        }
      },
      colors: {
        'white-c': '#F0F0F0',
        'purple-c': '#8c00b6',
        'dark-c': '#171717',
        'dark-s': '#1E1E1E',
        'text-dark': '#EEE',
        'b-dark': '#303030'
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light']
  }
}
