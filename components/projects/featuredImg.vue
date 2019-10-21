<template>
	<section
		class="single-project__featured-img"
		:style="{ backgroundImage: `url(${data._bean_hero_fullscreen_img ? data._bean_hero_fullscreen_img:data.better_featured_image.source_url})` }"
	>
		<button
			class="single-project__down-arrow"
			@click="smoothScrollTo"
		></button>
	</section>
</template>
<script>
export default {
	props:['data'],
	methods: {
		smoothScrollTo(){
			const element = document.getElementById('single-project-intro');
			if ('scrollBehavior' in document.documentElement.style) {
				return window.scrollTo({
						'behavior': 'smooth',
						'left': 0,
						'top': element.offsetTop
					});
			} else {
				console.log('checked');
				return window.scrollTo(0, element.offsetTop)
			}
		}
	},
}
</script>
