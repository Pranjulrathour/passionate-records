import type { Config } from "tailwindcss";

const config: Config = {
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
			      fontFamily: {
        'syncopate': ['Syncopate', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
      },
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				'passionate-red': '#FF0000',
				'passionate-black': '#000000',
				'passionate-white': '#FFFFFF',
				'passionate-gray': '#333333',
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
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'float-complex': {
					'0%, 100%': { 
						transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
						opacity: '0.7'
					},
					'25%': { 
						transform: 'translate3d(30px, -40px, 0) rotate(5deg) scale(1.05)',
						opacity: '0.9'
					},
					'50%': { 
						transform: 'translate3d(-20px, -60px, 0) rotate(-3deg) scale(0.95)',
						opacity: '0.8'
					},
					'75%': { 
						transform: 'translate3d(-40px, -20px, 0) rotate(7deg) scale(1.02)',
						opacity: '0.85'
					}
				},
				'float-reverse': {
					'0%, 100%': { 
						transform: 'translate3d(0, 0, 0) rotate(0deg)',
						opacity: '0.6'
					},
					'33%': { 
						transform: 'translate3d(-25px, 35px, 0) rotate(-8deg)',
						opacity: '0.8'
					},
					'66%': { 
						transform: 'translate3d(40px, 20px, 0) rotate(5deg)',
						opacity: '0.7'
					}
				},
				'float-diagonal': {
					'0%, 100%': { 
						transform: 'translate3d(0, 0, 0) rotate(0deg) scale(1)',
						opacity: '0.8'
					},
					'50%': { 
						transform: 'translate3d(60px, -80px, 0) rotate(12deg) scale(1.1)',
						opacity: '0.9'
					}
				},
				'bounce-slow': {
					'0%, 100%': { 
						transform: 'translateY(0) scale(1) rotate(0deg)',
						opacity: '0.5'
					},
					'50%': { 
						transform: 'translateY(-30px) scale(1.05) rotate(5deg)',
						opacity: '0.8'
					}
				},
				'spin-slow': {
					'from': { transform: 'rotate(0deg)' },
					'to': { transform: 'rotate(360deg)' }
				},
				'slide-up': {
					'to': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'fade-in': {
					'to': {
						opacity: '1'
					}
				},
				'gradient-shift': {
					'0%, 100%': { 'background-position': '0% 50%' },
					'50%': { 'background-position': '100% 50%' }
				},
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
			},
			animation: {
				'float-complex': 'float-complex 8s ease-in-out infinite',
				'float-reverse': 'float-reverse 6s ease-in-out infinite',
				'float-diagonal': 'float-diagonal 10s ease-in-out infinite',
				'bounce-slow': 'bounce-slow 4s ease-in-out infinite',
				'spin-slow': 'spin-slow 20s linear infinite',
				'slide-up': 'slide-up 1s ease-out forwards',
				'fade-in': 'fade-in 1.5s ease-out forwards',
				'gradient-shift': 'gradient-shift 3s ease-in-out infinite',
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
				'gradient-passionate': 'linear-gradient(135deg, #FF0000, #AA0000, #FF0000)',
			},
			textShadow: {
				'red': '0 0 10px rgba(255, 0, 0, 0.5)',
				'intense': '0 0 5px rgba(255, 0, 0, 0.8), 0 0 10px rgba(255, 0, 0, 0.6), 0 0 15px rgba(255, 0, 0, 0.4), 0 0 20px rgba(255, 0, 0, 0.2)',
			},
			backdropBlur: {
				'xl': '24px',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			zIndex: {
				'60': '60',
				'70': '70',
				'80': '80',
				'90': '90',
				'100': '100',
			},
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: any) {
			const newUtilities = {
				'.text-shadow-red': {
					textShadow: '0 0 10px rgba(255, 0, 0, 0.5)',
				},
				'.text-shadow-intense': {
					textShadow: '0 0 5px rgba(255, 0, 0, 0.8), 0 0 10px rgba(255, 0, 0, 0.6), 0 0 15px rgba(255, 0, 0, 0.4), 0 0 20px rgba(255, 0, 0, 0.2)',
				},
				'.red-glow': {
					boxShadow: '0 0 30px rgba(255, 0, 0, 0.3), 0 0 60px rgba(255, 0, 0, 0.1)',
				},
				'.red-glow:hover': {
					boxShadow: '0 0 40px rgba(255, 0, 0, 0.5), 0 0 80px rgba(255, 0, 0, 0.2)',
				},
				'.bg-gradient-radial': {
					background: 'radial-gradient(circle at center, var(--tw-gradient-stops))',
				},
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;

export default config;

