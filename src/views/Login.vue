<template>
  <div>
    <div>
      <form>
        <h1>Login</h1>

        <small v-if="error">{{ error }}</small>

        <label class="form-group">
          <div class="form-group-label">Email</div>
          <input type="email" v-model="email" required />
        </label>

        <label class="form-group">
          <div class="form-group-label">Password</div>
          <input type="password" v-model="password" required />
        </label>

        <div v-if="requestEmailValidation" style="border:2px solid red;">
          <h1>You haven't validated your email yet</h1>
          <p>
            We've sent you a email that contains a link to confirm your email
            adress. You need to confirm your email adress to be able to log in
          </p>
        </div>

        <button type="submit" @click.prevent="validate()">Log in</button>
      </form>

      <router-link :to="{ name: 'ResetPassword' }">
        Forgot your password?
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
      requestEmailValidation: false,
    };
  },
  methods: {
    ...mapActions(["loginAction"]),

    validate() {
      // @TODO: Add validations
      this.login();
    },

    login() {
      this.loginAction({ email: this.email, password: this.password })
        .then((response) => {
          console.log("loggedInResponse", response);
          this.$router.push({ name: "Tips" });
        })
        .catch((error) => {
          // If there's a error we know this a resonse from firebase,
          // if not we are throwing the error itself, in this case
          // meaning the user has a unverified emailAdress.
          if (error) {
            this.error = "Wrong email or password";
            this.email = "";
            this.password = "";
          } else {
            this.requestEmailValidation = true;
          }
        });
    },
  },
};
</script>
