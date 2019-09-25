<template>
	<article>
		<b-container>
			<b-row>
				<b-col>
					<header class="mb-4">
						<h1 v-html="page.title.rendered"></h1>
					</header>
				</b-col>
			</b-row>
			<b-row
				class="mb-5"
			>
				<b-col
					sm=12
					v-html="page.content.rendered"
				>
				</b-col>
			</b-row>
			<b-row>
				<b-col>
					<b-carousel
						id="carousel-fade"
						indicators
						controls
					>
						<b-carousel-slide
							v-for="slide in page.acf.carousel"
							:key="slide.index"
							:caption="slide.image.caption"
							:img-src="slide.image.url"
						/>

					</b-carousel>
				</b-col>
			</b-row>
		</b-container>
	</article>
</template>

<script>

import API_CONFIG from '@/assets/js/apiConfig.js'

export default {
	head () {
		return {
			title: this.page.title.rendered,
			// meta: [
			//     { hid: 'description', name: 'description', content:  this.page.acf.seo_description},
			//     { hid: 'og:description', property: 'og:description', content:  this.page.acf.seo_description},
			//     { hid: 'og:title', property: 'og:title', content: this.page.acf.seo_title  ? this.page.acf.seo_title: this.page.title.rendered},
			//     { property: 'og:type', content: 'object' },
			//     { property: 'og:image', content: '' },
			// ],
			meta: this.page.yoast_meta,
			__dangerouslyDisableSanitizers: ['script'],
			script: [{
				// innerHTML: JSON.stringify(this.structuredData),
				innerHTML: `{
					"@context" : "http://schema.org",
					"@type" : "NewsArticle",
					"name" : "`+ this.page.title.rendered +`",
					"headline": "`+ this.page.title.rendered +`",
					"datePublished": "`+ this.page.date +`",
					"dateCreated": "`+ this.page.date +`",
					"dateModified": "`+ this.page.date +`",
					"image": "",
					"articleBody": ""
				}`,
				type: 'application/ld+json'
			}]
		}
	},
	async asyncData (context) {
		return context.app.$axios.$get('/site/'+ API_CONFIG.basePagesUrl + '?slug=' + context.route.name)
				.then(function (data) {

					let pageData = data[0];

					pageData.yoast_meta.forEach(element => {
						let firstValue = element[Object.keys(element)[0]];
						element['hid'] = firstValue
					});

					return {
						page: pageData
					}
				})
				.catch(function (error) {
					console.log(error);
				})

	},
	data(){
		return {
			page: '',
		}
	},
};
</script>
