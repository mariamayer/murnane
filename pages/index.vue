<template>
	<article class="home-page">

		<intro-slider
			:data="page.acf.m_slider"
		></intro-slider>

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

		</b-container>
	</article>
</template>

<script>
import IntroSlider from '@/components/home/slider'

import API_CONFIG from '@/assets/js/apiConfig.js'

export default {
	components: {
		IntroSlider
	},
	head () {
		return {
			title: this.page.title.rendered,
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
		return context.app.$axios.$get('/site/'+ API_CONFIG.basePagesUrl + '/5')
				.then(function (data) {

					let pageData = data;

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
