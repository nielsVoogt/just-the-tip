const fb = require("@/firebaseConfig.js");

import Vue from "vue";
import Vuex from "vuex";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const initialState = () => {
  return {
    user: null,
    error: null,
    userProfile: null,
    userTips: [],
    friends: [],
  };
};

fb.auth.onAuthStateChanged((user) => {
  console.log("onAuthChanged fired in store", user);
  if (user) {
    store.commit("SET_USER", user);
    store.dispatch("fetchUserDataAction", user.uid);
  } else {
    store.commit("SET_INITIAL_STATE", initialState());
  }
});

export const store = new Vuex.Store({
  state: initialState(),
  mutations,
  actions,
  getters,
});
