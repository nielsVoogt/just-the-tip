<template>
  <div>
    <div v-if="!showAskForMail">
      <h1>Your email is confirmed!</h1>
      <p>
        Thanks for confirming your email, you can now use the login page to
        enter the application
      </p>
      <router-link :to="{ name: 'Login' }">
        Continue to login
      </router-link>
    </div>
    <div v-else>
      <h1>Hmmmm</h1>
      <p>
        It looks like you opened the verification link on another device. Please
        type your email in the field below and click 'Verify email and Login'
      </p>
      <form @submit.prevent="continueWithSignIn()">
        <input type="email" v-model="email" required />
        <button type="submit">Verify email and Login</button>
      </form>
    </div>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");

export default {
  name: "ConfirmEmail",
  data() {
    return {
      showAskForMail: false,
      email: "",
    };
  },
  created() {
    const url = location.href;
    const email = window.localStorage.getItem("emailForSignIn");

    if (fb.auth.isSignInWithEmailLink(url) && email) {
      fb.auth.signInWithEmailLink(email, url).then(() => {
        window.localStorage.removeItem("emailForSignIn");
      });
    } else {
      this.showAskForMail = true;
    }
  },
  methods: {
    continueWithSignIn() {
      fb.auth.signInWithEmailLink(this.email, location.href).then(() => {
        router.push({
          name: "login",
          params: { verifiedFromOtherDevice: true },
        });
      });
    },
  },
};
</script>
