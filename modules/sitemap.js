const axios = require('axios')
const env = require('dotenv').config();
const sitemap = {
    path: "/sitemap.xml",
	hostname: process.env.HOME_URL,
	generate: false,
	routes () {
		return axios.all([
			axios.get(process.env.BASE_URL+'rmh/v1/portfolio_links'),
			axios.get(process.env.BASE_URL+'rmh/v1/architecture_project')
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
