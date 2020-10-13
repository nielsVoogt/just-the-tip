<template>
  <div>
    <form v-if="!resetPasswordEmailSent" @submit.prevent="validate()">
      <h1>Password reset</h1>
      <label class="form-group">
        <div class="form-group-label">
          Email
        </div>
        <input type="email" v-model="email" required />
        <small v-if="error">
          {{ error }}
        </small>
      </label>
      <button type="submit">
        Request password reset
      </button>
    </form>

    <div v-else>
      <h1>Email sent</h1>
      <p>We've sent you a password reset email.</p>
      <router-link :to="{ name: 'Login' }">
        Back to login
      </router-link>
    </div>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");

export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
      resetPasswordEmailSent: false,
      error: null,
    };
  },
  methods: {
    validate() {
      // @TODO: Add validation
      this.resetPassword();
    },
    resetPassword() {
      fb.auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.resetPasswordEmailSent = true;
        })
        .catch((error) => {
          this.error = error.message;
          this.email = "";
        });
    },
  },
};
</script>
