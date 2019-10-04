<template>
	<div class="rmh-form">
		<div id="rmh-form-response"></div>

		<b-form @submit.prevent="validateBeforeSubmit" v-show="showForm">

			<div v-for="(inputType,index) in formData.fields" :key="inputType.id">

				<!-- text inputs -->
				<b-form-group
					v-if="inputType.type == 'text'"
					:id="'input-group-'+inputType.id"
					:label="inputType.label"
					:label-for="'form-'+formData.id+'-'+inputType.id"
					:description="inputType.description"
				>
					<b-form-input
						:id="'form-'+formData.id+'-'+inputType.id"
						:name="'input_'+inputType.id"
						:type="inputType.type"
						:placeholder="inputType.placeholder"
						:data-vv-as="inputType.label"
						v-model="input_values['input_' + inputType.id]"
						v-validate="inputType.isRequired ?'required|alpha_spaces': ''"
					></b-form-input>
					<span v-show="errors.has('input_'+inputType.id)" class="alert alert-warning">{{ errors.first('input_'+inputType.id) }}</span>
				</b-form-group>
				<!-- email inputs -->
				<b-form-group
					v-if="inputType.type == 'email'"
					:id="'input-group-'+inputType.id"
					:label="inputType.label"
					:label-for="'form-'+formData.id+'-'+inputType.id"
					:description="inputType.description"
				>
					<b-form-input
						:id="'form-'+formData.id+'-'+inputType.id"
						:name="'input_'+inputType.id"
						:type="inputType.type"
						:placeholder="inputType.placeholder"
						:data-vv-as="inputType.label"
						v-model="input_values['input_' + inputType.id]"
						v-validate="inputType.isRequired ?'required|email': ''"
					></b-form-input>
					<span v-show="errors.has('input_'+inputType.id)" class="alert alert-warning">{{ errors.first('input_'+inputType.id) }}</span>
				</b-form-group>
				<!-- text area -->
				<b-form-group
					v-else-if="inputType.type == 'textarea'"
					:id="'input-group-'+inputType.id"
					:label="inputType.label"
					:label-for="'form-'+formData.id+'-'+inputType.id"
					:description="inputType.description"
				>
					<b-form-textarea
						:id="'form-'+formData.id+'-'+inputType.id"
						:name="'input_'+inputType.id"
						:type="inputType.type"
						:placeholder="inputType.placeholder"
						rows="6"
						:data-vv-as="inputType.label"
						v-model="input_values['input_' + inputType.id]"
						v-validate="inputType.isRequired ?'required|max:250': ''"
					></b-form-textarea>
					<span v-show="errors.has('input_'+inputType.id)" class="alert alert-warning">{{ errors.first('input_'+inputType.id) }}</span>
				</b-form-group>
				<!-- select -->
				<b-form-group
					v-else-if="inputType.type == 'select'"
					:id="'input-group-'+inputType.id"
					:label="inputType.label"
					:label-for="'form-'+formData.id+'-'+inputType.id"
				>
					<b-form-select
						:id="'form-'+formData.id+'-'+inputType.id"
						:name="'input_'+inputType.id"
						:value="input_values['input_' + inputType.id] ? input_values['input_' + inputType.id] : ''"
						:data-vv-as="inputType.label"
						v-model="selected"
						v-validate="'excluded:null'"
						@change="onchange($event, index, id=inputType.id)"
					>

						<option
							v-for="item in inputType.choices" :key="item.text"
							:value="item.value"
							:selected="item.isSelected"
						>{{item.text}}</option>
					</b-form-select>
					<span v-show="errors.has('input_'+inputType.id)" class="alert alert-warning">{{ errors.first('input_'+inputType.id) }}</span>
				</b-form-group>

			</div>

			<!-- honeypot -->
			<b-form-group
					class="gfield fsForm_validation_container field_sublabel_below field_description_below gfield_visibility_visible"
					:id="'input-group-'+formData.nextFieldId"
					label="First Name"
					:label-for="'form-'+formData.id+'-'+formData.nextFieldId"
					description="This field is for validation purposes and should be left unchanged."
				>
				<b-form-input
					:id="'form-'+formData.id+'-'+formData.nextFieldId"
					:name="'input_'+formData.nextFieldId"
					type="text"
					placeholder="enter copy here"
					v-model="input_values['input_' + formData.nextFieldId]"
				></b-form-input>
			</b-form-group>

			<b-button type="submit" variant="primary">Submit</b-button>
		</b-form>
	</div>
</template>

<style lang="scss">
.fsForm_validation_container {
	display: none;
}
.alert {
	display: inline-block;
}
</style>

<script>
import axios from 'axios'
// const consola = require('consola')

export default {
	props:['formData','submitUrl'],
	data(){
		return {
			selected: 'null',
			input_values: {
			},
			showForm: true
		}
	},
	destroyed() {

	},
	head () {

	},
	methods: {
		onSubmit(evt) {
			evt.preventDefault()
			console.log(JSON.stringify(this.input_values))
		},
		onchange($event, index, id) {
			//console.log($event);
			this.input_values['input_'+id] = $event;
        },

		validateBeforeSubmit($el){
			this.$validator.validateAll().then((result) => {
				if (result) {

					let self = this;
					let url = this.submitUrl;

					this.$axios.post(url, self.input_values)
						.then(function (response) {

							if(response.data.is_valid === true){
								document.getElementById('rmh-form-response').innerHTML += response.data.confirmation_message;

								// self.$validator.reset();
								/* Trick to reset/clear native browser form validation state */
								// set to true if re-loading the form
								self.showForm = false
								// self.$nextTick(() => {
								// })
							}
						})
						.catch(function (error) {
							if(error.response ){
								if(error.response.data.is_valid === false ){
									alert('Please refresh and try again');
								}
							}
						});
					// console.log('Form Submitted!');
					return;
				}

			});
		}
	},
	// asyncData(context) {

	// 	return context.app.$axios.$get('/load-form/',{withCredentials: true,})
	// 		.then(data => {
	// 			return {
	// 				formData: data
	// 			}
	// 		}).catch(e => {
	// 			consola.log(e);
	// 		})

	// }

}

</script>
