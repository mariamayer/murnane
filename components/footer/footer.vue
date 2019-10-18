<template>
	<footer
		class="footer"
	>
		<!-- check if home -->
		<b-container
			class="footer__link-container"
		>
			<b-row>
				<b-col
					class="text-center"
				>
					<a
						href="https://www.instagram.com/projectmplus/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Follow @projectmplus
					</a>
				</b-col>
			</b-row>
		</b-container>

		<!-- instagram, check if home -->
		<client-only>
			<div class="footer__instagram">
				<ul class="instagram-list">
					<li
						v-for="(item,index) in instaA"
						:key="index"
						:style="{ backgroundImage: 'url(' + item.better_featured_image.source_url + ')' }"
						v-html="item.content.rendered"
					>
					</li>
				</ul>
			</div>
		</client-only>

		<!-- misc -->
		<b-container
			class="pt-6 mb-7"
		>
			<b-row>
				<b-col
					md=4
					v-html="contentLeft"
				>
				</b-col>
				<b-col
					md=4
					v-html="contentMiddle"
				>
				</b-col>
				<b-col
					md=4
				>

					<ul class="footer__menu">
						<li
							v-for="item in footerMenu"
							:key="item.id"
						>
							<nuxt-link
								:to="item.url"
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
							v-for="(item,index) in socialLinks"
							:key="index"
						>
							<a
								:href="item.link"
								target="_blank"
								rel="noopener noreferrer"
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
	data(){
		return {
			footerName: ''
		}
	},
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
		instaA(){
			return this.$store.state.instaArchitecture
		},
		instaD(){
			return this.$store.state.instaDesign
		}
	}
}
</script>
