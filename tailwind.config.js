module.exports = {
	mode: "jit",
	purge: [],
	darkMode: "media", // or 'media' or 'class'
	theme: {
		extend: {}
	},
	variants: {
		extend: {}
	},
	plugins: [require("@tailwindcss/forms")]
};
