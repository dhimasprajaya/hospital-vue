import axios from "axios";
import store from "../store";

const instance = axios.create({
  baseURL: "https://go-vue-rs.herokuapp.com/api/",
});

// instance.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
// instance.defaults.headers.get["Accepts"] = "application/json";

instance.interceptors.request.use((config) => {
  store.dispatch("loading", true);
  return config;
});

instance.interceptors.response.use((res) => {
  store.dispatch("loading", false);
  return res;
}, error => {
  store.dispatch("loading", false);
  store.dispatch("snackbar", { color: "error", message: error.message });
});

export default instance;
