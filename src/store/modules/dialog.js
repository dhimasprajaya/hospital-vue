const state = {
  dialog: {},
};

const getters = {
  dialog: (state) => {
    return state.dialog;
  },
};

const mutations = {
  showDialog: (state, dialog) => {
    state.dialog = dialog;
  },
  dismissDialog: (state) => {
    state.dialog = {};
  },
};

const actions = {
  showDialog: ({ commit }, { title, text }) => {
    return new Promise((resolve, reject) => {
      commit("showDialog", { show: true, title, text, resolve, reject });
    });
  },
  dismissDialog: ({ commit }) => {
    commit("dismissDialog");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
