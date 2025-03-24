/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        gray: {
          50: '#f9fafb',
          800: '#1f2937',
        }
      },
      borderRadius: {
        'xl': '0.75rem',
        'lg': '0.5rem'
      },
      darkMode: 'class',
    },
  },
  plugins: [],
}

