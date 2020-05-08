import axios from "../../axios";

const state = {
  patients: [],
};

const getters = {
  patients: (state) => {
    return state.patients;
  },
};

const mutations = {
  savePatients: (state, payload) => {
    state.patients = payload;
  },
};

const actions = {
  getPatients: ({ commit }) => {
    axios.get("patient/").then((res) => {
      if (res.data) commit("savePatients", res.data);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
