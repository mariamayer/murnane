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

		<!-- pagination -->
		<prev-next :data="post.prev_next"></prev-next>

	</article>
</template>

<script>
import API_CONFIG from '@/assets/js/apiConfig.js'

import FeaturedImg from '@/components/projects/featuredImg'
import IntroContent from '@/components/projects/introContent'
import FlexContent from '@/components/projects/flexContent'
import PrevNext from '@/components/projects/prevNext'

export default {
	components:{
		FeaturedImg,
		IntroContent,
		FlexContent,
		PrevNext
	},
	data(){
		return {
			post: ''
		}
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
					"datePublished": "${this.post.date}",
					"dateCreated": "${this.post.date}",
					"dateModified": "${this.post.date}"
				}`,
				type: 'application/ld+json'
			}]
		}
	},
	asyncData({$axios,app,params, error}) {
            return $axios.$get(app.$env.PREVIEW_URL + 'wp/v2/portfolio?slug=' + params.slug)
                .then(data => {
					let postData = data[0];

					postData.yoast_meta.forEach(element => {
						let firstValue = element[Object.keys(element)[0]];
						element['hid'] = firstValue
					});

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
