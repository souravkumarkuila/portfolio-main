/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*{.js}",
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('daisyui')
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'heading': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'subheading': ['1.5rem', { lineHeight: '2rem', fontWeight: '500' }],
      },
      backgroundImage:{
        'hero':"url('./hero-svg-bg.svg')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',

      },
      
    }
  }
}