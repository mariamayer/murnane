<template>
	<article class="single-project single-project--portfolio">
		<!-- featured image -->
		<featured-img :data="post"></featured-img>

		<!-- intro -->
		<intro-content
			:postContent="post.content.rendered"
			:postTitle="post.title.rendered"
			:specificsList="post.acf.specific_features"
			:taxonomyList="post.pure_taxonomies.portfolio_category"
		></intro-content>

		<!-- flexible content -->
		<flex-content
			:data="post.acf.m_layouts"
			:title="post.title.rendered"
		></flex-content>

		<!-- learn more -->
		<learn-more
			:setClass="'pb-4 pt-6'"
		></learn-more>

		<!-- pagination -->
		<prev-next
			v-if="post.prev_next"
			:data="post.prev_next"
		></prev-next>

	</article>
</template>

<script>
import API_CONFIG from '@/assets/js/apiConfig.js'

import FeaturedImg from '@/components/projects/featuredImg'
import IntroContent from '@/components/projects/introContent'
import FlexContent from '@/components/projects/flexContent'
import LearnMore from '@/components/global/learnMore'
import PrevNext from '@/components/projects/prevNext'

import axios from 'axios'

export default {
	components:{
		FeaturedImg,
		IntroContent,
		FlexContent,
		PrevNext,
		LearnMore
	},
	data(){
		return {
			post: ''
		}
	},
	mounted(){
		let previewID = this.$route.query.preview_id,
			previewNon = this.$route.query.preview_nonce,
			self = this;

		if(previewID && previewNon) {
			axios.get(this.$env.PREVIEW_URL+'previews/v1/preview/?id='+previewID+'&_wpnonce='+previewNon,{
				withCredentials: true
			})
				.then(function (response) {
					// handle success
					self.post = response.data;
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
	beforeDestroy(){
		this.$store.commit('SHOW_PREVIEW_STATE', false);
	},
	head () {
		return {
			title: this.post.title.rendered,
			meta: this.post.yoast_meta,
			__dangerouslyDisableSanitizers: ['script'],
			script: [{
				// innerHTML: JSON.stringify(this.structuredData),
				innerHTML: `{
					"@context" : "http://schema.org",
					"@type" : "Article",
					"name" : "${this.post.title.rendered}",
					"headline": "${this.post.title.rendered}",
					"author" : {
						"@type" : "Person",
						"name" : "Studio Murnane",
						"url":"${this.$env.SITE_HOME_URL}"
					},
					"creator":[
						"Studio Murnane"
					],
					"mainEntityOfPage": {
						"@type": "WebPage",
						"@id": "${this.$env.SITE_HOME_URL+ this.$route.fullPath}"
					},
					"publisher" : {
						"@type" : "Organization",
						"name" : "Studio Murnane"
					},
					"datePublished": "${this.post.date}",
					"dateCreated": "${this.post.date}",
					"dateModified": "${this.post.date}"
				}`,
				type: 'application/ld+json'
			}],
			link: [
				{
					rel: "canonical",
					href: "https://studiomurnane.com" + this.$route.fullPath
				}
			]
		}
	},
	asyncData({$axios,app,params, error}) {
            return $axios.$get(app.$env.PREVIEW_URL + 'wp/v2/portfolio?slug=' + params.slug)
                .then(data => {
					let postData = data[0];

					// postData.yoast_meta.forEach(element => {
					// 	let firstValue = element[Object.keys(element)[0]];
					// 	element['hid'] = firstValue
					// });
					app.store.commit('SHOW_BRANDING_INSTA', true);
					if(app.context.query.preview_id && app.context.query.preview_nonce){
						app.store.commit('SHOW_PREVIEW_STATE', true)
					}

                    return {
                        post: postData,
                    }
                }).catch(e => {
                    // console.log(e);
					error({ statusCode: 404, message: 'Post not found' })
                })
        },
}
</script>
