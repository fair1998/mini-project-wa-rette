module.exports = {
  purge: ["./pages/**/*.js", "./components/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      prompt: ["Prompt", "sans-serif"],
    },
    colors: {
      black: {
        DEFAULT: "#00010F",
      },
      white: {
        DEFAULT: "#ffffff",
        100: "#DCE5FA",
        200: "#9FB6F2",
        300: "#8195CE",
      },
      blue: {
        DEFAULT: "#256DDB",
        100: "#97E1F1",
        200: "#043D8E",
        300: "#020E43",
        400: "#145BC6",
        500: "#0A2F7C",
        600: "#00044C",
        700: "#0D3474",
      },
      green: {
        DEFAULT: "#26C5A0",
        100: "#09B978",
        200: "#07AB72",
        300: "#0BCE5A",
        400: "#0EF158",
      },
      yellow: {
        DEFAULT: "#FDE232",
        100: "#FAD02E",
        200: "#FFE632",
        300: "#FCE232",
        400: "#ED8E20",
      },
      red: {
        DEFAULT: "#F63C1F",
        100: "#EE5F5B",
        200: "#7E232E",
        300: "#D14340",
        400: "#FF5D59",
      },
    },
    fontSize: {
      fs9: "9px",
      fs12: "12px",
      fs14: "14px",
      fs18: "18px",
      fs24: "24px",
    },
    boxShadow: {
      DEFAULT: "3px 3px 0  rgba(0, 0, 0, 0.1)",
    },
    maxWidth: {
      466: "466px",
      430: "430px",
    },
    extend: {
      backgroundImage: {
        main_image: "url('/bg.png')",
      },
      width: {
        86: "86px",
        140: "140px",
        155: "155px",
        188: "188px",
        190: "190px",
        198: "198px",
        200: "200px",
        272: "272px",
        314: "314px",
        330: "330px",
        340: "340px",
        380: "380px",
        455: "455px",
        760: "760px",
        896: "896px",
      },
      height: {
        26: "26px",
        30: "30px",
        44: "44px",
        75: "75px",
        260: "260px",
        339: "339px",
      },
      textOpacity: {
        56: "0.56",
      },
      inset: {
        1: "1px",
        "-43": "-43px",
        "-44": "-44px",
        50: "50px",
      },
      gap: {
        6: "6px",
        10: "10px",
      },
      borderWidth: {
        5: "5px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
