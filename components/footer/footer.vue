<template>
	<footer class="site-footer">
		<img src="@/assets/images/footer-logo.svg" alt="Murnane" class="footer-bg-logo" aria-hidden="true" />
		<div class="footer-container">
			<div class="footer-left">
				<svg
					class="footer-mobile-logo"
					xmlns="http://www.w3.org/2000/svg"
					width="182"
					height="19"
					viewBox="0 0 182 19"
					fill="none"
					style="display: none;"
				>
					<path d="M39.4886 10.0723C39.4886 13.3697 39.9909 14.5036 42.7075 14.5036C45.424 14.5036 46.0415 13.3182 46.0415 9.91787V0H53.2642V10.5613C53.2642 15.5846 49.1238 18.1341 42.6887 18.1341C37.3373 18.1341 33.292 15.8935 33.292 10.793V0H39.4873V10.0723H39.4886Z" fill="white"/>
					<path d="M72.381 9.08852C77.6935 8.29206 78.2642 5.91268 78.2642 4.50851C78.2642 1.46852 75.1283 0 71.3188 0H59.0742V17.7481H66.3009V10.793H66.7376L73.237 17.7481H80.469L72.381 9.08709V9.08852ZM66.2996 7.16386V3.50042H69.4394C71.4058 3.50042 72.1104 4.31261 72.1104 5.2635C72.1104 6.30591 71.304 7.16386 68.3303 7.16386H66.2996Z" fill="white"/>
					<path d="M84.9102 0H93.333L100.14 9.10282V0H106.333V17.7481H98.4848L89.1939 5.55521V17.7481H84.9102V0Z" fill="white"/>
					<path d="M118.066 0H124.119L132.688 17.7481H125.48L123.941 14.4593H115.529L113.988 17.7481H109.887L118.066 0ZM119.735 5.51231L117.235 10.843H122.234L119.735 5.51231Z" fill="white"/>
					<path d="M0.864258 0H9.07015L14.5032 8.33924L18.7977 0H27.4858V17.7481H21.2906V5.63242L15.0792 17.7481H12.0841L5.13196 6.08713V17.7481H0.864258V0Z" fill="white"/>
					<path d="M163.329 0H180.869V3.86362H170.554V6.80066H178.853V10.6643H170.554V13.8844H181.344V17.7481H163.329V0Z" fill="white"/>
					<path d="M136.097 0H144.518L151.326 9.10282V0H157.518V17.7481H149.67L140.364 5.55521V17.7481H136.097V0Z" fill="white"/>
				</svg>
				<div class="footer-desc">
					Studio Murnane is a multi-disciplinary design firm
					in Los Angeles, specializing in Architecture,
					Interior Design, and Brand Development.
				</div>
				<div class="footer-copyright">
					© Studio Murnane 2025
				</div>
			</div>
			<div class="footer-center"></div>
			<div class="footer-right">
				<ul class="footer__menu footer__menu--main">
					<li v-for="item in footerMenu" :key="item.id">
						<a :href="item.url" rel="noopener">
							{{ item.title }}
						</a>
					</li>
					<li>
						<a href="#" onclick="window._klOnsite && window._klOnsite.push(['openForm', 'RcCkpX']); return false;">Newsletter</a>
					</li>
				</ul>
				<ul class="footer__menu footer__menu--social">
					<li v-for="(item, index) in socialLinks" :key="index">
						<a
							:href="item.link"
							target="_blank"
							rel="noopener noreferrer"
						>
							{{ item.text }}
						</a>
					</li>
				</ul>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'Footer',
	computed: {
		footerMenu() {
			return this.$store.state.footerMenu;
		},
		socialLinks() {
			return this.$store.state.footer.social || [];
		}
	}
}
</script>
