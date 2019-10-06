<template>
	<article
			class="pt-7 posts-page"
		>
		<b-container
			class="posts-page__container pb-5"
		>
			<b-row>
				<header>
					<h1
						v-html="page.name"
					>
					</h1>
				</header>
			</b-row>
		</b-container>

		<section>
			<b-container
				class="container--full"
			>
				<b-row>
					<nuxt-link
						class="project-preview project-preview--col-replacement col-md-4 col-6"
						v-for="item in posts"
						:key="item.id"
						:to="'/'+item.type+'/'+item.slug"
					>
						<span
							v-html="item.title.rendered"
						></span>
						<b-img-lazy v-bind="mainProps" :src="item.better_featured_image.media_details.sizes['fs-square'] ? item.better_featured_image.media_details.sizes['fs-square'].source_url :item.better_featured_image.source_url" alt=""></b-img-lazy>
					</nuxt-link>

				</b-row>
			</b-container>

			<b-container
				ref="loadingContainer"
				class="pb-6 pt-6"
				v-if="enoughPages"
			>
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
			enoughPages: true,
			postsPage: 2,
			mainProps: {
				center: true,
				fluidGrow: true,
				blank: true,
				blankColor: "#bbb",
				class: "",
				width: 640,
          		height: 581,
			}
		}
	},
	methods: {
		loadMorePosts(){

			let thisButton = this.$refs.loadMoreButton;
			let loadingContainer = this.$refs.loadingContainer;
			let self = this;

			thisButton.setAttribute('disabled', 'true');
			thisButton.innerHTML = 'Loading...'
			this.$axios.get(this.$env.PREVIEW_URL + API_CONFIG.basePostsUrl + `?type[]=portfolio&type[]=architecture_project&filter[portfolio_category]=${this.$route.params.slug}&per_page=9&page=${this.postsPage}`)
			.then(function (response) {
					// get total pages and add to current count
					let totalPages = parseInt(response.headers['x-wp-totalpages']);
					self.postsPage += 1;
					// if the count and total match, hide load button
					// else enable it and keep going
					if(self.postsPage > totalPages){
						thisButton.classList.add('d-none');
						loadingContainer.classList.add('d-none');
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
			title: this.page.name
			// meta: this.page.yoast_meta,
			// __dangerouslyDisableSanitizers: ['script'],
			// script: [{
			// 	// innerHTML: JSON.stringify(this.structuredData),
			// 	innerHTML: `{
			// 		"@context" : "http://schema.org",
			// 		"@type" : "Article",
			// 		"name" : "${this.page.title.rendered}",
			// 		"headline": "${this.page.title.rendered}",
			// 		"author" : {
			// 			"@type" : "Person",
			// 			"name" : "Project M Plus",
			// 			"url":"https://projectmplus.com/"
			// 		},
			// 		"creator":[
			// 			"Project M Plus"
			// 		],
			// 		"mainEntityOfPage": {
			// 			"@type": "WebPage",
			// 			"@id": "https://projectmplus.com`+ this.$route.fullPath +`"
			// 		},
			// 		"publisher" : {
			// 			"@type" : "Organization",
			// 			"name" : "Project M PLus"
			// 		},
			// 		"datePublished": "${this.page.date}",
			// 		"dateCreated": "${this.page.date}",
			// 		"dateModified": "${this.page.date}"
			// 	}`,
			// 	type: 'application/ld+json'
			// }],
			// script: [
			// 	{ src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js' }
			// ],
		}
	},
	async asyncData (context) {

		const pageResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL+ 'wp/v2/portfolio_category?slug=' + context.params.slug);
		const postsResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL + API_CONFIG.basePostsUrl + '?type[]=portfolio&type[]=architecture_project&filter[portfolio_category]=' + context.params.slug +'&per_page=9');

		// console.log(postsResponse.headers['x-wp-totalpages']);
		const totalPostPages = parseInt(postsResponse.headers['x-wp-totalpages']);
		let loadMoreBool = true;
		if(2 > totalPostPages){
			loadMoreBool = false;
		}

		return {
			page: pageResponse.data[0],
			posts: postsResponse.data,
			enoughPages: loadMoreBool
		}

	}
}
</script>
