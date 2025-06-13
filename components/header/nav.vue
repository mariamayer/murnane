<template>

	<header
		class="header header--main"
	>

		<nuxt-link to="/" aria-label="home link">
			<img
				src="~/assets/images/main-logo.svg"
				class="site-logo"
				aria-hidden="true"
				alt=""
			>
		</nuxt-link>

		<b-button
			@click="showModal"
			class="navigation-modal__button-toggle"
			aria-label="toggle navigation"
		>
			<span></span>
			<span></span>
			<span></span>
		</b-button>

		<b-modal
			ref="my-modal"
			hide-footer
			hide-header
			title=""
			modal-class="navigation-modal"
			centered
			no-close-on-backdrop
			@shown="focusOnClose"
			@hide="removeClass"
		>

			<b-button
				class="navigation-modal__close"
				variant="link"
				block
				@click="hideModal"
				aria-label="close modal"
				ref="focusThis"
			>
			<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
				<path d="M18 1L1 18" stroke="white"/>
				<path d="M1 1L18 18" stroke="white"/>
			</svg>
			</b-button>

			<ul>
				<li
					v-for="item in menuItems"
					:key="item.ID"
				>
					<nuxt-link
						v-if="item.slug === '/'"
						to="/"
						v-on:keyup.enter.native="onEnter"
					>
						<span
							@click="hideModal"
							v-html="item.title"
						>
						</span>
					</nuxt-link>
					<nuxt-link
						:to="'/'+ item.slug"
						v-on:keyup.enter.native="onEnter"
					>
						<span
							@click="hideModal"
							v-html="item.title"
						>
						</span>
					</nuxt-link>
				</li>
			</ul>

		</b-modal>

	</header>

</template>

<script>
export default {
	methods: {
		showModal() {
			this.$refs['my-modal'].show()
		},
		hideModal() {
			this.$refs['my-modal'].hide()
		},
		onEnter() {
			this.$refs['my-modal'].hide();
		},
		focusOnClose(){
			this.$refs.focusThis.focus()

			setTimeout(() => {
				this.$refs.focusThis.classList.add('navigation-modal__close--opacity')
			}, 300);
		},
		removeClass() {
			this.$refs.focusThis.classList.remove('navigation-modal__close--opacity')
		}
		// toggleModal() {
		// 	// We pass the ID of the button that we want to return focus to
		// 	// when the modal has hidden
		// 	this.$refs['my-modal'].toggle('#toggle-btn')
		// }
	},
	computed:{
		menuItems(){
			return this.$store.state.wordPressMenu
		}
	}
}
</script>
