/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
      colors: {
        'primary': '#F3AF0C',
        'secondary': '#4884AA',
        'gray-15': '#1A1A1A',
        'gray-55': '#636363',
      }
    },
	},
	plugins: [],
}
