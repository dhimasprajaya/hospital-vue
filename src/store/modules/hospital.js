const state = {
  hospitals: [],
};

const getters = {
  hospitals: (state) => {
    return state.hospitals;
  },
};

const mutations = {
  save: (state, payload) => {
    state.hospitals = payload;
  },
};

const actions = {
  save: ({ commit }, payload) => {
    commit("save", payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
