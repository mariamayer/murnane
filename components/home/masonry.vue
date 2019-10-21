<template>
	<section
		class="home-page__masonry mb-7"
	>

			<div id="filters" class="button-group mb-3">
				<button class="button btn btn-primary all" @click="filter('.all')" data-filter="all">
					All—
					<small
						v-if="data"
					>({{ data.length }})</small>
				</button>
				<button
					v-for="item in tax"
					:key="item.slug"
					@click="filter('.' + item.slug)"
					:class="'button btn btn-default ' + item.slug"
					:data-filter="item.slug"
				>
					{{ item.name }}—
				</button>
			</div>
			<div id="realizations_entries" class="row grid isotope row--isotope">
				<div class="grid-sizer"></div>

				<div v-for="item in data" :key="item.id" :class="'col-md-4 col-lg-3 grid-item all ' + item.categories_string">
					<div class="grid-item-content">
						<nuxt-link
							class="grid-item-content__link"
							:to="'/'+item.post_type+'/'+item.post_name"
						>
							<span
								v-html="item.post_title"
							></span>
							<b-img-lazy v-bind="mainProps" :src="item.featured_image" alt="" aria-hidden="true"></b-img-lazy>
						</nuxt-link>
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

		if (this.$el.ownerDocument.readyState === "complete" || this.$el.ownerDocument.readyState === "loaded" || this.$el.ownerDocument.readyState === 'interactive') {
			setTimeout(_ => {
				this.isotope();
			}, 750);
		} else {
			this.$el.ownerDocument.addEventListener('DOMContentLoaded', _ => {
				setTimeout(_ => {
					this.isotope();
				}, 750);
			});
		}
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

		filter: function(item) {
			// let oldActive = $("#filters .btn-primary").first();
			let oldA = document.querySelector("#filters .btn-primary");
			let oldAData = oldA.getAttribute('data-filter');

			// if (item === oldActive.data("filter")) {
			// 	return;
			// }
			if (item === oldAData) {
				return;
			}

			// let currentActive = $("#filters button" + item).first();

			// currentActive.removeClass("btn-default").addClass("btn-primary");

			// oldActive.removeClass("btn-primary").addClass("btn-default");

			let currentA = document.querySelector("#filters button" + item);

			currentA.classList.remove('btn-default')
			currentA.classList.add('btn-primary')

			oldA.classList.remove('btn-primary')
			oldA.classList.add('btn-default')


			this.iso.arrange({
				filter: item
			});
		}
	}
};
</script>
