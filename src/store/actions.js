const fb = require("@/firebaseConfig.js");

const actions = {
  deleteAccountAction({ commit }, payload) {
    const user = payload.user;
    return new Promise((resolve, reject) => {
      user
        .delete()
        .then(() => {
          commit("setUser", null);
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  logOutAction({ commit }) {
    return new Promise((resolve, reject) => {
      fb.auth
        .signOut()
        .then(() => {
          commit("setUser", null);
          resolve();
        })
        .catch((error) => {
          commit("setError", error);
          reject();
        });
    });
  },

  loginAction({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      fb.auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          if (!response.user.emailVerified) {
            reject();
          } else {
            commit("setUser", response.user);
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
