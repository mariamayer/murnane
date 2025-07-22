<template>
	<section
		class="single-project__intro pt-7 pb-7"
		id="single-project-intro"
	>
		<b-container
			id="first-text"
		>
			<b-row
				align-h="between"
			>
				<b-col
					md="5"
				>
					<header>
						<h1
							v-html="postTitle"
							class="mb-4"
						>
						</h1>
					</header>
					<b-row>
						<b-col
							md=7
						>
							<ul
								class="single-project__specific-features"
							>
								<li
									v-for="(item, index) in specificsList"
									:key="index"
								>
									<b-row>
										<b-col
											cols=4
										>
											<span
												class="single-project__specific-type"
												v-html="item.type"
											>
											</span>
										</b-col>
										<b-col
											cols=8
										>
											<span
												class="single-project__specific-desc"
												v-html="item.descriptor"
											>
											</span>
										</b-col>
									</b-row>
								</li>
							</ul>
						</b-col>
						<b-col
							md=5
							class="single-project__categories"
						>
							<p>
								Categories
							</p>

							<nuxt-link
								v-for="item in taxonomyList"
								:key="item.term_id"
								:to="item.taxonomy === 'portfolio_category' ? '/' + item.slug : '/' + item.taxonomy + '/' + item.slug"
							>
								<span>
									#{{item.name}}
								</span>
							</nuxt-link>
						</b-col>
					</b-row>
				</b-col>

				<b-col
					md="6"
					class="single-project__text"
				>
					<div v-html="postContent"></div>
				</b-col>

			</b-row>
		</b-container>
	</section>
</template>

<script>
export default {
	props:['postContent','postTitle','specificsList','taxonomyList']
}
</script>
