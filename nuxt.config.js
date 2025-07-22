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
		title: 'Studio Murnane',
		titleTemplate: '%s – Brand, Architecture, and Interior Design',
		meta: [
			{ charset: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				hid: 'og:image',
				property: "og:image",
				content: "https://wp.projectmplus.com/wp-content/uploads/2024/04/cropped-StudioMurnane_Favicon.jpeg"
			},
			{
				hid: 'og:title',
				property: "og:title",
				content: "Studio Murnane"
			}
		],
		link: [{ rel: "icon", type: "image/jpg", href: "https://wp.projectmplus.com/wp-content/uploads/2024/04/cropped-StudioMurnane_Favicon.jpeg" },
			{ rel: "stylesheet", href: "https://use.typekit.net/dqk4qab.css" }],
		script: [
			{
				src: `https://polyfill.io/v3/polyfill.min.js?features=${features}`,
				body: true,
				type: "text/javascript"
			},
			{
				hid: 'fb-pixel',
				innerHTML: `!function(f,b,e,v,n,t,s)
				{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
				n.callMethod.apply(n,arguments):n.queue.push(arguments)};
				if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
				n.queue=[];t=b.createElement(e);t.async=!0;
				t.src=v;s=b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t,s)}(window, document,'script',
				'https://connect.facebook.net/en_US/fbevents.js');
				fbq('init', '1098142239018489');
				fbq('track', 'PageView');`,
				type: 'text/javascript',
				charset: 'utf-8'
			},
			{
				src: 'https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=VnVavY',
				async: true,
				type: 'text/javascript'
			}
		],
		__dangerouslyDisableSanitizersByTagID: {
			'fb-pixel': ['innerHTML']
		},
		noscript: [
			{
				hid: 'fb-pixel-noscript',
				innerHTML: `<img height="1" width="1" style="display:none"
				src="https://www.facebook.com/tr?id=1098142239018489&ev=PageView&noscript=1"
				/>`
			}
		]
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: {
		color: "#212121",
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
		{ src: `~plugins/what-input.js`, ssr: true },
		{ src: `~plugins/sentry.js`, ssr: false }
	],
	/*
	 ** Global middleware
	 */
	router: {
	},
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
				{ key: 'PREVIEW_URL', default: process.env.BASE_URL },
				{ key: 'SITE_HOME_URL', default: process.env.HOME_URL }
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
			id: 'dqk4qab'
		}
	},
	/*
	 ** Site map w/ promise returned
	 */
	sitemap: SITE_MAP,
	/*
	 ** Redirects example
	 */
	redirect: SITE_REDIRECTS,
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
		extend(config, ctx) {
			if (process.env.NODE_ENV !== 'production') {
				config.devtool = '#source-map';
			}
			// if (ctx.isDev && ctx.isClient) {
			// 	config.module.rules.push({
			// 		enforce: 'pre',
			// 		test: /\.(js|vue)$/,
			// 		loader: 'eslint-loader',
			// 		exclude: /(node_modules)/,
			// 	});
			// }
			if (
				config.optimization.splitChunks &&
				typeof config.optimization.splitChunks === 'object'
			) {
				// config.optimization.splitChunks.maxSize = 650000;
				config.optimization.splitChunks.maxSize = 900000;
			}
		}
	}
};
