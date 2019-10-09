<template>

	<header
		class="header header--main"
	>

		<nuxt-link to="/" aria-label="home link">
			<img
				src="~/assets/images/main-logo.svg"
				class="site-logo"
				alt=""
			>
		</nuxt-link>

		<b-button
			@click="showModal"
			class="navigation-modal__button-toggle"
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
				variant="outline-danger"
				block
				@click="hideModal"
				aria-label="close modal"
				ref="focusThis"
			>
				x
			</b-button>

			<ul>
				<li
					v-for="item in menuItems"
					:key="item.ID"
				>
					<nuxt-link
						v-if="item.slug === '/'"
						to="/"
					>
						<span @click="hideModal">
							{{item.title}}
						</span>
					</nuxt-link>
					<nuxt-link
						:to="'/'+ item.slug"
					>
						<span @click="hideModal">
							{{item.title}}
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
