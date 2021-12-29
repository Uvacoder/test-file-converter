<template>
	<div
		class="h-screen flex flex-col justify-center items-center text-slate-700"
	>
		<div
			v-if="listsPopulated"
			class="flex flex-col justify-center items-center"
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

		<label
			v-else
			class="focus-outline inner-shadow flex flex-col items-center w-72 px-4 py-6 border border-slate-400 bg-slate-50 shadow-sm rounded-md tracking-wide cursor-pointer hover:bg-white"
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
					d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
				/>
			</svg>
			<span class="mt-2 text-base leading-normal">Select a file</span>
			<input
				type="file"
				class="hidden"
				accept=".yml,.yaml"
				@change="importData"
			/>
		</label>
	</div>
</template>

<script>
import jsYaml from "js-yaml";
import { mapMutations } from "vuex";
import { titleCase, readFileAsync } from "~/helpers/helpers";

export default {
	name: "Home",
	data() {
		return {};
	},
	computed: {
		lists() {
			return this.$store.state.lists;
		},
		listTypes() {
			return Object.keys(this.lists);
		},
		listsPopulated() {
			return Object.keys(this.lists).length > 0;
		}
	},
	methods: {
		// Lowercase or Uppercase to Titlecase
		titleCase,
		// Import data from a YAML file
		async importData(e) {
			const vm = this;
			const file = e.target.files[0];
			if (!file) {
				return;
			}

			// validate file type is YAML before import
			const extension = file.name.split(".").pop().toLowerCase();

			if (extension.match("yaml") || extension.match("yml")) {
				try {
					const contents = await readFileAsync(file);
					const lists = jsYaml.load(contents);

					vm.populate(lists);
				} catch (err) {}
			}
		},
		...mapMutations(["populate"])
	}
};
</script>

<style>
body,
body > * {
	font-family: "Space Grotesk", Inter, sans-serif;
	@apply outline-none focus:outline-none transition-all text-slate-700;
}

select,
optgroup {
	font-family: "Space Grotesk", Inter, sans-serif;
}

body {
	@apply bg-slate-200;
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
</style>
