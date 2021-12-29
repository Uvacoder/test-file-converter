<template>
	<div class="w-full flex flex-col justify-between">
		<header class="w-full flex justify-between items-center my-4">
			<NuxtLink to="/" class="icon-btn focus-outline inner-shadow">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 19l-7-7m0 0l7-7m-7 7h18"
					/>
				</svg>
			</NuxtLink>

			<h1 class="text-xl font-bold">{{ headerTitle }}</h1>

			<button
				class="icon-btn focus-outline inner-shadow"
				@click="toggleIndex = !toggleIndex"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16m-7 6h7"
					/>
				</svg>
			</button>
		</header>

		<transition name="fade">
			<div
				v-show="toggleIndex"
				class="w-full py-2 px-4 flex flex-col md:flex-row justify-between items-center shrink-0 bg-slate-300 rounded-md border border-slate-400"
			>
				<NuxtLink
					v-for="listType in listTypes"
					:key="listType"
					class="link focus-outline inner-shadow"
					:to="`/${listType}`"
					tag="button"
				>
					{{ titleCase(listType) }}
				</NuxtLink>
			</div>
		</transition>
	</div>
</template>

<script>
import { titleCase } from "~/helpers/helpers";

export default {
	name: "Header",
	props: {
		headerTitle: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			toggleIndex: false,
			listTypes: ["readlist", "watchlist", "playlist", "listenlist"]
		};
	},
	methods: {
		titleCase
	}
};
</script>

<style scoped>
* {
	outline: none;
}

.icon-btn {
	@apply w-12 h-12 flex items-center justify-center p-2 border border-slate-400 bg-slate-50 text-slate-700 rounded-md;
}

.link {
	@apply w-36 h-12 text-center font-semibold leading-normal px-6 py-2 my-2 border border-slate-400 bg-slate-50 rounded-md hover:bg-white;
}

.inner-shadow {
	box-shadow: 0px -5px 0px 0px rgba(55, 65, 81, 0.25) inset;
	-webkit-box-shadow: 0px -5px 0px 0px rgba(55, 65, 81, 0.25) inset;
	-moz-box-shadow: 0px -5px 0px 0px rgba(55, 65, 81, 0.25) inset;
}

.focus-outline {
	@apply focus:outline-none focus:ring-2 ring-slate-500 ring-opacity-40 ring-offset-0;
}

.fade-enter-active,
.fade-leave-active {
	transition: all 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
	opacity: 0;
}
</style>
