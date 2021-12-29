export default {
	// Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
	ssr: true,

	// Target: https://go.nuxtjs.dev/config-target
	target: "static",

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: "My Yaml GUI",
		htmlAttrs: {
			lang: "en"
		},
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ hid: "description", name: "description", content: "" },
			{ name: "format-detection", content: "telephone=no" }
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
			{
				href: "https://fontlist.vercel.app/css?family=Inter:ital,wght@0,500;0,700;0,800;0,400&family=Space%20Grotesk:ital,wght@0,700;0,500;0,400&display=swap",
				rel: "stylesheet"
			}
		]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		"@nuxtjs/eslint-module",
		// https://go.nuxtjs.dev/tailwindcss
		"@nuxtjs/tailwindcss"
	],

	generate: {
		dir: "dist"
	},

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [],

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {}
};
