const defaultTheme = require('tailwindcss/defaultTheme')
const daisyThemes = require('daisyui/src/colors/themes')

module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	plugins: [require('daisyui')],
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				sans: ['Outfit', ...defaultTheme.fontFamily.sans],
			},
			screens: {
				xs: '512px',
			},
		},
	},
	daisyui: {
		// darkTheme: 'dark',
		prefix: 'ds-',
		themes: [
			{
				light: {
					...daisyThemes['[data-theme=winter]'],
					primary: '#3366FF',
					'primary-focus': '#2e5ce6',
					'primary-content': '#D6E4FF',
					'--navbar-padding': defaultTheme.spacing['1'],
				},
				dark: {
					...daisyThemes['[data-theme=night]'],
					'--navbar-padding': defaultTheme.spacing['1'],
				},
			},
		],
	},
}
