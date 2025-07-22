<template>

	<header
		class="header header--main"
	>

		<div class="header__container container--xl" :class="{ 'header--dark': isDarkHeader }">
			<div class="header__side">
				<div v-if="$route.path !== '/'" class="header-links">
					<nuxt-link
						to="/branding"
						class="header-link"
						:class="{ 'header-link--underline': $route.path === '/branding' }"
					>
						Brand Development
					</nuxt-link>
					<nuxt-link
						to="/architecture-interiors"
						class="header-link"
						:class="{ 'header-link--underline': $route.path === '/architecture-interiors' }"
					>
						Architecture &amp; Interior Design
					</nuxt-link>
				</div>
			</div>
			<nuxt-link to="/" aria-label="home link">
				<svg class="site-logo" xmlns="http://www.w3.org/2000/svg" width="180" height="17" viewBox="0 0 180 17" fill="none">
				<g clip-path="url(#clip0_2318_71)">
				<path d="M38.5219 9.44236C38.5219 12.5335 39.0229 13.5965 41.7322 13.5965C44.4416 13.5965 45.0574 12.4853 45.0574 9.29759V0H52.2609V9.9008C52.2609 14.6099 48.1315 17 41.7135 17C36.3764 17 32.3418 14.8995 32.3418 10.118V0H38.5206V9.44236H38.5219Z" :fill="isDarkHeader ? '#380E11' : 'white'"/>
				<path d="M71.3258 8.52011C76.6242 7.77346 77.1933 5.5429 77.1933 4.22654C77.1933 1.37668 74.0659 0 70.2664 0H58.0544V16.6381H65.2619V10.118H65.6974L72.1795 16.6381H79.3923L71.3258 8.51877V8.52011ZM65.2606 6.71582V3.2815H68.3921C70.3533 3.2815 71.056 4.0429 71.056 4.93432C71.056 5.91153 70.2517 6.71582 67.2859 6.71582H65.2606Z" :fill="isDarkHeader ? '#380E11' : 'white'"/>
				<path d="M83.8214 0H92.2219L99.0112 8.53351V0H105.187V16.6381H97.36L88.0938 5.20777V16.6381H83.8214V0Z" :fill="isDarkHeader ? '#380E11' : 'white'"/>
				<path d="M116.889 0H122.926L131.473 16.6381H124.284L122.749 13.555H114.359L112.823 16.6381H108.732L116.889 0ZM118.554 5.16756L116.061 10.1649H121.047L118.554 5.16756Z" :fill="isDarkHeader ? '#380E11' : 'white'"/>
				<path d="M0 0H8.18406L13.6027 7.81769L17.8858 0H26.5508V16.6381H20.372V5.28016L14.1772 16.6381H11.19L4.25635 5.70643V16.6381H0V0Z" :fill="isDarkHeader ? '#380E11' : 'white'"/>
				<path d="M162.032 0H179.525V3.62198H169.239V6.37534H177.515V9.99732H169.239V13.0161H180V16.6381H162.032V0Z" :fill="isDarkHeader ? '#380E11' : 'white'"/>
				<path d="M134.873 0H143.272L150.061 8.53351V0H156.237V16.6381H148.41L139.129 5.20777V16.6381H134.873V0Z" :fill="isDarkHeader ? '#380E11' : 'white'"/>
				</g>
				<defs>
				<clipPath id="clip0_2318_71">
				<rect width="180" height="17" fill="white"/>
				</clipPath>
				</defs>
				</svg>
			</nuxt-link>
			<div class="header__side header__side--right">
				<b-button
					@click="showModal"
					class="navigation-modal__button-toggle"
					aria-label="toggle navigation"
				>
				<svg xmlns="http://www.w3.org/2000/svg" width="19" height="13" viewBox="0 0 19 13" fill="none">
				<line y1="0.5" x2="19" y2="0.5" :stroke="isDarkHeader ? '#380E11' : 'white'"/>
				<line y1="6.5" x2="19" y2="6.5" :stroke="isDarkHeader ? '#380E11' : 'white'"/>
				<line y1="12.5" x2="19" y2="12.5" :stroke="isDarkHeader ? '#380E11' : 'white'"/>
				</svg>
				</b-button>
			</div>
		</div>

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
						:to="'/' + item.slug"
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
	},
	computed:{
		menuItems(){
			return this.$store.state.wordPressMenu
		},
		isDarkHeader() {
			return this.$route.path === '/contact-us' || 
			   this.$route.path === '/journal' || 
			   this.$route.path.startsWith('/portfolio_category/') ||
			   (this.$route.path !== '/' && 
			    this.$route.path !== '/branding' && 
			    this.$route.path !== '/architecture-interiors' && 
			    this.$route.path !== '/about-us' && 
			    this.$route.path !== '/contact-us' && 
			    this.$route.path !== '/journal' && 
			    !this.$route.path.startsWith('/portfolio/') && 
			    !this.$route.path.startsWith('/architecture_project/') && 
			    this.$route.path.split('/').length === 2);
		}
	}
}
</script>
