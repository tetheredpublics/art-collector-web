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
        specialGreen: "#7BC300",
        beige: "#EADFD0",
        grey: "#EDEDEA",
        greyBorder: "#ADADA9",
        darkBlue: "#0570AD",
        // app colors
        appAmber: "#FB00B8",
        appBackground: "#F5F5F0",
        appBeige: "#EADFD0",
        appBlue: "#0692E2",
        appDarkAmber: "#BD8A00",
        appDarkBlue: "#0570AD",
        appDarkGreen: "#009961",
        appGreen: "#00D084",
        appGrey: "#EDEDEA",
        appGreyBorder: "#BABAB6",
        appGreyShadow: "#ADADAD",
        appLightBlue: "#E6F5FE",
        appLightRed: "#FAEAEA",
        appMagenta: "#C52178",
        appMidBlue: "#8E8EFC",
        appOrange: "#FF69CD",
        appPeach: "#FECDA5",
        appPink: "#FFCEEC",
        appPurple: "#C06BE8",
        appRed: "#CF2D2D",
        appTeal: "#33A7B5",
        appWhite: "#FFFFFF",
        appYellow: "#EDD853"
        
      },
      fontFamily: {
        main: ["Mulish", "sans-serif"]
      },
      boxShadow: {
        'blue': '0px 4px 0px 0px #0570AD;',
        'appbox': '0px 6px 0px 0px #ADADA9;',
        "gray": "0px 4px 0px 0px rgb(156, 163, 175);",
      }
    },
  },
  plugins: [],
}

