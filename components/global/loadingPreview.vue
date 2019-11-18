<template>
	<div
		v-if="loadingPreview"
		id="loading-preview"
		class="loading-preview"
	>
		<div
			class="loading-preview__content"
		>
			<span
				class="h1"
			>
				Loading Preview
			</span>
			<div class="lds-ripple"><div></div><div></div></div>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		loadingPreview(){
			return this.$store.state.previewLoading;
		}
	}
}
</script>
