/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

	theme: {
		extend: {
			fontFamily: {
				sofia: ["Sofia", "cursive"],
			},
			colors: {
				rose: "#BE123C",
			},
			screens: {
				ss: "350px",
				xs: "500px",
				sm: "767px",
				md: "980px",
				ex: "1060px",
				lg: "1200px",
				xl: "1700px",
			},
		},
	},
	plugins: [],
};
