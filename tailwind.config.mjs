/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        azul: '#1E73BE',
        'azul-dark': '#165fa0',
        ciano: '#15E6F5',
        'ciano-dark': '#00ccd9',
        accent: '#197278',
        texto: '#58595F',
        creme: '#FEF2E4',
        escuro: '#1a1a1a',
        'cinza-bg': '#f5f7fa',
        borda: '#e3e8ee',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Figtree', 'sans-serif'],
      },
      borderRadius: {
        pill: '50px',
      },
    },
  },
  plugins: [],
};
