<template>
	<footer
		class="footer"
	>
		<!-- check if home -->
		<b-container></b-container>

		<!-- instagram, check if home -->
		<div></div>

		<!-- misc -->
		<b-container
			class="pt-6 mb-7"
		>
			<b-row>
				<b-col
					sm=12
					md=4
					v-html="contentLeft"
				>
				</b-col>
				<b-col
					sm=12
					md=4
					v-html="contentMiddle"
				>
				</b-col>
				<b-col
					sm=12
					md=4
				>

					<ul class="footer__menu">
						<li
							v-for="item in footerMenu"
							:key="item.id"
						>
							<nuxt-link
								to=""
							>
								{{item.title}}
							</nuxt-link>
						</li>
					</ul>

				</b-col>
			</b-row>
		</b-container>

		<!-- social mail -->
		<b-container
			class="pb-4"
		>
			<b-row>
				<b-col>
					<ul class="footer__social">
						<li
							v-for="item in socialLinks"
							:key="item.index"
						>
							<a
								:href="item.link"
								target="_blank"
							>
								{{item.text}}
							</a>
						</li>
					</ul>
				</b-col>
			</b-row>
		</b-container>
	</footer>
</template>

<script>
export default {
	computed: {
		contentLeft(){
			return this.$store.state.footer.content_left;
		},
		contentMiddle(){
			return this.$store.state.footer.content_middle;
		},
		socialLinks(){
			return this.$store.state.footer.social;
		},
		footerMenu(){
			return this.$store.state.footerMenu;
		},
	}
}
</script>
