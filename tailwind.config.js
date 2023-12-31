/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F1",
        specialBackground: "#8ED1FC",
        primary: "#0692E2",
        link: "#066AAB",
        specialGreen: "#7BC300"
      },
      fontFamily: {
        main: ["Mulish", "sans-serif"]
      },
      boxShadow: {
        'blue': '0px 4px 0px 0px rgb(30 58 138);',
      }
    },
  },
  plugins: [],
}

