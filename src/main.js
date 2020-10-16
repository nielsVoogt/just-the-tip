import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

const fb = require("./firebaseConfig.js");

Vue.prototype.$notificationHub = new Vue();

Vue.config.productionTip = false;

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
