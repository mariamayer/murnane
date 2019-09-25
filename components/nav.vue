<template>

	<b-navbar toggleable="lg" type="dark" variant="light" fixed="top">
		<b-navbar-toggle target="nav-collapse" class="btn btn-secondary"></b-navbar-toggle>
		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav class="ml-auto">
				<nuxt-link to="/" class="button--green">
					Home
				</nuxt-link>
				<nuxt-link to="/demo" class="button--green">
					Demo Page
				</nuxt-link>
				<nuxt-link to="/contact" class="button--green">
					Demo Contact
				</nuxt-link>
				<a href="https://nuxtjs.org/" target="_blank" class="button--grey">Documentation</a>
				<a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>

</template>
