/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
    'earthy-green': '#57A773',
    'creamy-yellow': '#F5E1A4',
    'subtle-brown': '#A15A3F',
    'crisp-white': '#FFFFFF',
    'vibrant-orange': '#FF8000',
  },
  fontSizes: {
    '16': '16px',
    '18': '18px',
    '20': '20px',
    '24': '24px',
    '36': '36px',
  },
fontFamilies: {
    'open-sans': ['Open Sans', 'sans-serif'],
    'montserrat': ['Montserrat', 'sans-serif'],
  },
    extend: {
      colors: {
        'primary': '#57A773',
        'secondary': '#FF8000',
        'accent': '#A15A3F',
        'price':{
          500:'green'
        }
      },
      
      fontSize: {
      'sm': '0.8rem',
      'base': '1rem',
      'xl': '1.25rem',
      '2xl': '1.563rem',
      '3xl': '1.953rem',
      '4xl': '2.441rem',
      '5xl': '3.052rem',
    }
    },
  },
  plugins: [],
}

