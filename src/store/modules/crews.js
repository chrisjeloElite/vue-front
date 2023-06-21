import axios from "axios";
import { Url } from '@/services/api';

const state = {
    url: "http://127.0.0.1:8000/api/crews/",
    crews: [],
    pagination: null,
};

import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';

library.add(faUser, faEnvelope);

const apiURL = Url();

const mutations = {
    setCrews(state, { data, pagination }) {
        state.crews = data;
        state.pagination = pagination;
    },
    newCrew(state, crew) {
        state.crews.push(crew);
    },
    removeCrew(state, id) {
        state.crews = state.crews.filter(crew => crew.id !== id);
    },
    updateCrew(state, updatedCrew) {
        const index = state.crews.findIndex(crew => crew.id === updatedCrew.id);
        if (index !== -1) {
            state.crews.splice(index, 1, updatedCrew);
        }
    },
};

const actions = {
    async fetchCrews({ commit }, page = 1) {
        try {
            const response = await axios.get(apiURL, { params: { page } });
            const { data, pagination } = response.data;
            commit("setCrews", { data, pagination });
        } catch (error) {
            console.error(error);
        }
    },

    async saveCrew({ commit }, newCrew) {
        try {
            const response = await axios.post(apiURL, newCrew);
            commit("newCrew", response.data);
        } catch (error) {
            console.error(error);
        }
    },

    async deleteCrewLink({ commit }, id) {
        try {
            await axios.delete(apiURL + id);
            commit("removeCrew", id);
        } catch (error) {
            console.error(error);
        }
    },

    async editCrewLink({ commit }, { id, updatedCrew }) {
        try {
            const response = await axios.put(apiURL + id, updatedCrew);
            commit("updateCrew", response.data);
        } catch (error) {
            console.error(error);
        }
    },
};

const getters = {
    crews: (state) => state.crews,
    pagination: (state) => state.pagination,
};

export default {
    state,
    getters,
    actions,
    mutations,
};
