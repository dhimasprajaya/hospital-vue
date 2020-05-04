import axios from "axios";

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
    axios
      .get("hospital/")
      .then((res) => {
        console.log(res);
        commit("saveHospitals", res.data);
      })
      .catch((error) => alert(JSON.stringify(error)));
  },
  createHospital: ({ dispatch }, params) => {
    axios
      .post("hospital/", params)
      .then((res) => {
        console.log(res);
        dispatch("getHospitals");
      })
      .catch((error) => alert(JSON.stringify(error)));
  },
  editHospital: ({ dispatch }, params) => {
    axios
      .put("hospital/", params)
      .then((res) => {
        console.log(res);
        dispatch("getHospitals");
      })
      .catch((error) => alert(JSON.stringify(error)));
  },
  deleteHospital: ({ dispatch }, params) => {
    axios
      .delete("hospital/" + params.id)
      .then((res) => {
        console.log(res);
        dispatch("getHospitals");
      })
      .catch((error) => alert(JSON.stringify(error)));
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
