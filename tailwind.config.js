/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  safelist: [
    // Colores para bordes
    'border-indigo-600', 'border-purple-600', 'border-sky-600', 
    'border-teal-600', 'border-rose-600', 'border-emerald-600',
    // Colores para fondos
    'bg-indigo-600', 'bg-indigo-100', 'text-indigo-600',
    'bg-purple-600', 'bg-purple-100', 'text-purple-600',
    'bg-sky-600', 'bg-sky-100', 'text-sky-600',
    'bg-teal-600', 'bg-teal-100', 'text-teal-600',
    'bg-rose-600', 'bg-rose-100', 'text-rose-600',
    'bg-emerald-600', 'bg-emerald-100', 'text-emerald-600',
    // Hover states
    'hover:bg-indigo-700', 'hover:bg-purple-700', 'hover:bg-sky-700',
    'hover:bg-teal-700', 'hover:bg-rose-700', 'hover:bg-emerald-700',
    // Text colors
    'text-indigo-900', 'text-purple-900', 'text-sky-900',
    'text-teal-900', 'text-rose-900', 'text-emerald-900',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#301E47',
        accent: '#FAC657',
        background: '#FDFDF7',
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 