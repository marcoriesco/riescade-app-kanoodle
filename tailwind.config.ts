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
	safelist: [
		// Piece colors
		'bg-piece-red',
		'bg-piece-orange',
		'bg-piece-yellow',
		'bg-piece-green',
		'bg-piece-cyan',
		'bg-piece-blue',
		'bg-piece-purple',
		'bg-piece-pink',
		'bg-piece-white',
		'bg-piece-gray',
		'bg-piece-lightPink',
		'bg-piece-lightGreen',
	],
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
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
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
				// Game-specific colors
				'board-bg': 'hsl(var(--board-bg))',
				'board-hole': 'hsl(var(--board-hole))',
				'board-border': 'hsl(var(--board-border))',
				'panel-bg': 'hsl(var(--panel-bg))',
				'panel-border': 'hsl(var(--panel-border))',
				'display-bg': 'hsl(var(--display-bg))',
				'display-text': 'hsl(var(--display-text))',
				'piece-red': 'hsl(var(--piece-red))',
				'piece-orange': 'hsl(var(--piece-orange))',
				'piece-yellow': 'hsl(var(--piece-yellow))',
				'piece-green': 'hsl(var(--piece-green))',
				'piece-cyan': 'hsl(var(--piece-cyan))',
				'piece-blue': 'hsl(var(--piece-blue))',
				'piece-purple': 'hsl(var(--piece-purple))',
				'piece-pink': 'hsl(var(--piece-pink))',
				'piece-white': 'hsl(var(--piece-white))',
				'piece-gray': 'hsl(var(--piece-gray))',
				'valid-drop': 'hsl(var(--valid-drop))',
				'invalid-drop': 'hsl(var(--invalid-drop))',
				'hover-glow': 'hsl(var(--hover-glow))'
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
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
