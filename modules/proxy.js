const env = require('dotenv').config();
const proxyApis = {
	"/site/": {
		target:process.env.BASE_URL,
		pathRewrite: { "^/site/": "" },
		changeOrigin: true
	},
	"/load-form/": {
		target: process.env.BASE_URL + "gf/v2/forms/2",
		auth: process.env.G_FORMS_K + ':' + process.env.G_FORMS_K_SECRET,
		pathRewrite: { "^/load-form/": "" },
		changeOrigin: true
	},
	"/form-submit/": {
		target: process.env.BASE_URL + "gf/v2/forms/1/submissions",
		auth: process.env.G_FORMS_K + ':' + process.env.G_FORMS_K_SECRET,
		pathRewrite: { "^/form-submit/": "" },
		changeOrigin: true
	},
	"/newsletter-form/": {
		target: process.env.BASE_URL + "gf/v2/forms/1",
		auth: process.env.G_FORMS_K + ':' + process.env.G_FORMS_K_SECRET,
		pathRewrite: { "^/newsletter-form/": "" },
		changeOrigin: true
	},
	"/newsletter-form-submit/": {
		target: process.env.BASE_URL + "gf/v2/forms/1/submissions",
		auth: process.env.G_FORMS_K + ':' + process.env.G_FORMS_K_SECRET,
		pathRewrite: { "^/newsletter-form-submit/": "" },
		changeOrigin: true
	}
}
module.exports = proxyApis;
