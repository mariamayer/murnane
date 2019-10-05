<template>
	<article
		class="contact-page pb-7 pt-7"
	>

		<b-container>
			<b-row>
				<b-col>
					<header>
						<h1
							v-html="page.title.rendered"
						>
						</h1>
					</header>
				</b-col>
			</b-row>

			<b-row>
				<b-col
					class="contact-page__acf-content pb-6"
					v-html="page.acf.left_content"
				>
				</b-col>
			</b-row>

			<b-row>
				<b-col
					md=7
					class="contact-page__content pb-5"
					v-html="page.content.rendered"
				>
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
// const consola = require('consola')

export default {
	components: {
		GravityForm
	},
	data(){
		return {
			selected: 'null',
			formFields: '',
			input_values: {
			},
			showForm: true
		}
	},
	destroyed() {

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
					"@type" : "Article",
					"name" : "${this.page.title.rendered}",
					"headline": "${this.page.title.rendered}",
					"author" : {
						"@type" : "Person",
						"name" : "Project M Plus",
						"url":"https://projectmplus.com/"
					},
					"creator":[
						"Project M Plus"
					],
					"mainEntityOfPage": {
						"@type": "WebPage",
						"@id": "https://projectmplus.com`+ this.$route.fullPath +`"
					},
					"publisher" : {
						"@type" : "Organization",
						"name" : "Project M PLus"
					},
					"datePublished": "${this.page.date}",
					"dateCreated": "${this.page.date}",
					"dateModified": "${this.page.date}"
				}`,
				type: 'application/ld+json'
			}],
			// script: [
			// 	{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
			// ],
		}
	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault()
			console.log(JSON.stringify(this.input_values))
		},
		onchange($event, index, id) {
			//console.log($event);
			this.input_values['input_'+id] = $event;
        },

		validateBeforeSubmit($el){
			this.$validator.validateAll().then((result) => {
				if (result) {

					let self = this;

					this.$axios.post('/form-submit/', self.input_values)
						.then(function (response) {

							if(response.data.is_valid === true){
								document.getElementById('form_1_response').innerHTML += response.data.confirmation_message;

								// self.$validator.reset();
								/* Trick to reset/clear native browser form validation state */
								// set to true if re-loading the form
								self.showForm = false
								// self.$nextTick(() => {
								// })
							}
						})
						.catch(function (error) {
							if(error.response ){
								if(error.response.data.is_valid === false ){
									alert('Please refresh and try again');
								}
							}
						});
					// console.log('Form Submitted!');
					return;
				}

			});
		}
	},
	async asyncData (context) {

		const pageResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '/176');
		const formResponse = await context.app.$axios.$get('/load-form/',{withCredentials: true,})

		pageResponse.data.yoast_meta.forEach(element => {
			let firstValue = element[Object.keys(element)[0]];
			element['hid'] = firstValue
		});

		return {
			page: pageResponse.data,
			formFields: formResponse
		}

	}

}

</script>
