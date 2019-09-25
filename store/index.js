import axios from 'axios'
import API_CONFIG from '@/assets/js/apiConfig.js'

export const state = () => ({
	wordPressMenu: '',
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
	// SET_ACF_OPTIONS(state, payload){
	// 	state.siteSocialLinks = payload.social_icons_g

	// 	state.headerContent = payload.content_header_g

	// 	state.availabilityLink = payload.availability_link_g

	// 	state.forms = {
	// 		title_a: payload.modal_cookie_title_g,
	// 		description_a: payload.modal_cookie_description_g,
	// 		title_b: payload.popup_title_g,
	// 		description_b: payload.popup_description_g,
	// 		title_c: payload.footer_title_g,
	// 		description_c: payload.footer_description_g
	// 	}

	// 	state.homeCta = {
	// 		title: payload.hcta_title,
	// 		button_text: payload.hcta_button_text,
	// 		button_link: payload.hcta_button_link,
	// 	}

	// 	state.sms = payload.sms_phone_number

	// 	state.popup.title = payload.title_popups_one
	// 	state.popup.subTitle = payload.sub_title_popups_one
	// 	state.popup.phone = payload.phone_popups_one
	// 	state.popup.timeOut = parseInt(payload.popup_time)
	// },
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
		// const acfOptionsData = await axios.get(API_CONFIG.betterBase + 'options/acf');
		// const instagram = await axios.get(process.env.BASE_URL + 'wp/v2/instagram');
		commit('SET_MENU', navMenu.data);
		// commit('SET_ACF_OPTIONS', acfOptionsData.data);
		// commit('SET_INSTAGRAM', instagram.data)
	},
}
