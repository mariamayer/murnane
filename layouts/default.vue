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
	}
}
</script>

