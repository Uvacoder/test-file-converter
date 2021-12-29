<template>
	<div
		class="w-full min-h-16 flex justify-start items-center text-left px-6 py-4 border-b-2"
	>
		<a
			:href="`https://www.goodreads.com/search?q=${encodeURIComponent(
				readItem.title + ' ' + readItem.author
			)}`"
			target="_blank"
			rel="noreferrer noopener"
			title="Search Goodreads"
			aria-label="Search Goodreads"
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
					d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
				/>
			</svg>
		</a>

		<div class="flex flex-col justify-between items-start text-slate-600">
			<p class="text-lg font-bold">{{ readItem.title }}</p>
			<p class="text-base font-medium mb-4">by {{ readItem.author }}</p>
			<div>
				<span
					v-for="shelf in readItem.shelves"
					:key="shelf"
					class="bg-slate-300 text-slate-700 h-6 leading-5 font-medium inline-block mr-2 px-4 rounded-full"
				>
					{{ shelf }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ReadItem",
	props: {
		readItem: {
			type: Object,
			default: () => {}
		}
	}
};
</script>

<style scoped>
.focus-outline {
	@apply outline-none focus:outline-none focus:ring-2 ring-slate-600 ring-opacity-40 ring-offset-0;
}
</style>
