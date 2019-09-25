<template>
	<section>

			<div id="filters" class="button-group">
				<button class="button btn btn-primary" @click="filter('*')" data-filter="*">
					all
					<small>({{ data.length }})</small>
				</button>
				<button
					v-for="item in tax"
					:key="item.id"
					@click="filter('.' + item.id)"
					:class="'button btn btn-default ' + item.id"
					:data-filter="item.id"
				>
					{{ item.name }}
				</button>
			</div>
			<div id="realizations_entries" class="row grid isotope row--isotope">
				<div class="grid-sizer"></div>

				<div v-for="item in data" :key="item.id" :class="'col-md-4 col-lg-3 grid-item ' + item.categories_string">
					<div class="grid-item-content">
						<b-img-lazy v-bind="mainProps" :src="item.featured_image" alt="Image 1"></b-img-lazy>

					</div>
				</div>
			</div>

	</section>
</template>

<style lang="scss" scoped>
.grid-item {
	padding: 0;
}
.row--isotope {
	margin: 0;
}
</style>

<script>
let Isotope;

if (process.browser) {
	Isotope = require("isotope-layout");
}

export default {
	props: ["data", "tax"],
	data() {
		return {
			iso: null,
			mainProps: {
				center: true,
				fluidGrow: true,
				blank: true,
				blankColor: "#bbb",
				class: "",
				width: 640,
          		height: 581,
			}
		};
	},
	mounted() {
		this.isotope();
	},
  	methods: {
		isotope() {
			this.iso = new Isotope(".grid", {
				itemSelector: ".grid-item",
				percentPosition: true,
				masonry: {
				columnWidth: ".grid-sizer"
				}
			});

			this.iso.layout();
		},

		filter: function(id) {
			let oldActive = $("#filters .btn-primary").first();

			if (id === oldActive.data("filter")) {
				return;
			}

			let currentActive = $("#filters button" + id).first();

			currentActive.removeClass("btn-default").addClass("btn-primary");

			oldActive.removeClass("btn-primary").addClass("btn-default");

			this.iso.arrange({
				filter: id
			});
		}
	}
};
</script>
