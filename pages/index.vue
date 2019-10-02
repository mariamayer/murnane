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

		<!-- <gravity-form
			:formData="newsLetter"
			submitUrl="/form-submit/"
		></gravity-form> -->

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
// import GravityForm from '@/components/forms/gravity-form'

import API_CONFIG from '@/assets/js/apiConfig.js'

export default {
	components: {
		IntroSlider,
		ContentBlock,
		MasonryContent,
		MailChimp
		// GravityForm
	},
	data(){
		return {
			page: '',
			taxonomy: ''
		}
	},
	// computed: {
	// 	newsLetter(){
	// 		return this.$store.state.gravityForms
	// 	}
	// },
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
	async asyncData (context) {

		const pageResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '/5');
		const taxResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL +'wp/v2/portfolio_category');

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
