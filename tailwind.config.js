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
      }
    },
  },
  plugins: [],
}

