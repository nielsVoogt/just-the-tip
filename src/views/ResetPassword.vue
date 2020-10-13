<template>
  <div>
    <form v-if="!resetPasswordEmailSent">
      <h1>Password reset</h1>
      <label class="form-group">
        <div class="form-group-label">
          Email
        </div>
        <input type="email" v-model="email" required />
      </label>
      <button type="submit" @click.prevent="validate()">
        Request password reset
      </button>
    </form>

    <div v-else>
      <h1>Email sent</h1>
      <p>We've sent you a password reset email</p>
      <button>back to login</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "ResetPassword",
  data() {
    return {
      email: "",
      resetPasswordEmailSent: false,
    };
  },
  methods: {
    ...mapActions(["passwordResetAction"]),
    validate() {
      // @TODO: Add validation
      this.resetPassword();
    },
    resetPassword() {
      this.resetPasswordAction(email);
    },
  },
};
</script>
