<template>

	<article>
		<b-container>
			<b-row>
				<b-col>

					<header>
						<h1>
							testing content preview
						</h1>
					</header>

					<pre>
						{{post}}
					</pre>
				</b-col>
			</b-row>
		</b-container>
	</article>

</template>


<script>
// import API_CONFIG from '@/assets/js/apiConfig.js';
import axios from 'axios'

export default {
	mounted() {
		let previewID = this.$route.query.preview_id,
			previewNon = this.$route.query.preview_nonce,
			self = this;
		axios.get(this.$env.PREVIEW_URL+'previews/v1/preview/?id='+previewID+'&_wpnonce='+previewNon,{
			withCredentials: true
		})
			.then(function (response) {
				// handle success
				// console.log(response.data);
				self.post = response.data
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				// always executed
			});

	},
	data(){
		return {
			post: ''
		}
	},
	head () {
		return {
			title: 'Posts Preview | Rory Heaney',
			meta: [
				{ hid: 'robots', name: 'robots', content: 'noindex, nofollow' }
			]
		}
	}

}

</script>
