import axios from "../../axios";

const state = {
  doctors: [],
};

const getters = {
  doctors: (state) => {
    return state.doctors;
  },
};

const mutations = {
  saveDoctors: (state, payload) => {
    state.doctors = payload;
  },
};

const actions = {
  getDoctors: ({ commit }) => {
    axios.get("doctor/").then((res) => {
      if (res.data) commit("saveDoctors", res.data);
    });
  },
  createDoctor: ({ dispatch }, params) => {
    axios.post("doctor/", params).then((res) => {
      if (res) dispatch("getDoctors");
    });
  },
  editDoctor: ({ dispatch }, params) => {
    axios.put("doctor/", params).then((res) => {
      if (res) dispatch("getDoctors");
    });
  },
  deleteDoctor: ({ dispatch }, params) => {
    axios.delete("doctor/" + params.id).then((res) => {
      if (res) dispatch("getDoctors");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
