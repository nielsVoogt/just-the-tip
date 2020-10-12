<template>
  <div>
    <form @submit.prevent="registerUser">


      <label class="form-group">
        <div class="form-group-label">First name</div>
        <input type="text" v-model="user.firstName" required />
      </label>

      <label class="form-group">
        <div class="form-group-label">Last name</div>
        <input type="text" v-model="user.lastName" required />
      </label>

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
        I agree to the to terms and conditions
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
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        alias: "",
        acceptedTerms: false,
      },
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
            .set({
              firstName: this.user.firstName,
              lastName: this.user.lastName,
            })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.$router.push({ name: "Tips" });
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