<template>
  <div>
    <form @submit.prevent="registerUser" v-if="!showTerms">
      <label class="form-group">
        <div class="form-group-label">Email</div>
        <input type="email" v-model="user.email" required />
      </label>

      <label class="form-group">
        <div class="form-group-label">Password</div>
        <input type="password" v-model="user.password" required pattern=".{6,}" />
        <small>Password must be at least 6 characters long</small>
      </label>

      <label>
        <input type="checkbox" @click="user.acceptedTerms=!user.acceptedTerms" />
        I agree to the
        <a href="#" @click.prevent="showTerms=true">to terms and conditions</a>
      </label>

      <button type="submit" :disabled="!user.acceptedTerms">Create account</button>
      {{feedback}}
    </form>
  </div>
</template>

<script>
const fb = require("@/firebaseConfig.js");

export default {
  name: "UserRegistration",
  data() {
    return {
      user: {
        email: "",
        password: "",
        acceptedTerms: false,
      },
      showTerms: false,
      feedback: "",
    };
  },
  methods: {
    registerUser() {
      fb.auth
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((cred) => {
          this.$store.commit("setCurrentUser", cred.user);
          fb.usersCollection
            .doc(cred.user.uid)
            .set({ acceptedTerms: this.user.acceptedTerms })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.$router.push({ name: "/" });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          this.feedback = err.message;
        });
    },
  },
};
</script>