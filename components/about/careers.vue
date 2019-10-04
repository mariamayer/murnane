<template>
	<section
		class="about-page__careers pb-6 pt-6"
		>

		<b-container>
			<b-row
				align-h="between"
			>
				<b-col
					md=8
				>
					<h2
						v-html="sectionTitle"
						class="h2 mb-5"
					></h2>

					<div
						v-html="sectionContent"
						class="mb-5"
					></div>

					<div v-if="currentJobs.length > 0">
						<h3
							class="h2 mb-3"
						>
							Now Hiring
						</h3>

						<ul class="job-list">
							<li
								v-for="job in currentJobs"
								:key="job.id"
							>
								<button
									v-b-modal="'job-post-'+job.id"
									class="btn--blank"
									v-html="job.title.rendered"
								>
								</button>
								<b-modal
									:id="'job-post-'+job.id"
									title=""
									centered
									@shown="addOpacity"
									modal-class="modal-job"
									hide-footer
									size="lg"
								>
									<h2
										v-html="job.title.rendered"
										class="mb-4"
									>
									</h2>
									<div
										v-html="job.content.rendered"
									></div>
								</b-modal>
							</li>
						</ul>
					</div>
					<div v-else>
						<h3
							class="h2"
						>
							Oh no!
						</h3>
						<p>
							Sorry, no open positions at this time!<br/>
							Please check back again soon
						</p>
					</div>
				</b-col>

				<b-col
					md=3
				>
					<h2
						class="h3"
					>
						Silver Lake Office
					</h2>

					<div v-html="sectionLocation"></div>
				</b-col>

			</b-row>
		</b-container>

	</section>
</template>

<script>
export default {
	props:['sectionTitle','sectionContent', 'sectionLocation','currentJobs'],
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
