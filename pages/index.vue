<template>
	<article class="home-page">

		<intro-slider
			v-if="page.acf.m_slider"
			:data="page.acf.m_slider"
		></intro-slider>

		<content-block
			:data="page.content.rendered"
			:setClass="'home-page__intro'"
		></content-block>

		<masonry-content
			v-if="page.acf.project_selector"
			:tax="taxonomy"
			:data="page.acf.project_selector"
		></masonry-content>

		<section
			class="mb-7"
		>
			<mail-chimp></mail-chimp>
		</section>


	</article>
</template>

<script>
import IntroSlider from '@/components/home/slider'
import ContentBlock from '@/components/home/content'
import MasonryContent from '@/components/home/masonry'
import MailChimp from '@/components/global/mailchimp'

import API_CONFIG from '@/assets/js/apiConfig.js'

import axios from 'axios'

export default {
	components: {
		IntroSlider,
		ContentBlock,
		MasonryContent,
		MailChimp
	},
	data(){
		return {
			page: '',
			taxonomy: '',
			structuredData: ''
		}
	},
	head () {
		return {
			title: this.page.title ? this.page.title.rendered : '',
			meta: this.page.yoast_meta,
			__dangerouslyDisableSanitizers: ['script'],
			script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }]
		}
	},
	// asyncData ({params, app, error }) {

	// 	return app.$axios.$get(app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '?slug=home').then(homeData => {
	// 		return Promise.all([
	// 			app.$axios.$get(app.$env.PREVIEW_URL +'wp/v2/portfolio_category')
	// 		]).then((projectCategories) => {

	// 			let pageData = homeData[0];
	// 			let taxData = projectCategories[0];

	// 			pageData.yoast_meta.forEach(element => {
	// 				let firstValue = element[Object.keys(element)[0]];
	// 				element['hid'] = firstValue
	// 			});

	// 			return {
	// 				page: pageData,
	// 				taxonomy: taxData,
	// 				structuredData: {
	// 					"@context" : "http://schema.org",
	// 					"@type" : "Article",
	// 					"name" : pageData.title.rendered,
	// 					"headline": pageData.title.rendered,
	// 					"author" : {
	// 						"@type" : "Person",
	// 						"name" : "Project M Plus",
	// 						"url":pageData.link
	// 					},
	// 					"creator":[
	// 						"Project M Plus"
	// 					],
	// 					"mainEntityOfPage": {
	// 						"@type": "WebPage",
	// 						"@id": pageData.link
	// 					},
	// 					"publisher" : {
	// 						"@type" : "Organization",
	// 						"name" : "Project M PLus"
	// 					},
	// 					"datePublished": pageData.modified,
	// 					"dateCreated": pageData.modified,
	// 					"dateModified": pageData.modified
	// 					// More structured data...
	// 				}
	// 			}
	// 		})
	// 	}).catch(e => {
	// 		console.log(e)
	// 		// error({ statusCode: 404, message: 'Seller not found' })
	// 	});

	// }
	async asyncData (context) {
		// let wpHome = await context.app.$axios.$get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '?slug=home');
    	// let wpProjectCats = await context.app.$axios.$get(context.app.$env.PREVIEW_URL +'wp/v2/portfolio_category');

		const wpHome = await context.app.$axios.$get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '?slug=home');
		const wpProjectCats = await context.app.$axios.$get(context.app.$env.PREVIEW_URL +'wp/v2/portfolio_category');

		return {
			page: wpHome[0],
			taxonomy: wpProjectCats,
			structuredData: {
				"@context" : "http://schema.org",
				"@type" : "Article",
				"name" : wpHome[0].title.rendered,
				"headline": wpHome[0].title.rendered,
				"author" : {
					"@type" : "Person",
					"name" : "Project M Plus",
					"url":context.app.$env.SITE_HOME_URL
				},
				"creator":[
					"Project M Plus"
				],
				"mainEntityOfPage": {
					"@type": "WebPage",
					"@id": context.app.$env.SITE_HOME_URL
				},
				"publisher" : {
					"@type" : "Organization",
					"name" : "Project M PLus",
					"logo" : "http://projectmplus.com/wp-content/uploads/2019/09/mplus-og-image.jpg"
				},
				"datePublished": wpHome[0].modified,
				"dateCreated": wpHome[0].modified,
				"dateModified": wpHome[0].modified,
				"image": "http://projectmplus.com/wp-content/uploads/2019/09/mplus-og-image.jpg"
				// More structured data...
			}
		}

	}
	// async asyncData (context) {
	// 	let wpHome = await context.app.$axios.$get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '?slug=home');
    // 	let wpProjectCats = await context.app.$axios.$get(context.app.$env.PREVIEW_URL +'wp/v2/portfolio_category');

	// 	return Promise.all([
	// 			wpHome, wpProjectCats
	// 		]).then(() => {

	// 			let pageData = wpHome[0];
	// 			let taxData = wpProjectCats;

	// 			return {
	// 				page: pageData,
	// 				taxonomy: taxData,
	// 				structuredData: {
	// 					"@context" : "http://schema.org",
	// 					"@type" : "Article",
	// 					"name" : pageData.title.rendered,
	// 					"headline": pageData.title.rendered,
	// 					"author" : {
	// 						"@type" : "Person",
	// 						"name" : "Project M Plus",
	// 						"url":pageData.link
	// 					},
	// 					"creator":[
	// 						"Project M Plus"
	// 					],
	// 					"mainEntityOfPage": {
	// 						"@type": "WebPage",
	// 						"@id": pageData.link
	// 					},
	// 					"publisher" : {
	// 						"@type" : "Organization",
	// 						"name" : "Project M PLus",
	// 						"logo" : "http://projectmplus.com/wp-content/uploads/2019/09/mplus-og-image.jpg"
	// 					},
	// 					"datePublished": pageData.modified,
	// 					"dateCreated": pageData.modified,
	// 					"dateModified": pageData.modified,
	// 					"image": "http://projectmplus.com/wp-content/uploads/2019/09/mplus-og-image.jpg"
	// 					// More structured data...
	// 				}
	// 			}

	// 	}).catch(e => {
	// 		console.log(e)
	// 		// error({ statusCode: 404, message: 'Seller not found' })
	// 	});

	// }
};
</script>
