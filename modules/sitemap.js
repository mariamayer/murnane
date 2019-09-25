const axios = require('axios')
const env = require('dotenv').config();
const sitemap = {
    path: "/sitemap.xml",
	hostname: "https://nuxt-test.fancysquares.blog",
	generate: false,
	routes () {
		return axios.all([
			axios.get(process.env.BASE_URL+'wp/v2/posts?per_page=50'),
		])
		.then(axios.spread((posts) => [...posts.data]))
		.then(posts => posts.map(item => ({
			url: 'posts/' + item.slug,
			changefreq: 'daily',
			priority: 1,
			lastmodISO: new Date().toISOString()
		})))
	},
	/*
	 ** if you want all routes to have a trailing slash in your sitemap
	 */
	// filter ({ routes }) {
	// 	return routes.map(route => {
	// 		route.url = `${route.url}/`
	// 		return route
	// 	})
	// }
}
module.exports = sitemap;
