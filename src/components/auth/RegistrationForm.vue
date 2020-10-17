d<template>
  <div>
    <p class="mb-1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore.
    </p>
    <form>
      <Input
        type="text"
        label="Username"
        placeholder="e.g. nielsthedev"
        v-model="username"
        v-on:blur="checkIfUserNameIsUnique()"
        v-on:change="usernameExists = false"
        error="Wrong stuff brah"
      />

      <Input
        type="email"
        label="Email"
        placeholder="e.g. niels@company.nl"
        v-model="email"
      />

      <Input
        type="password"
        label="Password"
        placeholder="Your password"
        v-model="password"
      />

      <Input
        type="password"
        label="Repeat password"
        placeholder="Repeat your password"
        v-model="passwordRepeat"
      />

      <Button type="submit" @click.prevent="validate()" size="lg" full-width>
        <Spinner v-if="accountSetup" />
        <span v-else> Create account</span>
      </Button>
    </form>
  </div>
</template>

<script>
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { mapGetters, mapActions } from "vuex";
import createUserCollections from "../../firebaseUtils/createUserCollections.js";
import Spinner from "@/components/ui/Spinner";

const fb = require("@/firebaseConfig.js");

export default {
  name: "RegistrationForm",
  components: {
    Spinner,
    Button,
    Input,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      passwordRepeat: "",
      usernameExists: false,
      accountSetup: false,
      error: false,
    };
  },
  methods: {
    ...mapActions(["logOutAction"]),
    async checkIfUserNameIsUnique() {
      if (this.username !== "") {
        const chosenUsername = await fb.userNamesCollection
          .doc(this.username)
          .get();
        this.usernameExists = chosenUsername.exists;
      }
    },

    validate() {
      // @TODO: Add validations
      this.signUp();
    },

    signUp() {
      this.accountSetup = true;
      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          createUserCollections(response.user.uid, this.username).then(() => {
            // Unfortunatly Firebase does a automatic login after creation.
            // We block this behaviour by immediatly logging the user out after creation
            this.logOutAction();
            response.user
              .sendEmailVerification({
                url: "http://localhost:8080/login",
                handleCodeInApp: false,
              })
              .then(() => {
                this.$emit("confirmation-email-sent");
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
