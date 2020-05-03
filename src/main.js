import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://go-vue-rs.herokuapp.com/api/";
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.filter("thousand", function(value) {
  if (!value) return "0";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});

Vue.use(Vuelidate);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
