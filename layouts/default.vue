<template>
	<div>
		<main-nav></main-nav>
		<main>
			<nuxt />
		</main>
		<main-footer></main-footer>
	</div>
</template>

<script>
import MainNav from '~/components/header/nav'
import MainFooter from '~/components/footer/footer'
import axios from 'axios'

export default {
	components: {
		MainNav,
		MainFooter
	},
	beforeMount() {
		let self = this;
		axios.get('/newsletter-form/',{
			withCredentials: true
		})
			.then(function (response) {
				self.$store.commit('SET_FORMS', response.data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				// always executed
			});
	}
}
</script>

