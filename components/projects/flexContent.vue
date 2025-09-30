<template>
	<div>
		<section
			v-for="(layout,index) in data"
			:key="index"
			>
			<!-- Full width image layout -->
			<div v-if="layout.acf_fc_layout === 'full_width_image'">
				<b-img-lazy
					:src="layout.full_width_image"
					v-bind="bLazyProps"
					:alt="'the ' +title +' image'"
				></b-img-lazy>
			</div>

			<!-- Full width video layout -->
			<div v-else-if="layout.acf_fc_layout === 'full_width_video'">
				<video
					:src="layout.full_width_video"
					autoplay
					muted
					loop
					playsinline
					class="w-100 mb-4"
					preload="auto"
				></video>
			</div>

			<!-- Two column contained layout -->
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

			<!-- Two column contained video layout -->
			<b-container
				v-else-if="layout.acf_fc_layout === 'two_column_contained_video'"
			>
				<b-row>
					<b-col
						cols=6
					>
						<video
							:src="layout.video_left_c"
							autoplay
							muted
							loop
							playsinline
							class="w-100 mb-4"
							preload="auto"
						></video>
					</b-col>
					<b-col
						cols=6
					>
						<video
							:src="layout.video_right_c"
							autoplay
							muted
							loop
							playsinline
							class="w-100 mb-4"
							preload="auto"
						></video>
					</b-col>
				</b-row>
			</b-container>

			<!-- Single image contained layout -->
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

			<!-- Single video contained layout -->
			<b-container
				v-else-if="layout.acf_fc_layout === 'single_video_contained'"
			>
				<b-row>
					<b-col
						cols=12
					>
						<video
							:src="layout.full_width_video_c"
							autoplay
							muted
							loop
							playsinline
							class="w-100 mb-4"
							preload="auto"
						></video>
					</b-col>
				</b-row>
			</b-container>

			<!-- Two column full width layout -->
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

			<!-- Two column full width video layout -->
			<b-container
				v-else-if="layout.acf_fc_layout === 'two_column_full_w_video'"
				class="single-project__full-container"
			>
				<b-row>
					<b-col
						cols=6
					>
						<video
							:src="layout.video_left"
							autoplay
							muted
							loop
							playsinline
							class="w-100 mb-4"
							preload="auto"
						></video>
					</b-col>
					<b-col
						cols=6
					>
						<video
							:src="layout.video_right"
							autoplay
							muted
							loop
							playsinline
							class="w-100 mb-4"
							preload="auto"
						></video>
					</b-col>
				</b-row>
			</b-container>

			<!-- Content block layout -->
			<b-container
				v-else
				class="single-project__copy"
			>
				<b-row>
					<b-col
						cols=12
						class="pt-6 pb-6"
					>
						<div v-html="layout.m_content_block"></div>
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

<style scoped>
video {
	max-width: 100%;
	height: auto;
}
</style>
