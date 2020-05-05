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
    loading: false,
    snackbar: {},
  },
  getters: {
    token: (state) => {
      return state.token;
    },
    loading: (state) => {
      return state.loading;
    },
    snackbar: (state) => {
      return state.snackbar;
    },
  },
  mutations: {
    login: (state, token) => {
      state.token = token;
    },
    logout: (state) => {
      state.token = null;
    },
    loading: (state, payload) => {
      state.loading = payload;
    },
    snackbar: (state, snackbar) => {
      state.snackbar = snackbar;
    },
  },
  actions: {
    login: ({ commit }) => {
      commit("login", "TOKEN");
      router.push("/dashboard");
      // axios
      //   .get("user/")
      //   .then((res) => {
      //     console.log("data", res.data);
      //     commit("login", "TOKEN");
      //     router.push("/dashboard");
      //   })
      //   .catch((error) => console.log(error));
    },
    logout: ({ commit }) => {
      commit("logout");
      router.push("/login");
    },
    loading: ({ commit }, payload) => {
      commit("loading", payload);
    },
    snackbar: ({ commit }, snackbar) => {
      if (!snackbar.show) snackbar.show = true;
      if (!snackbar.color) snackbar.color = "accent";
      if (!snackbar.timeout) snackbar.timeout = 2000;
      commit("snackbar", snackbar);

      setTimeout(() => {
        commit("snackbar", {});
      }, snackbar.timeout);
    },
  },
  modules: {
    hospital,
  },
});
