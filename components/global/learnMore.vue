<template>
	<section
		:class="setClass"
	>
		<b-container>
			<b-col
				class="text-center"
			>
				Love what you see? <nuxt-link
										to="contact-us"
										class="btn btn--mplus ml-4"
									>
										Let's talk
									</nuxt-link>
			</b-col>
		</b-container>
	</section>
</template>

<script>
export default {
	props:['setClass']
}
</script>
