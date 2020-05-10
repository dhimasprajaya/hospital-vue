import Vue from "vue";
import Vuex from "vuex";
import router from "../router";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
import firebase from "./modules/firebase";
import hospital from "./modules/hospital";
import doctor from "./modules/doctor";
import patient from "./modules/patient";
import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({ key: "local", paths: ["token", "selectedPatient"] }),
  ],
  state: {
    token: null,
    loading: false,
    snackbar: {},
    dialog: {},
    selectedPatient: {},
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
    dialog: (state) => {
      return state.dialog;
    },
    selectedPatient: (state) => {
      return state.selectedPatient;
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
    showDialog: (state, dialog) => {
      state.dialog = dialog;
    },
    dismissDialog: (state) => {
      state.dialog = {};
    },
    selectedPatient: (state, patient) => {
      state.selectedPatient = patient;
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
    logout: ({ commit, dispatch }) => {
      dispatch("showDialog", {
        title: "Confirm Logout",
        text: "Are you sure want to logout?",
      }).then((confirm) => {
        if (confirm) {
          commit("logout");
          router.push("/login");
        }
      });
    },
    loading: ({ commit }, payload) => {
      commit("loading", payload);
    },
    snackbar: ({ commit }, snackbar) => {
      if (!snackbar.show) snackbar.show = true;
      if (!snackbar.color) snackbar.color = "accent";
      if (!snackbar.timeout) snackbar.timeout = 2000;
      commit("snackbar", snackbar);
    },
    showDialog: ({ commit }, { title, text }) => {
      return new Promise((resolve, reject) => {
        commit("showDialog", { show: true, title, text, resolve, reject });
      });
    },
    dismissDialog: ({ commit }) => {
      commit("dismissDialog");
    },
    selectedPatient: ({ commit }, patient) => {
      commit("selectedPatient", patient);
    },
  },
  modules: {
    firebase,
    hospital,
    doctor,
    patient,
    user,
  },
});
