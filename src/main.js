import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import Vuelidate from "vuelidate";
import Croppa from "vue-croppa";
import "vue-croppa/dist/vue-croppa.css";

Vue.config.productionTip = false;

Vue.filter("thousand", function(value) {
  if (!value) return "0";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
});

Vue.use(Vuelidate);
Vue.use(Croppa);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
