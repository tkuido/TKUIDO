/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				backgroundButton: '#6BB580',
				backgroundButtonHover: '#128c7e',
			},
		},
	},
	plugins: [],
}
