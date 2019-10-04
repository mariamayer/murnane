<template>
	<section
		class="about-page__staff"
		>

		<b-container>
			<b-row>

				<b-col
					cols=6
					md=4
					lg=3
					class="about-page__staff-individual"
					v-for="(person) in leadership"
					:key="person.profile_image.ID"
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
	}
}
</script>
