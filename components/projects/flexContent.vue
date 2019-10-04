<template>
	<div>
		<section
			v-for="(layout,index) in data"
			:key="index"
			>
			<div v-if="layout.acf_fc_layout === 'full_width_image'">
				<b-img-lazy
					:src="layout.full_width_image"
					v-bind="bLazyProps"
					:alt="'the ' +title +' image'"
				></b-img-lazy>
			</div>

			<b-container
				v-else-if="layout.acf_fc_layout === 'two_column_contained'"
			>
				<b-row>
					<b-col
						cols=6
					>
						<b-img-lazy
							:src="layout.image_left_c"
							v-bind="bLazyProps"
							:alt="'the ' +title +' image'"
						></b-img-lazy>
					</b-col>
					<b-col
						cols=6
					>
						<b-img-lazy
							:src="layout.image_right_c"
							v-bind="bLazyProps"
							:alt="'the ' +title +' image'"
						></b-img-lazy>
					</b-col>
				</b-row>
			</b-container>

			<b-container
				v-else-if="layout.acf_fc_layout === 'single_image_contained'"
			>
				<b-row>
					<b-col
						cols=12
					>
						<b-img-lazy
							:src="layout.full_width_image_c"
							v-bind="bLazyProps"
							:alt="'the ' +title +' image'"
						></b-img-lazy>
					</b-col>
				</b-row>
			</b-container>

			<b-container
				v-else-if="layout.acf_fc_layout === 'two_column_full_w'"
				class="single-project__full-container"
			>
				<b-row>
					<b-col
						cols=6
					>
						<b-img-lazy
							:src="layout.image_left"
							v-bind="bLazyProps"
							:alt="'the ' +title +' image'"
						></b-img-lazy>
					</b-col>
					<b-col
						cols=6
					>
						<b-img-lazy
							:src="layout.image_right"
							v-bind="bLazyProps"
							:alt="'the ' +title +' image'"
						></b-img-lazy>
					</b-col>
				</b-row>
			</b-container>

			<b-container
				v-else
				class="single-project__copy"
			>
				<b-row>
					<b-col
						cols=12
						v-html="layout.m_content_block"
						class="pt-6 pb-6"
					>
					</b-col>
				</b-row>
			</b-container>

		</section>
	</div>
</template>

<script>
export default {
	props:['data','title'],
	data(){
		return {
			bLazyProps: {
				center: true,
				fluidGrow: true,
				blank: true,
				blankColor: '#bbb',
				width: 1024,
				height: 650,
				class:'mb-4'
			}
		}
	}
}
</script>
