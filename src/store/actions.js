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
        // this.$store.commit("setCurrentUser", cred.user);
        commit("setUser", response.user);
        resolve()

        // this.$store.dispatch("fetchUserProfile");
        // this.$router.push("/tips");
      })
      .catch((error) => {
        commit("setError", error.message);
        reject(error)


        // if (
        //   err.code === "auth/user-not-found" ||
        //   err.code === "auth/wrong-password"
        // ) {
        //   this.error = "Wrong email or password";
        //   this.loginForm.email = "";
        //   this.loginForm.password = "";
        // }
      });
    })
  },

  resetPasswordAction(payload) {
    return new Promise((resolve, reject) => {
      fb.auth
        .sendPasswordResetEmail(payload)
        .then(() => {
          console.log('It was a success')
          resolve()
          // this.resetPasswordEmailSent = true;
        })
        .catch((error) => {
          commit("setError", error.message);
          reject(error)
        });
    })
  },

  signUpAction({ commit }, payload) {
    return new Promise((resolve, reject) => {
      fb.auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((response) => {
          commit("setUser", response.user);
          resolve()
          
          // fb.usersCollection
          //   .doc(cred.user.uid)
          //   .set({
          //     firstName: this.user.firstName,
          //     lastName: this.user.lastName,
          //   })
          //   .then(() => {
          //     this.$store.dispatch("fetchUserProfile");
          //     this.$router.push({ name: "Tips" });
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
        })
        .catch((error) => {
          commit("setError", error.message);
          reject(error)


          // console.log(err);
          // this.feedback = err.message;
        });
      })
  },
};

export default actions;