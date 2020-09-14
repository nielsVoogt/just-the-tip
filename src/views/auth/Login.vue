<template>
  <!-- LOGIN -->

  <div v-if="!showPasswordReset">
    <form @submit.prevent="login">
      <h1>Login</h1>

      <label class="form-group">
        <div class="form-group-label">Email</div>
        <input type="email" v-model="loginForm.email" required />
      </label>

      <label class="form-group">
        <div class="form-group-label">Password</div>
        <input type="password" v-model="loginForm.password" required />
      </label>

      <button type="submit">Log in</button>
      {{ error }}
    </form>

    <a href="#" @click.prevent="showPasswordReset=true">I forgot my password</a>
  </div>

  <!-- PASSWORD RESET -->

  <div v-else>
    <!-- REQUEST PASSWORD RESET -->
    <div v-if="!resetPasswordEmailSent">
      <form @submit.prevent="passwordReset">
        <h1>Password reset</h1>
        <label class="form-group">
          <div class="form-group-label">Email</div>
          <input type="email" v-model="passwordForm.email" required />
        </label>
        <button type="submit">Request password reset</button>
      </form>
      <a href="#" @click.prevent="showPasswordReset=false">Back to login</a>
    </div>

    <!-- PASSWORD RESET EMAIL SENT -->
    <div v-else>
      <h1>Email sent</h1>
      <p>We've sent you a password reset email</p>
      <button @click="showPasswordReset=false">back to login</button>
    </div>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");

export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: "",
      },
      passwordForm: {
        email: "",
      },
      error: false,
      showPasswordReset: false,
      resetPasswordEmailSent: false,
    };
  },
  methods: {
    passwordReset() {
      fb.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.resetPasswordEmailSent = true;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    login() {
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then((cred) => {
          this.$store.commit("setCurrentUser", cred.user);
          this.$store.dispatch("fetchUserProfile");
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          if (
            err.code === "auth/user-not-found" ||
            err.code === "auth/wrong-password"
          ) {
            this.error = "Wrong email or password";
            this.loginForm.email = "";
            this.loginForm.password = "";
          }
        });
    },
  },
};
</script>
