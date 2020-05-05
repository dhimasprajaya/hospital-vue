import axios from "../../axios";

const state = {
  hospitals: [],
  hospitalTypes: ["RSU", "RSS", "RSIA"],
};

const getters = {
  hospitals: (state) => {
    return state.hospitals;
  },
  hospitalTypes: (state) => {
    return state.hospitalTypes;
  },
};

const mutations = {
  saveHospitals: (state, payload) => {
    state.hospitals = payload;
  },
};

const actions = {
  getHospitals: ({ commit }) => {
    axios.get("hospital/").then((res) => {
      if (res.data) commit("saveHospitals", res.data);
    });
  },
  createHospital: ({ dispatch }, params) => {
    axios.post("hospital/", params).then((res) => {
      if (res) dispatch("getHospitals");
    });
  },
  editHospital: ({ dispatch }, params) => {
    axios.put("hospital/", params).then((res) => {
      if (res) dispatch("getHospitals");
    });
  },
  deleteHospital: ({ dispatch }, params) => {
    axios.delete("hospital/" + params.id).then((res) => {
      if (res) dispatch("getHospitals");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
