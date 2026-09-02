/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vastu: {
          gold: '#C5A059',
          goldLight: '#E5C578',
          goldDark: '#99732B',
          forest: '#1B382B',
          forestDark: '#12261D',
          forestLight: '#2D5945',
          ivory: '#FAF7F2',
          ivoryDark: '#F2ECE1',
          cream: '#ECE4D5',
          terracotta: '#8B5E3C',
          sapphire: '#34657F',
          crimson: '#B44436',
          sage: '#52795D',
          charcoal: '#24231F',
          muted: '#6F6B62',
          border: '#DED7C9',
          borderLight: '#ECE6DA',
        }
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'vastu-sm': '0 2px 10px rgba(27, 56, 43, 0.05)',
        'vastu': '0 10px 30px rgba(27, 56, 43, 0.08)',
        'vastu-lg': '0 20px 50px rgba(27, 56, 43, 0.12)',
        'vastu-gold': '0 0 25px rgba(197, 160, 89, 0.25)',
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'spin-reverse': 'spin 45s linear infinite reverse',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 35s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.33%)' },
        }
      }
    },
  },
  plugins: [],
};
