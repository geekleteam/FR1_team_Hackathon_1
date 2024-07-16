import flowbite from 'flowbite-react/tailwind';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', flowbite.content()],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        hovergreen: '#2ab850',
        primary: {
          green: '#35d366',
          dark: '#0f1219',
          light: '#ffffff',
        },
        // Secondary Colors
        secondary: {
          purple: '#9c60ff',
          pink: '#f13da7',
          blue: '#000cee',
        },
        // Accent Colors
        accent: {
          yellow: '#fac43c',
          teal: '#07ae18',
          gray: '#818d99',
        },
        // Background Colors
        bg: {
          dark: '#0f1219',
          darker: '#090b11',
          light: '#151a21',
        },
        // Text Colors
        text: {
          light: '#ffffff',
          dark: '#000000',
          gray: '#818d99',
        },
        link: '#35d366',
      },
    },
  },
  darkMode: 'class',
  plugins: [require('tailwindcss-react-aria-components'), require('tailwindcss-animate'), flowbite.plugin()],
};
