<template>
	<div
		class="w-full min-h-16 flex justify-start items-center text-left px-6 py-4 border-b-2"
	>
		<a
			:href="`https://podbay.fm/search?q=${encodeURIComponent(listenItem)}`"
			target="_blank"
			rel="noreferrer noopener"
			title="Search Podbay"
			aria-label="Search Podbay"
			class="flex justify-center items-center h-12 w-12 mr-6 bg-slate-300 text-slate-700 stroke-current p-2 rounded-full flex-shrink-0 focus-outline"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				class="stroke-0 w-7 h-7"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
				/>
			</svg>
		</a>

		<p class="text-slate-600 text-lg font-bold">{{ listenItem.title }}</p>
	</div>
</template>

<script>
export default {
	name: "ListenItem",
	props: {
		listenItem: {
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
