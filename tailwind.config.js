/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A8D5E2', // Pale blue
        secondary: '#F5E6E8', // Soft pink
        accent: '#D4A5A5', // Dusty rose
        background: '#A8D5E2', // Pale blue background
        text: '#FFFFFF', // White text
        'text-light': '#F8F9FA', // Light white text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#FFFFFF',
            a: {
              color: '#FFFFFF',
              '&:hover': {
                color: '#F5E6E8',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 