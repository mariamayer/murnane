<template>
	<section
		class="pt-7 pb-7 about-page__clients"
	>
		<b-container>
			<b-row>
				<b-col>
					<h2
						class="h2"
						v-html="clientsTitle"
					></h2>
				</b-col>
			</b-row>
			<b-row>
				<b-col
					md=3
					v-for="(column,index) in columns"
					:key="index"
				>
					<ul>
						<li
							class="item-container"
							v-for="(item) in column"
							:key="item.client"
						>
							{{item.client}}
						</li>
					</ul>
				</b-col>
			</b-row>
		</b-container>
	</section>
</template>

<script>
export default {
	props:['clientsTitle','clients'],
	data() {
		return {
			cols: 4
		}
	},
	// https://stackoverflow.com/questions/53075877/v-if-inside-v-for-display-list-of-items-in-two-columns
	computed: {
		columns () {
			let columns = []
			let mid = Math.ceil(this.clients.length / this.cols)
			for (let col = 0; col < this.cols; col++) {
				columns.push(this.clients.slice(col * mid, col * mid + mid))
			}
			return columns
		}
	}
}
</script>
