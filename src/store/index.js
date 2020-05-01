import Vue from "vue";
import Vuex from "vuex";
import hospital from "./modules/hospital";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
  },
  getters: {
    isLogged: (state) => {
      return state.isLogged;
    },
  },
  mutations: {
    login: (state) => {
      state.isLogged = true;
    },
  },
  actions: {
    login: ({ commit }) => {
      commit("login");
      router.push("/dashboard");
    },
  },
  modules: {
    hospital,
  },
});
