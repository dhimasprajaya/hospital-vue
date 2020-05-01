import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import hospital from "./modules/hospital";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    token: null,
  },
  getters: {
    token: (state) => {
      return state.token;
    },
  },
  mutations: {
    login: (state, token) => {
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
  },
  actions: {
    login: ({ commit }) => {
      axios
        .get("user/")
        .then((res) => {
          console.log("data", res.data);
          commit("login", "TOKEN");
          router.push("/dashboard");
        })
        .catch((error) => console.log(error));
    },
    logout: ({ commit }) => {
      commit("logout");
      router.push("/login");
    },
  },
  modules: {
    hospital,
  },
});
