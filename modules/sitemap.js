const axios = require('axios')
const env = require('dotenv').config();
const sitemap = {
    path: "/sitemap.xml",
	hostname: "https://projectmplus.com",
	generate: false,
	routes () {
		return axios.all([
			axios.get(process.env.BASE_URL+'deep-thoughts/v2/portfolio?per_page=50'),
			axios.get(process.env.BASE_URL+'wp/v2/architecture_project?per_page=50')
		])
		.then(axios.spread((portfolio, archProject) => [
			...portfolio.data.map(item => '/portfolio/' + item.slug),
			...archProject.data.map(item => '/architecture_project/' + item.slug),
			// ...ico.data
		]))
		// .then(axios.spread((portfolio, ico) => [...users.data, ...ico.data]))
		// .then(axios.spread((posts) => [...posts.data]))
		// .then(posts => posts.map(item => ({
		// 	url: 'posts/' + item.slug,
		// 	changefreq: 'daily',
		// 	priority: 1,
		// 	lastmodISO: new Date().toISOString()
		// })))
	}
}
module.exports = sitemap;
