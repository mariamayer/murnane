<template>
	<article class="error-article">
		<b-container>
			<b-row
				align-v="center"
				class="vh-row"
			>
				<b-col
				>

					<header>
						<h1 v-if="error.statusCode === 404">
							<span class="error-big">404</span> OH NO!
						</h1>
						<h1 v-else>An error occurred</h1>
					</header>

					<nuxt-link to="/">
						<img src="~/assets/images/hiding.gif">
					</nuxt-link>

				</b-col>
			</b-row>
		</b-container>
	</article>

</template>

<style lang="scss" scoped>
.vh-row {
	margin: 0 auto;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}
.error-article {
	padding-top: 0;
}
</style>

<script>
    export default {
        props: ['error'],
    }
</script>
