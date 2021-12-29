<template>
	<div class="w-full h-screen bg-slate-200">
		<div class="mx-auto max-w-5xl p-8">
			<!-- header -->
			<app-header :header-title="headerTitle" />

			<!-- primary dropdown for all lists -->
			<app-dropdown
				:curr-option.sync="currOption"
				:options="options"
				class="inline-block"
				:disabled="searchInput.length > 0"
			/>

			<!-- secondary dropdown for nested list: watchlist -->
			<app-dropdown
				v-if="listType === 'watchlist'"
				:curr-option.sync="currNestedOption"
				:options="nestedOptions"
				class="inline-block ml-4"
				:disabled="searchInput.length > 0"
			/>

			<!-- search input box -->
			<div
				id="input-box"
				:class="{
					'ring-2 ring-slate-500 ring-opacity-40 ring-offset-0': isInputFocused
				}"
				class="w-full h-12 overflow-hidden flex items-center justify-center border border-slate-400 rounded-md bg-slate-50 mb-4"
			>
				<!-- Decorative search icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-12 h-6 text-slate-700 flex-shrink-0 border-r border-r-slate-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>

				<!-- search input -->
				<input
					v-model="searchInput"
					type="text"
					placeholder="Search this list... [ ; ]"
					class="w-full h-12 bg-transparent border-none"
					@keyup="searchQuery"
					@blur="isInputFocused = false"
					@focus="isInputFocused = true"
				/>

				<!-- Clear input button -->
				<button
					v-show="searchInput.length > 0"
					class="w-12 h-6 clear-focus-defaults flex items-center justify-center flex-shrink-0 border-l border-l-slate-400 cursor-pointer"
					title="Clear search box"
					aria-label="Clear search box"
					@click="clearSearchInput"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6 text-slate-700 rounded-sm"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
						/>
					</svg>
				</button>
			</div>

			<!-- list of items -->
			<items-list
				:list-type="listType"
				:list-items="searchInput.length > 0 ? searchResults : defaultList"
			/>
		</div>
	</div>
</template>

<script>
import Fuse from "fuse.js";
import cloneDeep from "lodash.clonedeep";
import { titleCase } from "~/helpers/helpers";

export default {
	name: "ListView",
	data() {
		return {
			currList: [],
			defaultList: [],
			searchResults: [],
			currNestedList: [], // for watchlist
			listType: "",
			headerTitle: "",
			searchInput: "",
			fuseInstance: null,
			isInputFocused: false
		};
	},
	computed: {
		list() {
			try {
				const storedList = this.$store.state.lists[this.listType];

				if (storedList) {
					return cloneDeep(storedList);
				} else {
					// eslint-disable-next-line vue/no-side-effects-in-computed-properties
					this.$router.push("/");
					return {};
				}
			} catch (error) {
				// eslint-disable-next-line vue/no-side-effects-in-computed-properties
				this.$router.push("/");
				return {};
			}
		},
		options() {
			return Object.keys(this.list);
		},
		currOption: {
			get() {
				return this.options[0];
			},
			set(newValue) {
				this.currList = Object.assign([], this.list[newValue]);
				this.setDefaultList();
			}
		},
		nestedOptions() {
			return Object.keys(this.currList);
		},
		currNestedOption: {
			get() {
				return this.nestedOptions[0];
			},
			set(newValue) {
				this.currNestedList = Object.assign([], this.currList[newValue]);
				this.setDefaultList();
			}
		}
	},
	watch: {
		// Update nested list when primary option changes
		currList() {
			this.currNestedList = Object.assign(
				[],
				this.currList[this.currNestedOption]
			);
			this.setDefaultList();
		},
		// sync URL query with input field
		"route.query": {
			immediate: true,
			handler(query) {
				try {
					if (query.q) {
						this.searchInput = query.q;
					}
				} catch (error) {}
			}
		}
	},
	created() {
		// Set list type and header from URL slug
		this.listType = this.$route.params.slug;
		this.headerTitle = titleCase(this.listType);

		// Set initial list values
		this.currList = Object.assign([], this.list[this.options[0]]);
		this.currNestedList = Object.assign(
			[],
			this.currList[this.nestedOptions[0]]
		);

		this.setDefaultList();

		// Initialize Fuse instance for search
		const fuseOptions = {
			threshold: 0.4
		};

		if (this.listType === "readlist") {
			fuseOptions.keys = ["title", "author"];
		}

		this.fuseInstance = new Fuse(this.defaultList, fuseOptions);

		// set initial search input value from URL query
		this.searchInput = this.$route.query.q ? this.$route.query.q : "";
		this.searchQuery();
	},
	mounted() {
		// attach keyboard shortcuts for focusing input
		window.addEventListener("keyup", (e) => {
			// e.preventDefault();
			const inputField = document.querySelector("input");

			if (e.key === ";") {
				// when semicolon
				inputField.focus();
			} else if (e.key.toLowerCase() === "escape") {
				// when 'Esc' key is pressed
				inputField.blur();
			}
		});
	},
	methods: {
		// search + sync input field with URL query
		searchQuery() {
			if (this.searchInput.length > 0) {
				// If query not empty, update URL
				this.$router
					.replace({
						path: `/${this.listType}`,
						query: { q: this.searchInput }
					})
					.catch(() => {});

				// Search using query
				const resultsIndex = this.fuseInstance
					.search(this.searchInput)
					.map((el) => el.refIndex);

				this.searchResults = resultsIndex.map((i) => {
					return this.defaultList[i];
				});
			} else {
				// Remove query parameter from URL
				this.$router
					.replace({
						path: `/${this.listType}`,
						query: {}
					})
					.catch(() => {});

				// Reset list of items to default
				this.setDefaultList();
			}
		},
		// set/reset default list for page
		setDefaultList() {
			this.defaultList =
				this.listType === "watchlist"
					? cloneDeep(this.currNestedList)
					: cloneDeep(this.currList);
		},
		// used for readlist: title + author
		createSearchQuery(query) {
			const keywords = query.split(" ");
			const queryList = [];

			class Query {
				constructor(name, value) {
					this[name] = value;
				}
			}

			keywords.forEach((keyword) => {
				queryList.push(new Query("title", keyword));
				queryList.push(new Query("author", keyword));
			});

			return queryList;
		},
		// clear search box and URL query
		clearSearchInput() {
			// clear search input
			this.searchInput = "";

			// Remove query parameter from URL
			this.$router
				.replace({
					path: `/${this.listType}`,
					query: {}
				})
				.catch(() => {});

			// Reset list of items to default
			this.setDefaultList();
		}
	}
};
</script>

<style scoped>
.clear-focus-defaults {
	@apply shadow-none outline-none focus:shadow-none focus:outline-none focus:ring-0;
}

input:focus {
	@apply border-none focus:border-none shadow-none outline-none focus:shadow-none focus:outline-none focus:ring-0;
}

button:focus > svg {
	@apply ring-2 ring-slate-500 ring-opacity-40 ring-offset-4;
}
</style>
