<template>
	<section
		class="about-page__staff overflow-hidden"
		>

		<b-container>
			<b-row>

				<b-col
					cols=6
					md=4
					lg=3
					class="about-page__staff-individual"
					v-for="(person,index) in leadership"
					:key="person.profile_image.ID"
				>
					<b-button
						v-b-modal="'modal-leadership-'+index"
						class="btn--blank"
					>
						<span
							class="about-page__staff-individual-wrapper"
						>
							<span
								class="about-page__staff-name"
							>
								<span
									v-html="person.name"
									class="h2"
								>
								</span>
								<span
									v-html="person.title"
									class="h3"
								>
								</span>
							</span>
							<b-img-lazy
								v-bind="mainProps"
								:src="person.profile_image.url"
								:alt="person.name"
							></b-img-lazy>
						</span>
					</b-button>

					<b-modal
						:id="'modal-leadership-'+index"
						title=""
						centered
						@shown="addOpacity"
						modal-class="modal-leadership"
						hide-footer
					>

						<span
							class="h3"
							v-html="person.title"
						>
						</span>
						<span
							class="h2 mb-5"
							v-html="person.name"
						></span>

						<div
							v-html="person.description"
							class="mb-5"
						></div>

						<nuxt-link
							to="contact-us"
							class="btn btn--mplus"
						>
							Let's talk
						</nuxt-link>
					</b-modal>
				</b-col>

				<b-col
					cols=6
					md=4
					lg=3
					class="about-page__staff-individual"
					v-for="person in employees"
					:key="person.staff_member.ID"
				>
					<span
						class="about-page__staff-individual-wrapper"
					>
						<span
							class="about-page__staff-name"
						>
							<span
								v-html="person.name"
								class="h2"
							>
							</span>
							<span
								v-html="person.title"
								class="h3"
							>
							</span>
						</span>
						<b-img-lazy
							v-bind="mainProps"
							:src="person.staff_member.url"
							:alt="person.name"
						></b-img-lazy>
					</span>
				</b-col>

			</b-row>
		</b-container>

	</section>
</template>

<script>
export default {
	props:['leadership','employees'],
	data() {
		return {
			mainProps: {
				center: true,
				fluidGrow: true,
				blank: true,
				blankColor: '#bbb',
				width: 640,
				height: 960,
			}
		}
	},
	methods: {
		addOpacity(){
			// console.log('click');
			let backDrop = document.querySelector('.modal-backdrop');
			backDrop.classList.add('modal-backdrop--opacity');
			// console.log(backDrop);
		}
	}
}
</script>
