<template>
	<article class="home-page">

		<intro-slider
			:data="page.acf.m_slider"
		></intro-slider>

		<content-block
			:data="page.content.rendered"
		></content-block>

		<masonry-content
			:tax="taxonomy"
			:data="page.acf.project_selector"
		></masonry-content>


	</article>
</template>

<script>
import IntroSlider from '@/components/home/slider'
import ContentBlock from '@/components/home/content'
import MasonryContent from '@/components/home/masonry'

import API_CONFIG from '@/assets/js/apiConfig.js'

export default {
	components: {
		IntroSlider,
		ContentBlock,
		MasonryContent
	},
	data(){
		return {
			page: '',
			taxonomy: ''
		}
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
			}],
			script: [
				{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
			],
		}
	},
	async asyncData ({$axios}) {
		const pageResponse = await $axios.get('/site/'+ API_CONFIG.basePagesUrl + '/5');
		const taxResponse = await $axios.get('/site/wp/v2/portfolio_category');

		pageResponse.data.yoast_meta.forEach(element => {
			let firstValue = element[Object.keys(element)[0]];
			element['hid'] = firstValue
		});

		return {
			page: pageResponse.data,
			taxonomy: taxResponse.data
		}

	}
};
</script>
