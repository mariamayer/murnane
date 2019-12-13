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
			:tax="page.acf.category_list"
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
			script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
			link: [
				{
					rel: "canonical",
					href: "https://projectmplus.com/branding"
				}
			]
		}
	},
	async asyncData (context) {
		// let wpBranding = await context.app.$axios.$get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '?slug=home');
    	// let wpProjectCats = await context.app.$axios.$get(context.app.$env.PREVIEW_URL +'wp/v2/portfolio_category');

		const wpBranding = await context.app.$axios.$get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '?slug=' + context.route.name);
		context.app.store.commit('SHOW_BRANDING_INSTA', true);
		return {
			page: wpBranding[0],
			structuredData: {
				"@context" : "http://schema.org",
				"@type" : "Article",
				"name" : wpBranding[0].title.rendered,
				"headline": wpBranding[0].title.rendered,
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
					"logo" : "https://wp.projectmplus.com/wp-content/uploads/2019/12/mplus-og-image.jpg"
				},
				"datePublished": wpBranding[0].modified,
				"dateCreated": wpBranding[0].modified,
				"dateModified": wpBranding[0].modified,
				"image": "https://wp.projectmplus.com/wp-content/uploads/2019/12/mplus-og-image.jpg"
				// More structured data...
			}
		}

	}
};
</script>
