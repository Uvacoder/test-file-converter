<template>
	<select
		class="rounded-md w-40 h-12 text-left font-semibold my-8 border border-slate-400 focus:border-slate-400 bg-slate-50 hover:bg-white appearance-none block transition ease-in-out px-6 pb-2 text-base focus-outline inner-shadow"
		aria-label="View list by status"
		@change="$emit('update:currOption', options[$event.target.selectedIndex])"
	>
		<option
			v-for="(option, index) in options"
			:key="option"
			:selected="index === 0"
			:value="option"
		>
			{{ dehyphenate(option) }}
		</option>
	</select>
</template>

<script>
import { dehyphenate } from "~/helpers/helpers";

export default {
	name: "Dropdown",
	props: {
		options: {
			type: Array,
			default: () => ["N/A"]
		},
		currOption: {
			type: String,
			default: ""
		}
	},
	methods: {
		dehyphenate
	}
};
</script>

<style scoped>
* {
	@apply outline-none focus:outline-none text-slate-700;
}

select:disabled {
	@apply text-slate-400;
}

.inner-shadow,
.inner-shadow:focus {
	box-shadow: 0px -3px 0px 0px rgba(55, 65, 81, 0.25) inset;
	-webkit-box-shadow: 0px -3px 0px 0px rgba(55, 65, 81, 0.25) inset;
	-moz-box-shadow: 0px -3px 0px 0px rgba(55, 65, 81, 0.25) inset;
}

.focus-outline {
	@apply focus:outline-none focus:ring-2 ring-slate-500 ring-opacity-40 ring-offset-0;
}
</style>
