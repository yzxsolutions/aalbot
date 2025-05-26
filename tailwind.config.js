// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      primary: '#030d38', // Define your custom primary color
    },
    fontFamily: {
        // 'inter' is likely your default font (from your App.jsx class)
        // 'poppins' is your new custom font
        poppins: ['Poppins', 'sans-serif'],
        // You might want to define 'inter' here explicitly too if you rely on it
        // inter: ['Inter', 'sans-serif'],
      },
    animation: {
        'bounce-subtle': 'bounce-subtle 3s infinite',
        'circular-slide': 'circular-slide 0.8s ease-in-out',
        'fade-in-up': 'fade-in-up 1s ease-out',
        'fade-in-left': 'fade-in-left 1s ease-out',
        'fade-in-right': 'fade-in-right 1s ease-out',
        'scale-in': 'scale-in 0.7s ease-out',
      },
      keyframes: {
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'circular-slide': {
          '0%': { transform: 'rotate(-5deg) scale(0.9)', opacity: '0.7' },
          '50%': { transform: 'rotate(0deg) scale(1.05)', opacity: '1' },
          '100%': { transform: 'rotate(0deg) scale(1)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
  },
};
export const plugins = [];