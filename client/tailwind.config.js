import withMT from "@material-tailwind/react/utils/withMT";

/** @type {import('tailwindcss').Config} */
export default withMT({
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         fontFamily: {
            gabarito: "Gabarito",
            acme: "Acme",
            roboto: "Roboto",
         },
         colors: {
            "c-blue": "#0099ff",
            "white-smoke": "#F5F5F5",
            "c-black": "#1E1E1E",
         },
      },
   },
   plugins: [],
});
