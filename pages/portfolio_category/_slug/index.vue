<template>
	<article
			class="pt-7 posts-page"
		>
		<b-container
			class="container--xl pb-5 portfolio-category-header"
			id="first-text"
		>
			<b-row>
				<b-col>
					<header>
						<h1
							v-html="page.name"
							class="mb-4"
						>
						</h1>
						<div 
							class="category-description mb-6"
							v-html="page.description"
						></div>
					</header>
				</b-col>
			</b-row>
		</b-container>

		<section class="portfolio-grid-section pb-5">
			<b-container
				class="container--xl overflow-hidden"
			>
				<b-row class="portfolio-grid">
					<div
						class="portfolio-item col-md-6 col-lg-4 p-0"
						v-for="item in posts"
						:key="item.id"
					>
						<nuxt-link
							:to="item.page_link"
							class="portfolio-item__link"
						>
							<div class="portfolio-item__image">
								<b-img-lazy v-bind="mainProps" :src="item.image" :alt="item.name"></b-img-lazy>
							</div>
							<div class="portfolio-item__content p-0">
								<h3 class="portfolio-item__title mb-0" v-html="item.name"></h3>
								<div 
									v-if="item.acf && item.acf.sub_title"
									class="portfolio-item__tagline"
									v-html="item.acf.sub_title"
								></div>
							</div>
						</nuxt-link>
					</div>
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

		<!-- CTA Section -->
		<portfolio-cta-section 
			cta-title="Love what you see?"
			button-url="/contact-us"
			button-text="LET'S WORK TOGETHER"
		/>
	</article>
</template>

<script>
import API_CONFIG from '@/assets/js/apiConfig.js'
import PortfolioCtaSection from '@/components/global/PortfolioCtaSection'
import axios from 'axios'

export default {
	components: {
		PortfolioCtaSection
	},
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
			this.$axios.get(this.$env.PREVIEW_URL + `rmh/v1/multiple_types/${this.$route.params.slug}?page=${this.postsPage}`)
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
		}
	},
	async asyncData (context) {

		const pageResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL+ 'wp/v2/portfolio_category?slug=' + context.params.slug);
		const postsResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL + 'rmh/v1/multiple_types/' + context.params.slug);

		console.log('Posts Response:', postsResponse.data);
		console.log('First post item structure:', postsResponse.data[0]);
		
		// Add ACF data to each post item
		const postsWithAcf = await Promise.all(postsResponse.data.map(async (item) => {
			try {
				// Check what properties are available
				console.log('Item properties:', Object.keys(item));
				console.log('Item ID:', item.id || item.ID);
				console.log('Item post_type:', item.post_type);
				
				// Use the correct property names based on what's available
				const postId = item.id || item.ID;
				const postType = item.post_type || 'portfolio'; // fallback to portfolio
				
				if (!postId) {
					console.log('No ID found for item:', item);
					return { ...item, acf: {} };
				}
				
				// Fetch ACF data for each post
				const acfResponse = await context.app.$axios.get(context.app.$env.PREVIEW_URL + `wp/v2/${postType}/${postId}?_embed`);
				console.log(`ACF for ${item.name}:`, acfResponse.data.acf);
				return {
					...item,
					acf: acfResponse.data.acf || {}
				};
			} catch (error) {
				console.log(`Error fetching ACF for ${item.name}:`, error);
				return {
					...item,
					acf: {}
				};
			}
		}));

		const totalPostPages = parseInt(postsResponse.headers['x-wp-totalpages']);
		let loadMoreBool = true;
		if(2 > totalPostPages){
			loadMoreBool = false;
		}

		return {
			page: pageResponse.data[0],
			posts: postsWithAcf,
			enoughPages: loadMoreBool
		}

	}
}
</script>

<style lang="scss" scoped>
.posts-page { 
	@media (max-width: 991px) {
		padding-top: 6rem;
	}
	h1 {
		color: var(--Murnane-Cinnamon-Web, #380E11);
		font-family: "ivarfine-light";
		font-size: 4rem;
		letter-spacing: 0.08rem;
		@media (max-width: 991px) {
			font-size: 2.25rem;
		}
	}

	.category-description {
		color: var(--Murnane-Cinnamon-Web, #380E11);
		font-family: Indivisible;
		font-size: 1.125rem;
		font-style: normal;
		font-weight: 400;
		line-height: 1.75rem; /* 155.556% */
		max-width: 45rem;
		@media (max-width: 991px) {
			font-size: 1rem;
		}
	}
}
.portfolio-grid-section {
	.portfolio-grid {
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: 5rem 2rem; // 80px vertical, 32px horizontal
		@media (max-width: 991px) {
			gap: 2rem 1rem;
		}
	}
	
	.portfolio-item {
		flex: 0 0 calc(33.333% - 1.333rem); // Account for gap
		max-width: calc(33.333% - 1.333rem);
		
		@media (max-width: 991px) {
			flex: 0 0 calc(50% - 1rem); // 2 columns on medium screens
			max-width: calc(50% - 1rem);
		}
		
		@media (max-width: 767px) {
			flex: 0 0 100%; // 1 column on small screens
			max-width: 100%;
		}
		
		&__link {
			display: block;
			text-decoration: none;
			color: inherit;
			
			&:hover {
				text-decoration: none;
				
				.portfolio-item__image img {
					transform: scale(1.05);
				}
			}
		}
		
		&__image {
			margin-bottom: 1rem;
			overflow: hidden;
			
			img {
				width: 100%;
				height: auto;
				display: block;
				transition: transform 0.3s ease-out;
			}
		}
		
		&__content {
			padding: 0 0.5rem;
		}
		
		&__title {
			color: var(--Murnane-Cinnamon-Web, #380E11);
			font-family: "ivarfine-light";
			font-size: 2rem;
			letter-spacing: 0.04rem;
			@media (max-width: 991px) {
				font-size: 1.5rem;
			}
		}
		
		&__tagline {
			color: var(--Murnane-Cinnamon-Web, #380E11);
			font-family: Indivisible;
			font-size: 1rem;
			font-style: normal;
			font-weight: 400;
			line-height: 1.75rem;
			opacity: 0.5;
			@media (max-width: 991px) {
				font-size: 0.875rem;
			}
		}
	}
}
</style>

