const fb = require("@/firebaseConfig.js");

const actions = {

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
        // commit("setError", error.message);
        reject(error)
      });
    })
  },

  // resetPasswordAction({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     fb.auth
  //       .sendPasswordResetEmail(payload.email)
  //       .then(() => {
  //         resolve()
  //       })
  //       .catch((error) => {
  //         // commit("setError", error.message);
  //         reject(error)
  //       });
  //   })
  // },

  // signUpAction({ commit }, payload) {
  //   return new Promise((resolve, reject) => {
  //     fb.auth
  //       .createUserWithEmailAndPassword(payload.email, payload.password)
  //       .then((response) => {
  //         // commit("setUser", response.user);
  //         resolve(response)
          
  //         // fb.usersCollection
  //         //   .doc(cred.user.uid)
  //         //   .set({
  //         //     firstName: this.user.firstName,
  //         //     lastName: this.user.lastName,
  //         //   })
  //         //   .then(() => {
  //         //     this.$store.dispatch("fetchUserProfile");
  //         //     this.$router.push({ name: "Tips" });
  //         //   })
  //         //   .catch((err) => {
  //         //     console.log(err);
  //         //   });
  //       })
  //       .catch((error) => {
  //         // commit("setError", error.message);
  //         reject(error)


  //         // console.log(err);
  //         // this.feedback = err.message;
  //       });
  //     })
  // },
};

export default actions;