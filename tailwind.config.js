/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      h1: '36px',
      h2: '32px',
      h3: '24px',
      h4: '20px',
      h5: '16px',
      h6: '14px',
    },
    extend: {
      colors: {
        primary: '#38B3E1',
        dark_primary: '#1490BF',
        secondary: '#EA7408',
        tertiary: '#39F5C7',
        text_blur: '#A8A8A8',
        text_primary: '#064861',
        light_gray: '#F7F9F9',
        danger: '#D41919',
        green: '#1FD01C',
      },
    },
  },
  plugins: [],
};
