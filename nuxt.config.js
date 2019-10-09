const SITE_MAP = require("./modules/sitemap.js");
const SITE_REDIRECTS = require("./modules/redirects.js");
const SITE_PROXY = require("./modules/proxy.js");

const features = [
	'es6',
	'EventSource'
].join('%2C');

module.exports = {
	mode: "universal",
	//debug: true,
	// server: {
	// 	port: 8000, // default: 3000
	// },
	/*
	 ** Headers of the page
	 */
	head: {
		htmlAttrs: {
			lang: 'en-US',
		},
		title: process.env.npm_package_name || "",
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: "description",
				name: "description",
				content: process.env.npm_package_description || ""
			},
			{
				hid: 'og:image',
				property: "og:image",
				content: "http://projectmplus.com/wp-content/uploads/2019/09/mplus-og-image.jpg"
			},
			{
				hid: 'og:title',
				property: "og:title",
				content: "Project M Plus"
			},
			{
				name: 'robots',
				content: 'noindex, nofollow'
			}
		],
		link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
		script: [
			{
				src: `https://polyfill.io/v3/polyfill.min.js?features=${features}`,
				body: true,
				type: "text/javascript"
			},
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		color: "#FFA500",
		height: "8px"
	},
	/*
	 ** Global CSS
	 */
	css: [
		"~/assets/scss/main.scss"
	],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		{ src: "~plugins/isotope.js", ssr: false },
		{ src: `~plugins/vee-validate.js`, ssr: true },
		{ src: `~plugins/what-input.js`, ssr: true }
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [],
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// https://github.com/nuxt-community/analytics-module
		['@nuxtjs/google-analytics', {
			id: 'UA-50556431-1'
		}],
		// Doc: https://bootstrap-vue.js.org/docs/
		"bootstrap-vue/nuxt",
		// Doc: https://axios.nuxtjs.org/usage
		"@nuxtjs/axios",
		'@nuxtjs/sitemap',
		'nuxt-trailingslash-module',
		"@nuxtjs/redirect-module",
		['nuxt-env', {
			keys: [
				{ key: 'PREVIEW_URL', default: process.env.BASE_URL } // Specify a default value
			]
		}],
		'nuxt-webfontloader'
	],
	bootstrapVue: {
		bootstrapCSS: false, // or `css`
		bootstrapVueCSS: false // or `bvCSS`
	},
	/*
	 ** fonts
	 */
	webfontloader: {
		typekit: {
			id: 'soa4xnj'
		}
	},
	/*
	 ** Site map w/ promise returned
	 */
	sitemap: SITE_MAP,
	/*
	 ** Redirects example
	 */
	// redirect: SITE_REDIRECTS,
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {
		proxy: true
	},
	proxy: SITE_PROXY,
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {}
	}
};
