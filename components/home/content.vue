<template>
	<section
		:class="setClass"
	>
		<b-container>
			<b-row
				class="mb-7 mt-7"
				id="first-text"
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
	props:['data','setClass']
}
</script>
