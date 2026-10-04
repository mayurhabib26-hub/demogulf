/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FFFFF0',
          light: '#FFFFFA',
          soft: '#FDFCFA',
        },
        card: '#FFFFFF',
        'tgs-black': '#111111',
        olive: {
          DEFAULT: '#777348',
          light: '#8E8A58',
          dark: '#585532',
          subtle: 'rgba(119, 115, 72, 0.08)',
          glow: 'rgba(119, 115, 72, 0.18)',
        },
        beige: {
          DEFAULT: '#F3F0E5',
          light: '#F8F6F0',
          dark: '#EAE6D5',
        },
        'border-tgs': '#E1DECE',
        'border-tgs-subtle': '#EDEAE0',
        'text-primary': '#111111',
        'text-secondary': '#66645A',
        'text-muted': '#8A887E',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        marquee: 'marquee var(--duration, 35s) linear infinite',
        'marquee-reverse': 'marquee-reverse var(--duration, 35s) linear infinite',
        'shimmer-slide': 'shimmer-slide var(--speed, 3s) ease-in-out infinite alternate',
        'spin-around': 'spin-around calc(var(--speed, 3s) * 2) infinite linear',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap, 1rem)))' },
        },
        'marquee-reverse': {
          from: { transform: 'translateX(calc(-100% - var(--gap, 1rem)))' },
          to: { transform: 'translateX(0)' },
        },
        'shimmer-slide': {
          to: {
            transform: 'translate(calc(100cqw - 100%), 0)',
          },
        },
        'spin-around': {
          '0%': {
            transform: 'translateZ(0) rotate(0)',
          },
          '15%, 35%': {
            transform: 'translateZ(0) rotate(90deg)',
          },
          '65%, 85%': {
            transform: 'translateZ(0) rotate(270deg)',
          },
          '100%': {
            transform: 'translateZ(0) rotate(360deg)',
          },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(17, 17, 17, 0.04)',
        'elevated': '0 8px 30px rgba(17, 17, 17, 0.06)',
        'olive-glow': '0 0 25px rgba(119, 115, 72, 0.15)',
        'card-hover': '0 12px 36px rgba(17, 17, 17, 0.08)',
      },
    },
  },
  plugins: [],
}
