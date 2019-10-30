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
	},
	instaDesign: '',
	instaArchitecture: '',
	previewLoading: false
})


export const mutations = {
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
	SET_INSTAGRAM_D(state, payload){
		state.instaDesign = payload
	},
	SET_INSTAGRAM_A(state, payload){
		state.instaArchitecture = payload
	},
	SHOW_PREVIEW_STATE(state, payload){
		state.previewLoading = payload;
	}
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
		// const instaDesignData = await axios.get(this.$env.PREVIEW_URL + 'wp/v2/instagram_design');
		const instaArchitectureData = await axios.get(this.$env.PREVIEW_URL + 'rmh/v1/architecture_insta');

		commit('SET_MENU', navMenu.data);
		commit('SET_FOOTER_MENU', footerMenu.data);
		commit('SET_ACF_OPTIONS', acfOptionsData.data);
		// commit('SET_INSTAGRAM_D', instaDesignData.data);
		commit('SET_INSTAGRAM_A', instaArchitectureData.data);

	},
}
