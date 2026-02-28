/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        primaryBgColor: '#f4f2ee'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-18px)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(1.08)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.65s ease-out forwards',
        'slide-up-1': 'slideUp 0.65s ease-out 0.15s forwards',
        'slide-up-2': 'slideUp 0.65s ease-out 0.3s forwards',
        'slide-up-3': 'slideUp 0.65s ease-out 0.45s forwards',
        'slide-up-4': 'slideUp 0.65s ease-out 0.6s forwards',
        'slide-down': 'slideDown 0.6s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'pulse-glow-slow': 'pulseGlow 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite'
      }
    }
  },
  plugins: []
};

