const fb = require("@/firebaseConfig.js");

const actions = {
  
  logOutAction({commit}) {
    fb.auth.signOut().then(() => {
      commit("setUser", null)
    }).catch(error => {
      commit("setError", error)
    })
  },

  loginAction({commit}, payload) {
    return new Promise((resolve, reject) => {
      fb.auth
      .signInWithEmailAndPassword(
        payload.email,
        payload.password
      )
      .then((response) => {
        commit("setUser", response.user);
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      });
    })
  },
};

export default actions;