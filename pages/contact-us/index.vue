<template>
	<article
		class="contact-page pb-7 pt-7"
	>

		<b-container
			id="first-text"
		>
			<b-row>
				<b-col>
					<animated-title :title="page.title.rendered"></animated-title>
				</b-col>
			</b-row>

			<b-row>
				<b-col
					class="contact-page__acf-content pb-6"
				>
					<div v-html="page.acf.left_content"></div>
				</b-col>
			</b-row>

			<b-row>
				<b-col
					md=7
					class="contact-page__content pb-5"
				>
					<div v-html="page.content.rendered"></div>
				</b-col>
			</b-row>

			<b-row>
				<b-col
					md=8
				>
					<gravity-form
						:formData="formFields"
						:submitUrl="'/form-submit/'"
					></gravity-form>

				</b-col>
			</b-row>
		</b-container>
		<cta-section cta-title="Book a Free Consult"
			button-url="https://calendly.com/josh-studiomurnane/30min?back=1month=2025-03"
			button-text="Architecture + Interiors"
			button2-url="https://calendly.com/cleo-studiomurnane/brand-consult-studio-murnane?month=2025-03"
			button2-text="Brand Development" set-class="left pt-7" />
	</article>
</template>

<style lang="scss">
.fsForm_validation_container {
	display: none;
}
.alert {
	display: inline-block;
}
</style>

<script>
import GravityForm from '@/components/forms/gravity-form'
import API_CONFIG from '@/assets/js/apiConfig.js'
import axios from 'axios'
import CtaSection from '@/components/global/ctaSection'
import AnimatedTitle from '@/components/global/AnimatedTitle.vue'
// const consola = require('consola')

export default {
	components: {
		GravityForm,
		CtaSection,
		AnimatedTitle
	},
	data(){
		return {
			selected: 'null',
			formFields: '',
			input_values: {
			},
			showForm: true,
			page: ''
		}
	},
	mounted() {
		let self = this;
		axios.get('/load-form/',{
			withCredentials: true
		})
			.then(function (response) {
				// handle success
				// console.log(response);
				self.formFields = response.data
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				// always executed
			});
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
					href: "https://studiomurnane.com/" + this.page.slug
				}
			]
		}
	},
	async asyncData (context) {
		return context.app.$axios.$get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '?slug=' + context.route.name)
				.then(function (data) {

					let pageData = data[0];

					// pageData.yoast_meta.forEach(element => {
					// 	let firstValue = element[Object.keys(element)[0]];
					// 	element['hid'] = firstValue
					// });

					return {
						page: pageData,
						structuredData: {
							"@context" : "http://schema.org",
							"@type" : "Article",
							"name" : pageData.title.rendered,
							"headline": pageData.title.rendered,
							"author" : {
								"@type" : "Person",
								"name" : "Studio Murnane",
								"url":context.app.$env.SITE_HOME_URL
							},
							"creator":[
								"Studio Murnane"
							],
							"mainEntityOfPage": {
								"@type": "WebPage",
								"@id": context.app.$env.SITE_HOME_URL + '/contact-us'
							},
							"publisher" : {
								"@type" : "Organization",
								"name" : "Studio Murnane"
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

}

</script>
