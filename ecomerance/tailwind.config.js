/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '400px',
      },
      colors: {
        "blacktrans": "rgb(0,0,0,0.5)",
      },
      keyframes: {
        growleft: {
          '0%': { transform: "scaleX(0)", opacity: '0' },
          '80%': { transform: "scaleX(1.1)", opacity: '1' },
          '100%': { transform: "scaleX(1)" },
        },
        growright: {
          '0%': { transform: "scaleX(1)" },
          '100%': { transform: "scaleX(0)" },
        },
        growdown: {
          '0%': { transform: "scaleY(0)", opacity: '0' },
          '80%': { transform: "scaleY(1.1)", opacity: '1' },
          '100%': { transform: "scaleY(1)" },
        },
        growup: {
          '0%': { transform: "scaleY(1)" },
          '100%': { transform: "scaleY(0)" },
        },
        flytocart: {
          '0%': {
            opacity: 1,
            top: 0,
            right: 0
          },
          '80%': {
            opacity: "0.8",
            transform: 'scale(0.4)'
          },
          '100%': { transform: 'scale(0.3)', opacity: "0.2", top: 'var(--img-top)', right: 'var(--img-right)' },
        }
      },
      animation: {
        growright: "growright 300ms ease-in forwards",
        growleft: "growleft 300ms ease-in forwards",
        growdown: "growdown 200ms ease-in forwards",
        growup: "growup 150ms ease-out forwards",
        flyto: 'flytocart 500ms ease-in-out forwards',
      },
      backgroundImage: {

        'loginbg': "url('/loginbg.png')",
        'loginbg2': "url('/loginbg2.jpg')",


      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tailwindcss-textshadow'),

  ],
}
