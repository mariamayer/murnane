<template>
	<section
		class="single-project__pagination pt-6"
		>

		<b-container
			class="single-project__full-container"
		>
			<b-row
				align-h="between"
			>
				<nuxt-link
					:to="data.previous_post.slug"
					class="single-project__pagination-link single-project__prev col-12 col-md-6"
					v-if="data.previous_post.name"
				>
					<span class="h3 mb-5">
						Previous Project
					</span>
						<span class="h1">
							<span class="spacer">←</span> {{data.previous_post.name}}
						</span>
						<span
							class="single-project__pagination-bg"
							:style="{ backgroundImage: `url(${data.previous_post.featured_img})` }"
						>
						</span>
				</nuxt-link>
				<b-col
					v-else
					md=6
				>
				</b-col>
				<nuxt-link
					:to="data.next_post.slug"
					class="single-project__pagination-link single-project__next col-12 col-md-6 align-self-end"
					v-if="data.next_post.name"
				>
						<span
							class="single-project__pagination-bg"
							:style="{ backgroundImage: `url(${data.next_post.featured_img})` }"
						>
						</span>
						<span class="h3 mb-5">
							Next Project
						</span>
						<span class="h1">
							{{data.next_post.name}} <span class="spacer">→</span>
						</span>
				</nuxt-link>

			</b-row>
		</b-container>

	</section>
</template>

<script>
export default {
	props:['data']
}
</script>
