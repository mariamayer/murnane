<template>
	<article
			class="pt-7 pb-7 posts-page"
		>
		<b-container
			class="posts-page__container pb-5"
			id="first-text"
		>
			<b-row>
				<header>
					<h1>
						The Journal
					</h1>
				</header>
			</b-row>
		</b-container>

		<section>
			<b-container
				class="posts-page__container"
			>
				<b-row
					class="overflow-hidden"
				>
					<!-- journal starts -->
					<article
						class="col-md-6 col-lg-4 col-12 pb-6 posts-page__post"
						v-for="(post,index) in posts"
						:key="index"
					>
						<a
							:href="post.external_link"
							target="_blank"
							rel="noopener noreferrer"
							aria-hidden="true"
							class="posts-page__post-img"
						>
							<b-img-lazy
								v-bind="mainProps"
								:src="post.featured_img"
								:alt="''"
							></b-img-lazy>
							<span
								class="h3"
							>
								Continue Reading
							</span>
						</a>
						<header>
							<time
								:datetime="post.date"
								class="mb-3 h3 pt-4"
							>
								{{post.date}}
							</time>
							<h2
								class="mb-4"
							>
								<a
									:href="post.external_link"
									target="_blank"
									rel="noopener noreferrer"
									class="posts-page__post-link"
									v-html="post.name"
								>
								</a>
							</h2>
						</header>
						<div
							class="posts-page__post-copy"
							v-html="post.copy"
						></div>
					</article>
				</b-row>
			</b-container>

			<b-container>
				<b-row>
					<b-col
						class="text-center"
					>
						<button
							class="btn btn--mplus"
							ref="loadMoreButton"
							@click="loadMorePosts"
						>
							Load More
						</button>
					</b-col>
				</b-row>
			</b-container>
		</section>
	</article>
</template>

<script>
import API_CONFIG from '@/assets/js/apiConfig.js'
import axios from 'axios'

export default {
	data() {
		return {
			page: '',
			posts:'',
			postsPage: 2,
			mainProps: {
				center: true,
				fluidGrow: true,
				blank: true,
				blankColor: '#bbb',
				width: 403,
				height: 270,
			}
		}
	},
	methods: {
		loadMorePosts(){
			// console.log(this.$refs.loadMoreButton);
			let thisButton = this.$refs.loadMoreButton;
			let self = this;

			thisButton.setAttribute('disabled', 'true');
			thisButton.innerHTML = 'Loading...'
			this.$axios.get(this.$env.PREVIEW_URL + `rmh/v1/posts?per_page=9&page=${this.postsPage}`)
			.then(function (response) {
					// get total pages and add to current count
					let totalPages = parseInt(response.headers['x-wp-totalpages']);
					self.postsPage += 1;
					// if the count and total match, hide load button
					// else enable it and keep going
					if(self.postsPage > totalPages){
						thisButton.classList.add('d-none');
					} else {
						thisButton.removeAttribute('disabled');
						thisButton.innerHTML = 'Load More'
					}
					//add new posts to the page
					response.data.forEach(element => {
						self.posts.push(element)
					});

				})
				.catch(function (error) {
					// handle error
					console.log(error);
					thisButton.innerHTML = 'OH NO! Something went wrong'
				})
				.finally(function () {
					// always executed
				});
		}
	},
	head () {
		return {
			title: this.page.name,
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
						"url":"${this.$env.SITE_HOME_URL}"
					},
					"creator":[
						"Project M Plus"
					],
					"mainEntityOfPage": {
						"@type": "WebPage",
						"@id": "${this.$env.SITE_HOME_URL+ this.$route.fullPath}"
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
			link: [
				{
					rel: "canonical",
					href: "https://projectmplus.com" + this.$route.fullPath
				}
			]
		}
	},
	async asyncData (context) {

		const pageResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '/609');
		const postsResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL + 'rmh/v1/posts?per_page=9&page=1');

		// pageResponse.data.yoast_meta.forEach(element => {
		// 	let firstValue = element[Object.keys(element)[0]];
		// 	element['hid'] = firstValue
		// });

		return {
			page: pageResponse.data,
			posts: postsResponse.data
		}

	}
}
</script>
