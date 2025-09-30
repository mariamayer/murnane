<template>
	<article class="about-page">
		<!-- home slider -->
		<intro-slider v-if="page.acf.m_slider" :data="page.acf.m_slider"></intro-slider>

		<!-- home content block -->
		<content-block v-if="page.acf.opening_statement" :data="page.acf.opening_statement"
			:class="'about-page__intro'"></content-block>

		<!-- services -->
		<services-block v-if="page.acf.services_s_five" :data="page.acf.services_s_five"></services-block>

		<!-- staff -->
		<staff-content v-if="page.acf.principles" :leadership="page.acf.principles"
			:employees="page.acf.company_staff"></staff-content>

		<!-- clients -->
		<clients-content v-if="page.acf.client_list_s_nine" :clientsTitle="page.acf.title_s_nine"
			:clients="page.acf.client_list_s_nine"></clients-content>

		<cta-section cta-title="Love What you See?<br>Book a Free Consult"
			button-url="https://calendly.com/cleo-studiomurnane/brand-consult-studio-murnane"
			button-text="Architecture + Interiors"
			button2-url="https://calendly.com/cleo-studiomurnane/brand-consult-studio-murnane"
			button2-text="Brand Development" set-class="pb-7" />

		<!-- careers -->
		<careers-content :sectionTitle="page.acf.title_careers" :sectionLocation="page.acf.location_careers"
			:sectionContent="page.acf.description_careers" :currentJobs="careers"></careers-content>

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
import CtaSection from '@/components/global/ctaSection'
import API_CONFIG from '@/assets/js/apiConfig.js'
import axios from 'axios'

export default {
	components: {
		IntroSlider,
		ContentBlock,
		ServicesBlock,
		StaffContent,
		ClientsContent,
		LearnMore,
		CtaSection,
		CareersContent
	},
	data() {
		return {
			page: '',
			careers: ''
		}
	},
	mounted() {
		let self = this;
		axios.get(this.$env.PREVIEW_URL + API_CONFIG.careersUrl, {
			withCredentials: true
		})
			.then(function (response) {
				// handle success
				// console.log(response);
				self.careers = response.data
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				// always executed
			});

		let previewID = this.$route.query.preview_id,
			previewNon = this.$route.query.preview_nonce;

		if (previewID && previewNon) {
			axios.get(this.$env.PREVIEW_URL + 'previews/v1/preview/?id=' + previewID + '&_wpnonce=' + previewNon, {
				withCredentials: true
			})
				.then(function (response) {
					// handle success
					self.page = response.data;
					// console.log(response);
					// self.post = response
				})
				.catch(function (error) {
					// handle error
					console.log(error);
				})
				.finally(function () {
					// always executed
					setTimeout(() => {
						self.$store.commit('SHOW_PREVIEW_STATE', false);
					}, 1000);
				});
		}
	},
	head() {
		return {
			title: this.page.title ? this.page.title.rendered : '',
			meta: this.page.yoast_meta,
			__dangerouslyDisableSanitizers: ['script'],
			script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
			link: [
				{
					rel: "canonical",
					href: "https://studiomurnane.com/" + this.page.slug
				}
			]
		}
	},
	async asyncData(context) {
		return context.app.$axios.$get(context.app.$env.PREVIEW_URL + API_CONFIG.basePagesUrl + '?slug=' + context.route.name)
			.then(function (data) {

				let pageData = data[0];

				// pageData.yoast_meta.forEach(element => {
				// 	let firstValue = element[Object.keys(element)[0]];
				// 	element['hid'] = firstValue
				// });
				if (context.query.preview_id && context.query.preview_nonce) {
					context.store.commit('SHOW_PREVIEW_STATE', true)
				}

				return {
					page: pageData,
					structuredData: {
						"@context": "http://schema.org",
						"@type": "Article",
						"name": pageData.title.rendered,
						"headline": pageData.title.rendered,
						"author": {
							"@type": "Person",
							"name": "Studio Murnane",
							"url": context.app.$env.SITE_HOME_URL
						},
						"creator": [
							"Studio Murnane"
						],
						"mainEntityOfPage": {
							"@type": "WebPage",
							"@id": context.app.$env.SITE_HOME_URL + '/about-us'
						},
						"publisher": {
							"@type": "Organization",
							"name": "Studio Murnane"
						},
						"datePublished": pageData.modified,
						"dateCreated": pageData.modified,
						"dateModified": pageData.modified
						// More structured data...
					}
				}
			})
			.catch(function (error) {
				console.log(error);
			})
	}
};
</script>
