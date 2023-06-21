// store/icon.js
const state = {
    icons: [],
};

const mutations = {
    SET_ICONS(state, icons) {
        state.icons = icons;
    },
};

const actions = {
    setIcons({ commit }) {
        // Assuming you have an array of icon names
        const icons = ['user', 'envelope'];
        commit('SET_ICONS', icons);
    },
};

export default {
    state,
    mutations,
    actions,
};
