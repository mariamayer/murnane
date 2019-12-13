<template>
	<div :class="{'change-nav-button': homePage === false}">

		<skip-content></skip-content>

		<main-nav></main-nav>
		<main>
			<nuxt />
		</main>

		<main-footer
			v-if="homePage"
		></main-footer>

		<!-- load preview content -->
		<loading-preview></loading-preview>
	</div>
</template>

<script>
import MainNav from '~/components/header/nav'
import MainFooter from '~/components/footer/footer'
import SkipContent from '@/components/global/skipContent'
import LoadingPreview from '@/components/global/loadingPreview'
import axios from 'axios'

export default {
	components: {
		MainNav,
		MainFooter,
		SkipContent,
		LoadingPreview
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

