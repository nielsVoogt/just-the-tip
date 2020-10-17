<template>
  <div>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore.
    </p>

    <form v-if="!resetPasswordEmailSent" @submit.prevent="validate()">
      <Input
        type="email"
        label="Email"
        placeholder="e.g. niels@company.nl"
        v-model="email"
      />

      <Button type="submit" size="lg" full-width>
        Request password reset
      </Button>
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
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
const fb = require("@/firebaseConfig.js");

export default {
  name: "ResetPasswordForm",
  components: {
    Button,
    Input,
  },
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
