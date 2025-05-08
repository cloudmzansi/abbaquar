import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: 'rgb(var(--color-primary) / <alpha-value>)',
				'primary-light': 'rgb(var(--color-primary-light) / <alpha-value>)',
				secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
				neutral: {
					50: 'rgb(var(--color-neutral-50) / <alpha-value>)',
					100: 'rgb(var(--color-neutral-100) / <alpha-value>)',
					200: 'rgb(var(--color-neutral-200) / <alpha-value>)',
					300: 'rgb(var(--color-neutral-300) / <alpha-value>)',
					400: 'rgb(var(--color-neutral-400) / <alpha-value>)',
					500: 'rgb(var(--color-neutral-500) / <alpha-value>)',
					600: 'rgb(var(--color-neutral-600) / <alpha-value>)',
					700: 'rgb(var(--color-neutral-700) / <alpha-value>)',
					800: 'rgb(var(--color-neutral-800) / <alpha-value>)',
					900: 'rgb(var(--color-neutral-900) / <alpha-value>)',
				},
				success: 'rgb(var(--color-success) / <alpha-value>)',
				warning: 'rgb(var(--color-warning) / <alpha-value>)',
				error: 'rgb(var(--color-error) / <alpha-value>)',
				info: 'rgb(var(--color-info) / <alpha-value>)',
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				abbaquar: {
					purple: '#9E7EB0', // Softer purple from the logo
					dark: '#000000', // Black for footer
					light: '#F8F8F8',
					accent: '#E8B187', // Softer orange/peach
					green: '#9AC882', // Softer green
					blue: '#8CBFCB', // Softer blue
					yellow: '#F9E89C' // Softer yellow
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
