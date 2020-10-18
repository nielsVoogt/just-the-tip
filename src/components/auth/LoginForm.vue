<template>
  <div>
    <p class="mb-1">
      The easiest way to share tips among your friends! Use your credentials to
      log in or <a href="#">click here</a> to create a new account!
    </p>

    <form @submit.prevent="validate()" novalidate>
      <small v-if="error">{{ error }}</small>

      <Input
        type="email"
        label="Email"
        placeholder="e.g. niels@company.nl"
        v-model="email"
        :error="fieldErrors.email"
        @blur="validateEmailAdress()"
        @change="fieldErrors.email = ''"
      />

      <Input
        type="password"
        label="Password"
        placeholder="Your password"
        v-model="password"
        :error="fieldErrors.password"
        @change="fieldErrors.password = ''"
      />

      <div v-if="requestEmailValidation" style="border:2px solid red;">
        <h1>You haven't validated your email yet</h1>
        <p>
          We've sent you a email that contains a link to confirm your email
          adress. You need to confirm your email adress to be able to log in
        </p>
      </div>

      <Button type="submit" size="lg" full-width>
        Login
      </Button>
    </form>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default {
  name: "LoginForm",
  components: {
    Button,
    Input,
  },
  data() {
    return {
      email: "",
      password: "",
      error: false,
      requestEmailValidation: false,
      fieldErrors: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  methods: {
    ...mapActions(["loginAction"]),

    validateEmailAdress() {
      const isEmailValid = this.$v.email.email;
      this.fieldErrors.email = !isEmailValid
        ? "This is not a valid email adress"
        : "";
    },

    validate() {
      if (!this.$v.email.required) {
        this.fieldErrors.email = "Email adress can't be empty";
      }

      if (!this.$v.password.required) {
        this.fieldErrors.password = "The password can't be empty";
      }

      if (
        !this.$v.password.required ||
        !this.$v.email.required ||
        !this.$v.email.email
      )
        return;

      this.login();
    },

    login() {
      this.loginAction({ email: this.email, password: this.password })
        .then((response) => {
          console.log("loggedInResponse", response);
          this.$router.push({ name: "Tips" });
        })
        .catch((error) => {
          console.log(error);
          // If there's a error we know this a resonse from firebase,
          // if not we are throwing the error itself, in this case
          // meaning the user has a unverified emailAdress.
          if (error) {
            this.error = "Wrong email or password";
            this.email = "";
            this.password = "";
          } else {
            this.requestEmailValidation = true;
          }
        });
    },
  },
};
</script>
