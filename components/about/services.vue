<template>
	<section
		class="about-page__services"
	>
		<b-container>
			<b-row
				class="mb-7 mt-7"
			>
				<b-col
					md=4
					cols=12
					v-for="(item,index) in data"
					:key="index"
				>
					<span
						class="mb-3"

					>
						Services
					</span>

					<h2
						class="mb-5"
						v-html="item.title"
					>
					</h2>

					<ul>
						<li
							v-for="(item,index) in item.types_of_services"
							:key="index"
							v-html="item.service_type"
						>
						</li>
					</ul>

				</b-col>
			</b-row>
		</b-container>
	</section>
</template>

<script>
export default {
	props:['data']
}
</script>
