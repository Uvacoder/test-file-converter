import cloneDeep from "lodash.clonedeep";

export const state = () => ({
	lists: {},
	listsPopulated: false
});

export const mutations = {
	populate(state, data) {
		state.lists = cloneDeep(data);
		state.listsPopulated = true;
	}
};
