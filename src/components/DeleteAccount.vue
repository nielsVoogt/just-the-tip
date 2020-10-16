<template>
  <div style="border: 2px solid red; padding: 3em;">
    <input type="password" v-model="password" />
    <small v-if="error">{{ error }}</small>
    <button
      type="button"
      @click="validateDeleteUserRequest()"
      :disabled="password.length === 0"
    >
      Delete my account
    </button>
  </div>
</template>

<script>
import reAuthenticateUser from "../firebaseUtils/reAuthenticateUser";
import { mapActions } from "vuex";

export default {
  name: "DeleteAccount",
  data() {
    return {
      password: "",
      error: false,
    };
  },
  methods: {
    ...mapActions(["deleteAccountAction"]),

    deleteUser(user) {
      this.deleteAccountAction(user)
        .then(() => this.$router.push({ name: "LandingPage" }))
        .catch((error) => console.error(error));
    },

    passwordIncorrect() {
      this.error = "The password is invalid, please enter your password again.";
      this.password = "";
    },

    validateDeleteUserRequest() {
      reAuthenticateUser(this.password)
        .then((user) => this.deleteUser(user))
        .catch((error) => {
          error.code === "auth/wrong-password"
            ? this.passwordIncorrect()
            : console.error(error);
        });
    },
  },
};
</script>
