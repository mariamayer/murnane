<template>
	<footer
		class="footer"
	>
		<!-- check if branding -->
		<b-container
			class="footer__link-container d-none"
		>
			<b-row>
				<b-col
					class="text-center"
				>
					<a
						v-if="isBrandingPages"
						href="https://www.instagram.com/mplus.studio/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Follow @mplus.studio
					</a>
					<a
						v-else
						href="https://www.instagram.com/projectmplus/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Follow @projectmplus
					</a>

				</b-col>
			</b-row>
		</b-container>


		<client-only>
			<div class="footer__instagram d-none">
				<ul class="instagram-list"
					v-if="isBrandingPages"
				>
					<li
						v-for="(item) in instaB"
						:key="item.id"
					>
						<b-img-lazy
							class="instagram-list__image"
							v-bind="lazyLoadProps"
							:src="item.image"
							:alt="item.alt"
						></b-img-lazy>
						<span
							v-html="item.content"
						>
						</span>
					</li>
				</ul>
				<ul class="instagram-list"
					v-else
				>
					<li
						v-for="(item) in instaA"
						:key="item.id"
					>
						<b-img-lazy
							class="instagram-list__image"
							v-bind="lazyLoadProps"
							:src="item.image"
							:alt="item.alt"
						></b-img-lazy>
						<span
							v-html="item.content"
						>
						</span>
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
				>
					<div v-html="contentLeft"></div>
				</b-col>
				<b-col
					md=4
				>
					<div v-html="contentMiddle"></div>
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
			footerName: '',
			lazyLoadProps: {
				center: true,
				fluidGrow: true,
				blank: true,
				blankColor: '#bbb',
				width: 640,
				height: 581,
			}
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
		instaB(){
			return this.$store.state.instaDesign
		},
		isBrandingPages(){
			return this.$store.state.isBranding
		}
		// instaD(){
		// 	return this.$store.state.instaDesign
		// }
	}
}
</script>
