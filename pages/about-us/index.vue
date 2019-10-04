<template>
	<article class="about-page">
		<!-- home slider -->
		<intro-slider
			:data="page.acf.m_slider"
		></intro-slider>

		<!-- home content block -->
		<content-block
			:data="page.acf.opening_statement"
			:class="'about-page__intro'"
		></content-block>

		<!-- services -->
		<services-block
			:data="page.acf.services_s_five"
		></services-block>

		<!-- staff -->
		<staff-content
			:leadership="page.acf.principles"
			:employees="page.acf.company_staff"
		></staff-content>

		<!-- clients -->
		<clients-content
			:clientsTitle="page.acf.title_s_nine"
			:clients="page.acf.client_list_s_nine"
		></clients-content>

		<!-- learn more -->
		<learn-more
			:setClass="'pb-7'"
		></learn-more>

		<!-- careers -->
		<careers-content
			:sectionTitle="page.acf.title_careers"
			:sectionLocation="page.acf.location_careers"
			:sectionContent="page.acf.description_careers"
			:currentJobs="careers"
		></careers-content>

	</article>
</template>

<script>
import IntroSlider from '@/components/home/slider'
import ContentBlock from '@/components/home/content'
import ServicesBlock from '@/components/about/services'
import StaffContent from '@/components/about/staff'
import ClientsContent from '@/components/about/clients'
import LearnMore from '@/components/global/learnMore'
import CareersContent from '@/components/about/careers'

import API_CONFIG from '@/assets/js/apiConfig.js'

export default {
	components: {
		IntroSlider,
		ContentBlock,
		ServicesBlock,
		StaffContent,
		ClientsContent,
		LearnMore,
		CareersContent
	},
	data(){
		return {
			page: '',
			careers: ''
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
		}
	},
	async asyncData (context) {

		const pageResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '/1680');
		const caerresResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL+ API_CONFIG.careersUrl);

		pageResponse.data.yoast_meta.forEach(element => {
			let firstValue = element[Object.keys(element)[0]];
			element['hid'] = firstValue
		});

		return {
			page: pageResponse.data,
			careers: caerresResponse.data
		}

	}
};
</script>
