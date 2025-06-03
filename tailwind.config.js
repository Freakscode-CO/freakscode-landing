import forms from '@tailwindcss/forms';
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  safelist: [
    // Colores AURA para bordes (con border-t-4 implícito)
    'border-aura-primary', 'border-aura-secondary', 'border-aura-accent',
    'border-aura-rose', 'border-aura-orange', 'border-aura-green',
    // Colores AURA para fondos claros (con opacidad)
    'bg-aura-primary/10', 'bg-aura-secondary/10', 'bg-aura-accent/10',
    'bg-aura-rose/10', 'bg-aura-orange/10', 'bg-aura-green/10',
    // Colores AURA para fondos oscuros/sólidos
    'bg-aura-primary', 'bg-aura-secondary', 'bg-aura-accent',
    'bg-aura-rose', 'bg-aura-orange', 'bg-aura-green',
    // Colores AURA para texto
    'text-aura-primary', 'text-aura-secondary', 'text-aura-accent',
    'text-aura-rose', 'text-aura-orange', 'text-aura-green',
    'text-aura-text-light', 'text-aura-text-dark',
    // Hover states para fondos oscuros
    'hover:bg-aura-primary/90', 'hover:bg-aura-secondary/90', 'hover:bg-aura-accent/90',
    'hover:bg-aura-rose/90', 'hover:bg-aura-orange/90', 'hover:bg-aura-green/90',
    // Clases específicas de focus
    'focus:ring-aura-primary/50',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#301E47',
        accent: '#FAC657',
        background: '#FDFDF7',
        'aura-primary': '#AA49CC',      // Morado principal
        'aura-secondary': '#7CE0C8',    // Turquesa
        'aura-accent': '#FFC33F',       // Amarillo cálido
        'aura-rose': '#CB629A',          // Rosa/Morado (del gradiente)
        'aura-orange': '#ED9263',       // Naranja (del gradiente)
        'aura-green': '#97DDAB',        // Verde Claro (highlight)
        'aura-text-light': '#FDFDF7',
        'aura-text-muted': '#E2E2E0',
        'aura-text-dark': '#2A1B3D',
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
    forms,
  ],
} 