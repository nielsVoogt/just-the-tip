import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex);

// fb.auth.onAuthStateChanged((user) => {
//   if (user) {
//     store.commit("setCurrentUser", user);
//     store.dispatch("fetchUserProfile");
//   }
// });

const initialState = () => {
  return { user: null, error: null };
};

export const store = new Vuex.Store({
  state: initialState(),
  mutations,
  actions,
  getters
});