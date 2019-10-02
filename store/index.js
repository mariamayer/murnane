import axios from 'axios'
import API_CONFIG from '@/assets/js/apiConfig.js'

export const state = () => ({
	wordPressMenu: '',
	footerMenu: '',
	gravityForms: '',
	footer: {
		content_left: '',
		content_middle: '',
		social: ''
	}
	// siteSocialLinks: '',
	// headerContent: '',
	// availabilityLink: '',
	// instagram: '',
	// bodyClass: '',
	// forms: '',
	// instagramClass: '',
	// baseClass: '',
	// homeCta: '',
	// sms: '',
	// popup: {
	// 	title: '',
	// 	subTitle: '',
	// 	phone: '',
	// 	timeOut: ''
	// }
})


export const mutations = {
	// add(state, title) {
	// 	state.list.push(title)
	// }
	SET_MENU(state, payload){
		state.wordPressMenu = payload
		// console.log('no');
	},
	SET_FOOTER_MENU(state, payload){
		state.footerMenu = payload
		// console.log('no');
	},
	SET_FORMS(state, payload){
		state.gravityForms = payload
		// console.log('no');
	},
	SET_ACF_OPTIONS(state, payload){
		state.footer.content_left = payload.acf.content_left_f;
		state.footer.content_middle = payload.acf.content_middle_f;
		state.footer.social = payload.acf.social_links;
	},
	// SET_INSTAGRAM(state, payload){
	// 	state.instagram = payload
	// },
	// SET_BODY_CLASS(state, payload){
	// 	state.bodyClass = payload
	// },
	// SET_BASE_CLASS(state, payload){
	// 	state.baseClass = payload
	// },
	// SET_INSTAGRAM_CLASS(state, payload){
	// 	state.instagramClass = payload
	// }
}



export const actions = {
	async nuxtServerInit({commit}) {
		const navMenu = await axios.get(this.$env.PREVIEW_URL + API_CONFIG.mainMenuUrl);
		const footerMenu = await axios.get(this.$env.PREVIEW_URL + API_CONFIG.footerMenuUrl);
		const acfOptionsData = await axios.get(this.$env.PREVIEW_URL + 'acf/v3/options/options');
		// const instagram = await axios.get(process.env.BASE_URL + 'wp/v2/instagram');
		commit('SET_MENU', navMenu.data);
		commit('SET_FOOTER_MENU', footerMenu.data);
		commit('SET_ACF_OPTIONS', acfOptionsData.data);
		// commit('SET_INSTAGRAM', instagram.data)
	},
}
