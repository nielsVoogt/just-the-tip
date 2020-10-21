d<template>
  <div>
    <p class="mb-1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore.
    </p>
    <form @submit.prevent="validate()">
      <FormError v-if="formError" :error="formError" @close="formError = ''" />
      <Input
        type="text"
        label="Username"
        placeholder="e.g. nielsthedev"
        v-model="username"
        v-on:blur="checkIfUserNameIsUnique()"
        v-on:change="usernameExists = false"
        :error="fieldErrors.username"
        @change="fieldErrors.username = ''"
      />

      <Input
        type="email"
        label="Email"
        placeholder="e.g. niels@company.nl"
        v-model="email"
        :error="fieldErrors.email"
        v-on:blur="validateEmailAdress()"
      />

      <Input
        type="password"
        label="Password"
        placeholder="Your password"
        v-model="password"
        sublabel="Your password should be at least 6 characters long"
        :error="fieldErrors.password"
        v-on:blur="validatePassword()"
        @change="fieldErrors.password = ''"
      />

      <Button type="submit" size="lg" full-width>
        <Spinner v-if="accountSetup" />
        <span v-else> Create account</span>
      </Button>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from "vuelidate/lib/validators";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/FormError";
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
    FormError,
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      usernameExists: false,
      accountSetup: false,
      formError: false,
      fieldErrors: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  validations: {
    username: {
      required,
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
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

    validatePassword() {
      if (!this.$v.password.minLength) {
        this.fieldErrors.password =
          "The password is not long enough, a minimum of 6 characters is required.";
        return false;
      }
    },

    validateEmailAdress() {
      const isEmailValid = this.$v.email.email;
      this.fieldErrors.email = !isEmailValid
        ? "This is not a valid email adress"
        : "";
    },

    validate() {
      if (this.$v.$invalid) {
        if (!this.$v.username.$required) this.fieldErrors.username = true;
        if (!this.$v.email.$required) this.fieldErrors.email = true;
        if (!this.$v.password.$required) this.fieldErrors.password = true;
        this.formError = "Please fill in all fields";
      } else {
        this.signUp();
      }
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