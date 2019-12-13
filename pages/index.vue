<template>
	<article class="home-page home-page--landing">

		<b-container
			id="first-text"
		>
			<b-row>
				<b-col
					class="home-page__col home-page__left-col"
					md=6
					sm=12
				>
					<nuxt-link
						to="/branding"
					>
						<span
							class="bg-img"
							:style="{ backgroundImage: 'url(' + page.acf.gif_branding.url + ')' }"
						>
						</span>
						<span
							class="title title--branding"
							v-html="page.acf.title_branding"
						>
						</span>
					</nuxt-link>
				</b-col>
				<b-col
					class="home-page__col home-page__right-col"
					md=6
					sm=12
				>
					<nuxt-link
						to="/architecture-interiors"
					>
						<span
							class="bg-img"
							:style="{ backgroundImage: 'url(' + page.acf.gif_architecture.url + ')' }"
						>
						</span>
						<span
							class="title title--arch"
							v-html="page.acf.title_architecture"
						>
						</span>
					</nuxt-link>
				</b-col>
			</b-row>
		</b-container>


	</article>
</template>

<script>


import API_CONFIG from '@/assets/js/apiConfig.js'

export default {
	components: {},
	data(){
		return {
			page: '',
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
					href: "https://projectmplus.com"
				}
			]
		}
	},
	async asyncData (context) {

		const wpHome = await context.app.$axios.$get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '/3689');
		return {
			page: wpHome,
			structuredData: {
				"@context" : "http://schema.org",
				"@type" : "Article",
				"name" : wpHome.title.rendered,
				"headline": wpHome.title.rendered,
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
				"datePublished": wpHome.modified,
				"dateCreated": wpHome.modified,
				"dateModified": wpHome.modified,
				"image": "https://wp.projectmplus.com/wp-content/uploads/2019/12/mplus-og-image.jpg"
				// More structured data...
			}
		}

	}
};
</script>
