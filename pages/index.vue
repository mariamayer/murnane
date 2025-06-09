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
						<div class="bg-img-container">
							<div 
								class="bg-img"
								:style="{ backgroundImage: 'url(' + currentBrandingImage + ')' }"
							></div>
						</div>
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
						<div class="bg-img-container">
							<div 
								class="bg-img"
								:style="{ backgroundImage: 'url(' + currentArchitectureImage + ')' }"
							></div>
						</div>
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
			structuredData: '',
			currentBrandingImage: '',
			currentArchitectureImage: '',
			brandingImageIndex: 0,
			architectureImageIndex: 0,
			transitionInterval: 4000,
			isFirstTransition: true
		}
	},

	watch: {
		// Add a watcher to see when page data changes
		'page.acf': {
			handler(newVal) {
				console.log('ACF data changed:', newVal);
				if (newVal && newVal.branding_images) {
					console.log('Branding images found:', newVal.branding_images);
					this.initializeImages();
				}
			},
			immediate: true
		}
	},

	mounted() {
		console.log('Component mounted');
		console.log('Page data at mount:', this.page);
		this.initializeImages();
		this.startSlideshow();
	},

	beforeDestroy() {
		// Clean up intervals when component is destroyed
		if (this.brandingInterval) clearInterval(this.brandingInterval)
		if (this.architectureInterval) clearInterval(this.architectureInterval)
	},
	methods: {
		initializeImages() {
			console.log('Initializing images...');
			console.log('Current page data:', this.page);
			console.log('Current ACF data:', this.page.acf);
			
			// Initialize the first images
			const brandingImages = this.page.acf && this.page.acf.branding_images;
			const architectureImages = this.page.acf && this.page.acf.architecture_images;

			if (brandingImages && brandingImages.length > 0) {
				console.log('Setting initial branding image');
				this.currentBrandingImage = brandingImages[0].url;
			}
			
			if (architectureImages && architectureImages.length > 0) {
				console.log('Setting initial architecture image');
				this.currentArchitectureImage = architectureImages[0].url;
			}
		},
		startSlideshow() {
			console.log('Starting slideshow...');
			console.log('Current branding images:', this.page.acf.branding_images);
			
			// Branding images slideshow - starts immediately
			this.brandingInterval = setInterval(() => {
				const brandingImages = this.page.acf && this.page.acf.branding_images;
				if (brandingImages && brandingImages.length > 0) {
					this.brandingImageIndex = (this.brandingImageIndex + 1) % brandingImages.length;
					this.currentBrandingImage = brandingImages[this.brandingImageIndex].url;
					
					// After first transition, update interval to 4s
					if (this.isFirstTransition) {
						clearInterval(this.brandingInterval);
						this.isFirstTransition = false;
						this.brandingInterval = setInterval(() => {
							if (brandingImages && brandingImages.length > 0) {
								this.brandingImageIndex = (this.brandingImageIndex + 1) % brandingImages.length;
								this.currentBrandingImage = brandingImages[this.brandingImageIndex].url;
							}
						}, this.transitionInterval);
					}
				}
			}, 2000); // First transition after 2s

			this.architectureInterval = setInterval(() => {
				const architectureImages = this.page.acf && this.page.acf.architecture_images;
				if (architectureImages && architectureImages.length > 0) {
					this.architectureImageIndex = (this.architectureImageIndex + 1) % architectureImages.length;
					this.currentArchitectureImage = architectureImages[this.architectureImageIndex].url;
				}
			}, this.transitionInterval);

		}
	},
	head () {
		return {
			title: 'Studio Murnane',
			meta: [
				{
					hid: 'description',
					name: 'description',
					content: 'We are Studio Murnane, a multi-disciplinary design firm in Los Angeles specializing in brand development, architecture, and interior design.'
				},
				{
					hid: 'og:description',
					property: 'og:description',
					content: 'We are Studio Murnane, a multi-disciplinary design firm in Los Angeles specializing in brand development, architecture, and interior design.'
				},
				...(this.page.yoast_meta || []).filter(meta => 
					meta.name !== 'description' && 
					meta.property !== 'og:description'
				)
			],
			__dangerouslyDisableSanitizers: ['script'],
			script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
			link: [
				{
					rel: "canonical",
					href: "https://studiomurnane.com"
				}
			]
		}
	},
	async asyncData (context) {
		const wpHome = await context.app.$axios.$get(context.app.$env.PREVIEW_URL+ API_CONFIG.basePagesUrl + '/3689');
		
		// Detailed logging of the response structure
		console.log('Full API Response:', wpHome);
		console.log('ACF Data:', wpHome.acf);
		console.log('All ACF fields:', Object.keys(wpHome.acf || {}));
		
		// Let's see the exact structure of the branding images field
		if (wpHome.acf) {
			console.log('Branding images field:', wpHome.acf.branding_images);
			console.log('Field type:', typeof wpHome.acf.branding_images);
		}

		return {
			page: wpHome,
			structuredData: {
				"@context" : "http://schema.org",
				"@type" : "Article",
				"name" : wpHome.title.rendered,
				"headline": wpHome.title.rendered,
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
					"@id": context.app.$env.SITE_HOME_URL
				},
				"publisher" : {
					"@type" : "Organization",
					"name" : "Studio Murnane",
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