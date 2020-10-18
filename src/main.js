import App from "./App.vue";
import Vue from "vue";
import Vuelidate from "vuelidate";
import router from "./router";
import { store } from "./store";

const fb = require("./firebaseConfig.js");

Vue.prototype.$notificationHub = new Vue();

Vue.config.productionTip = false;
Vue.use(Vuelidate);

let app;
fb.auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: "#app",
      router,
      store,
      render: (h) => h(App),
    });
  }
});
