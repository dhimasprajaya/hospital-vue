import axios from "../../axios";

const state = {
  users: [],
};

const getters = {
  users: (state) => {
    return state.users;
  },
};

const mutations = {
  saveUsers: (state, payload) => {
    state.users = payload;
  },
};

const actions = {
  getUsers: ({ commit }) => {
    axios.get("user/").then((res) => {
      if (res.data) commit("saveUsers", res.data);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
