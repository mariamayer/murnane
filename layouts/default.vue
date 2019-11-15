<template>
	<div>

		<skip-content></skip-content>

		<main-nav></main-nav>
		<main>
			<nuxt />
		</main>

		<main-footer
			v-if="homePage"
		></main-footer>

		<!-- todo: make into component, why you so lazy -->
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
	</div>
</template>

<script>
import MainNav from '~/components/header/nav'
import MainFooter from '~/components/footer/footer'
import SkipContent from '@/components/global/skipContent'
import axios from 'axios'

export default {
	components: {
		MainNav,
		MainFooter,
		SkipContent
	},
	computed: {
		loadingPreview(){
			return this.$store.state.previewLoading;
		},
		homePage(){
			if(this.$nuxt.$route.path === '/'){
				return false;
			} else {
				return true;
			}
		}
	},
	mounted(){
		console.log('%cDevelopment by FancySquares.blog', 'font-size:12px;color:red');
	}
}
</script>

