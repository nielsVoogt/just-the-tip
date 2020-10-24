const fb = require("@/firebaseConfig.js");

import getTips from "@/utils/getTips";

const actions = {
  deleteAccountAction: ({ commit }, payload) => {
    const user = payload.user;
    return new Promise((resolve, reject) => {
      user
        .delete()
        .then(() => {
          commit("SET_USER", null);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  addNewTipAction: ({ commit }, tip) => {
    commit("ADD_NEW_TIP", tip);
  },

  async fetchUserDataAction({ commit }, uid) {
    const userProfile = fb.usersCollection.doc(uid);
    userProfile.get().then((doc) => commit("SET_USER_PROFILE", doc.data()));
    const tips = await getTips(uid);
    commit("SET_USER_TIPS", tips);
  },

  logOutAction: ({ commit }) => {
    return new Promise((resolve, reject) => {
      fb.auth
        .signOut()
        .then(() => {
          commit("SET_USER", null);
          resolve();
        })
        .catch((error) => {
          commit("SET_ERROR", error);
          reject();
        });
    });
  },

  logInAction: ({ commit, dispatch }, payload) => {
    return new Promise((resolve, reject) => {
      fb.auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          if (!response.user.emailVerified) {
            reject();
          } else {
            dispatch("fetchUserDataAction", response.user.uid);
            commit("SET_USER", response.user);
            resolve(response);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default actions;
