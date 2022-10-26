<template>
	<div
		class="w-full min-h-16 flex justify-start items-center text-left px-6 py-4 border-b-2"
	>
		<a
			:href="`https://trakt.tv/search?query=${encodeURIComponent(watchItem)}`"
			target="_blank"
			rel="noreferrer noopener"
			title="Search Trakt"
			aria-label="Search Trakt"
			class="flex justify-center items-center h-12 w-12 mr-6 bg-slate-300 text-slate-700 stroke-current p-2 rounded-full flex-shrink-0 focus-outline"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-0 w-7 h-7"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
				/>
			</svg>
		</a>

		<p class="text-slate-600 text-lg font-bold">{{ watchItem.title }}</p>
	</div>
</template>

<script>
export default {
	name: "WatchItem",
	props: {
		watchItem: {
			type: Object,
			default: () => {}
		}
	}
};
</script>

<style scoped>
.focus-outline {
	@apply focus:outline-none focus:ring-2 ring-slate-600 ring-opacity-40 ring-offset-0;
}
</style>
