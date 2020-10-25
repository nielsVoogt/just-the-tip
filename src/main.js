import App from "./App.vue";
import InstantSearch from "vue-instantsearch";
import Vue from "vue";
import Vuelidate from "vuelidate";
import i18n from "./i18n";
import router from "./router";
import { store } from "./store";

const fb = require("./firebaseConfig.js");

Vue.prototype.$notificationHub = new Vue();

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(InstantSearch);

let app;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      i18n,
      render: (h) => h(App),
    });
  }
});
