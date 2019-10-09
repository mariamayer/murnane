<template>
	<section
		class="home-page__slider"
	>
		<b-carousel
			id="carousel-fade"
			controls
			v-if="data"
		>
			<b-carousel-slide
				v-for="slide in data"
				:key="slide.index"
				:img-src="''"
				:style="{ backgroundImage: 'url(' + slide.image + ')' }"
				:aria-label="slide.title"
			>
				<span
					v-html="slide.title"
					:class="(slide.title_color === 'White' ? 'home-page__slider-white' : 'home-page__slider-black') + ' home-page__slider-text h2'"
					aria-hidden="true"
				>
				</span>
				<nuxt-link
					:to="slide.url_link"
				>
					<span
						v-html="slide.title"
						class="sr-only"
					>
					</span>
				</nuxt-link>
			</b-carousel-slide>

		</b-carousel>
	</section>
</template>

<script>
export default {
	props:['data']
}
</script>
