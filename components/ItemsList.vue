<template>
	<div
		class="text-left border border-slate-400 rounded-md bg-slate-50"
		:class="{ 'py-6': listItems.length <= 0 }"
	>
		<!--  Readlist Items -->
		<template v-if="listType === 'readlist'">
			<read-item
				v-for="(item, index) in listItems"
				:key="index"
				:read-item="item"
				:class="{
					'border-none': index === listItems.length - 1
				}"
			/>
		</template>

		<!-- Watchlist Items  -->
		<template v-else-if="listType === 'watchlist'">
			<watch-item
				v-for="(item, index) in listItems"
				:key="index"
				:watch-item="item"
				:class="{
					'border-none': index === listItems.length - 1
				}"
			/>
		</template>

		<!-- Playlist Items  -->
		<template v-else-if="listType === 'playlist'">
			<play-item
				v-for="(item, index) in listItems"
				:key="index"
				:play-item="item"
				:class="{
					'border-none': index === listItems.length - 1
				}"
			/>
		</template>

		<!-- Listenlist Items  -->
		<template v-else-if="listType === 'listenlist'">
			<listen-item
				v-for="(item, index) in listItems"
				:key="index"
				:listen-item="item"
				:class="{
					'border-none': index === listItems.length - 1
				}"
			/>
		</template>

		<!-- Empty search results -->
		<h1
			v-show="listItems.length <= 0"
			class="text-center font-semibold text-xl text-slate-700"
		>
			No search results matching your query. ¯\_(ツ)_/¯
		</h1>
	</div>
</template>

<script>
export default {
	name: "ItemsList",
	props: {
		listType: {
			type: String,
			default: ""
		},
		listItems: {
			type: Array,
			default: () => []
		}
	}
};
</script>

<style scoped>
* {
	outline: none;
}
</style>
