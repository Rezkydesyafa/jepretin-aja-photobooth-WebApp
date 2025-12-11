export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        handwriting: ['"Dancing Script"', 'cursive'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        dark: {
          bg: '#FFFFFF',      // Pure White
          surface: '#F8F8F8', // Very Light Grey
          card: '#FFFFFF',    // White Card
          border: 'rgba(0, 0, 0, 0.08)', // Subtle Grey Border
          text: {
            primary: '#111111', // Deep Black
            secondary: '#555555', // Medium Grey
          },
          accent: '#000000', // Black Accent
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.6)',
          medium: 'rgba(255, 255, 255, 0.8)',
          heavy: 'rgba(255, 255, 255, 0.95)',
        }
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
        'glass-sm': '0 4px 16px 0 rgba(0, 0, 0, 0.03)',
        'glow': '0 0 15px rgba(0, 0, 0, 0.05)',
        'glow-active': '0 0 20px rgba(0, 0, 0, 0.1)',
        'neumorph-dark': '5px 5px 15px #d1d9e6, -5px -5px 15px #ffffff', // Adapted for light
        'neumorph-pressed': 'inset 5px 5px 10px #d1d9e6, inset -5px -5px 10px #ffffff',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
