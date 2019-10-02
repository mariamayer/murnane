<template>
	<article class="single-project single-project--architecture">
		<!-- featured image -->
		<section
			class="single-project__featured-img"
			:style="{ backgroundImage: `url(${post._bean_hero_fullscreen_img ? post._bean_hero_fullscreen_img:post.better_featured_image.source_url})` }"
		>
			<span
				class="single-project__down-arrow"
			></span>
		</section>

		<!-- intro -->
		<section
			class="single-project__intro pt-7 pb-7"
		>
			<b-container>
				<b-row
					align-h="between"
				>
					<b-col
						md="5"
					>
						<header>
							<h1
								v-html="post.title.rendered"
								class="mb-4"
							>
							</h1>
						</header>
						<b-row>
							<b-col
								md=7
							>
								<ul
									class="single-project__specific-features"
								>
									<li
										v-for="item in post.acf.specific_features"
										:key="item.type"
									>
										<b-row>
											<b-col
												cols=4
											>
												<span
													class="single-project__specific-type"
												>
													{{item.type}}
												</span>
											</b-col>
											<b-col
												cols=8
											>
												<span
													class="single-project__specific-desc"
												>
													{{item.descriptor}}
												</span>
											</b-col>
										</b-row>
									</li>
								</ul>
							</b-col>
							<b-col
								md=5
								class="single-project__categories"
							>
								<p>
									Categories
								</p>

								<span
									v-for="item in post.pure_taxonomies.portfolio_category"
									:key="item.term_id"
								>
									#{{item.name}}
								</span>
							</b-col>
						</b-row>
					</b-col>

					<b-col
						md="6"
						v-html="post.content.rendered"
						class="single-project__text"
					></b-col>

				</b-row>
			</b-container>
		</section>

	</article>
</template>

<script>
import API_CONFIG from '@/assets/js/apiConfig.js'

export default {
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
                            "name" : "Rory Heaney",
                            "url":"https://projectmplus.com/"
                        },
                        "creator":[
                            "Rory Heaney"
                        ],
                        "mainEntityOfPage": {
                            "@type": "WebPage",
                            "@id": "https://projectmplus.com`+ this.$route.fullPath +`"
                        },
                        "publisher" : {
                            "@type" : "Organization",
                            "name" : "Project M PLus",
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
            return $axios.$get(app.$env.PREVIEW_URL + 'wp/v2/architecture_project?slug=' + params.slug)
                .then(data => {

                    // console.log(data[0]);
					// $.get( "https://websiteurl.com/wp-json/base/views/" + data[0].id);
					let postData = data[0];

					// console.log(blah.yoast_meta);
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
