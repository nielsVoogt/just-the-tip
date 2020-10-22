<template>
  <div style="border: 2px solid green; padding: 3em;">
    <input type="email" v-model="newEmailAdress" />
    <input type="password" v-model="password" />
    <small v-if="error">{{ error }}</small>
    <button
      type="button"
      @click="validateChangeEmailAdressRequest()"
      :disabled="password.length === 0"
    >
      Change my email adress
    </button>
  </div>
</template>

<script>
import reAuthenticateUser from "@/firebaseUtils/reAuthenticateUser";
const fb = require("@/firebaseConfig.js");

export default {
  name: "EmailAdress",
  data() {
    return {
      newEmailAdress: "",
      password: "",
      error: false,
    };
  },
  methods: {
    changeEmailAdress() {
      fb.auth.currentUser
        .updateEmail(this.newEmailAdress)
        .then(() => {
          this.$notificationHub.$emit("add-notification", {
            message: "Email adress updated",
            type: "default",
          });
        })
        .catch((error) => console.error(error));
    },

    passwordIncorrect() {
      this.error = "The password is invalid, please enter your password again.";
      this.password = "";
    },

    validateProfileChange() {
      reAuthenticateUser(this.password)
        .then(() => {
          this.changeEmailAdress();
        })
        .catch((error) => {
          error.code === "auth/wrong-password"
            ? this.passwordIncorrect()
            : console.error(error);
        });
    },
  },
};
</script>
