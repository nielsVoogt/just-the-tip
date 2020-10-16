d<template>
  <div>
    <div v-if="!confirmationEmailSent">
      <form>
        <label class="form-group">
          <div class="form-group-label">Username</div>
          <input
            type="email"
            v-model="username"
            required
            v-on:blur="checkIfUserNameIsUnique()"
            v-on:change="usernameExists = false"
          />
          <div v-if="usernameExists">
            This username already exists, please choose a different username.
          </div>
        </label>

        <label class="form-group">
          <div class="form-group-label">Email</div>
          <input type="email" v-model="email" required />
          <div v-if="error">{{ error }}</div>
        </label>

        <label class="form-group">
          <div class="form-group-label">Password</div>
          <input type="password" v-model="password" required pattern=".{6,}" />
          <small>Password must be at least 6 characters long</small>
        </label>

        <!-- <label class="form-group">
          <div class="form-group-label">Repeat password</div>
          <input
            type="password"
            v-model="passwordRepeat"
            required
            pattern=".{6,}"
          />
        </label> -->

        <button type="submit" @click.prevent="validate()">
          <Spinner v-if="accountSetup" />
          <span v-else> Create account</span>
        </button>
      </form>
    </div>
    <div v-else>
      We've sent you a email to confirm your account.
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Spinner from "@/components/Spinner";
import createUserCollections from "../firebaseUtils/createUserCollections.js";
const fb = require("@/firebaseConfig.js");

export default {
  name: "UserRegistration",
  components: {
    Spinner,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      confirmationEmailSent: false,
      usernameExists: false,
      error: false,
      accountSetup: false,
    };
  },
  methods: {
    ...mapActions(["logOutAction"]),
    async checkIfUserNameIsUnique() {
      const chosenUsername = await fb.userNamesCollection
        .doc(this.username)
        .get();

      this.usernameExists = chosenUsername.exists;
    },

    validate() {
      // @TODO: Add validations
      this.signUp();
    },

    signUp() {
      this.accountSetup = true;
      // @TODO: Creating collections might take a while. Maybe just store the username and do the rest after login
      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          createUserCollections(response.user.uid, this.username).then(() => {
            this.logOutAction();
            response.user
              .sendEmailVerification({
                url: "http://localhost:8080/login",
                handleCodeInApp: false,
              })
              .then(() => {
                this.confirmationEmailSent = true;
              });
          });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            this.error = error.message;
            this.email = "";
          } else {
            console.log(error);
          }
        });
    },
  },
};
</script>
