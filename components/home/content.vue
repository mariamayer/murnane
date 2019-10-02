<template>
	<section
		class="home-page__intro"
	>
		<b-container>
			<b-row
				class="mb-7 mt-7"
			>
				<b-col
					sm=12
					v-html="data"
				>
				</b-col>
			</b-row>
		</b-container>
	</section>
</template>

<script>
export default {
	props:['data']
}
</script>
