<template>
  <div>
    <div v-if="!confirmationEmailSent">
      <form>
        <label class="form-group">
          <div class="form-group-label">Email</div>
          <input type="email" v-model="email" required />
        </label>

        <label class="form-group">
          <div class="form-group-label">Password</div>
          <input type="password" v-model="password" required pattern=".{6,}" />
          <small>Password must be at least 6 characters long</small>
        </label>

        <label class="form-group">
          <div class="form-group-label">Repeat password</div>
          <input
            type="password"
            v-model="passwordRepeat"
            required
            pattern=".{6,}"
          />
        </label>

        <button type="submit" @click.prevent="validate()">
          Create account
        </button>
      </form>
    </div>
    <div v-else>
      We've sent you a email?
    </div>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");

export default {
  name: "UserRegistration",
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      confirmationEmailSent: false,
    };
  },
  methods: {
    validate() {
      // @TODO: Add validations
      this.signUp();
    },

    signUp() {
      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          this.sendConfirmationEmail(response.user.email);
        })
        .catch((error) => {
          console.log("createUserWithEmailAndPassword error:", error);
        });
    },

    sendConfirmationEmail(email) {
      const actionCodeSettings = {
        url: "http://localhost:8080/confirm-email",
        handleCodeInApp: true,
      };

      fb.auth
        .sendSignInLinkToEmail(email, actionCodeSettings)
        .then(() => {
          this.confirmationEmailSent = true;
          window.localStorage.setItem("emailForSignIn", email);
        })
        .catch((error) => {
          console.log("sendSignInLinkToEmail error:", error);
        });
    },
  },
};
</script>
