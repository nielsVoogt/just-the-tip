import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

const fb = require("@/firebaseConfig.js");

fb.auth.onAuthStateChanged((user) => {
  if (user) {
    store.commit("setUser", user);
  }
});

const initialState = () => {
  return { user: null, error: null };
};

export const store = new Vuex.Store({
  state: initialState(),
  mutations,
  actions,
  getters
});