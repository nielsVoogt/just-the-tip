<template>
  <div>
    <form>
      <h1>Login</h1>

      <label class="form-group">
        <div class="form-group-label">Email</div>
        <input type="email" v-model="email" required />
      </label>

      <label class="form-group">
        <div class="form-group-label">Password</div>
        <input type="password" v-model="password" required />
      </label>

      <button type="submit" @click.prevent="validate()">Log in</button>
    </form>

    <router-link :to="{ name: 'ResetPassword' }">
      Forgot your password?
    </router-link>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["loginAction"]),

    validate() {
      // @TODO: Add validations
      this.login();
    },

    login() {
      this.loginAction({ email: this.email, password: this.password });
      // fb.auth
      //   .signInWithEmailAndPassword(
      //     this.loginForm.email,
      //     this.loginForm.password
      //   )
      //   .then((cred) => {
      //     this.$store.commit("setCurrentUser", cred.user);
      //     this.$store.dispatch("fetchUserProfile");
      //     this.$router.push("/tips");
      //   })
      //   .catch((err) => {
      //     if (
      //       err.code === "auth/user-not-found" ||
      //       err.code === "auth/wrong-password"
      //     ) {
      //       this.error = "Wrong email or password";
      //       this.loginForm.email = "";
      //       this.loginForm.password = "";
      //     }
      //   });
    },
  },
};
</script>
