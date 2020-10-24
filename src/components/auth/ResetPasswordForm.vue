<template>
  <div>
    <p>
      Please fill in your email adress below. We will send you a email
      containing a link that allows you to reset your password.
    </p>

    <form v-if="!resetPasswordEmailSent" @submit.prevent="validate()">
      <fieldset>
        <Input
          type="email"
          label="Email"
          placeholder="e.g. niels@company.nl"
          v-model="email"
          :error="fieldErrors.email"
          @blur="validateEmailAdress()"
          @change="fieldErrors.email = ''"
        />
      </fieldset>

      <Button type="submit" size="lg" full-width>
        Submit
      </Button>
    </form>

    <div v-else>
      <h1>Email sent</h1>
      <p>We've sent you a password reset email.</p>
      <router-link :to="{ name: 'Login' }">
        Back to login
      </router-link>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
const fb = require("@/firebaseConfig.js");

export default {
  name: "ResetPasswordForm",
  components: {
    Button,
    Input,
  },
  data() {
    return {
      email: "",
      resetPasswordEmailSent: false,
      fieldErrors: {
        email: "",
      },
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    validateEmailAdress() {
      const isEmailValid = this.$v.email.email;
      this.fieldErrors.email = !isEmailValid
        ? "This is not a valid email adress"
        : "";
    },

    validate() {
      if (!this.$v.email.required) {
        this.fieldErrors.email = "Email adress can't be empty";
        return;
      }
      this.resetPassword();
    },
    resetPassword() {
      fb.auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          this.resetPasswordEmailSent = true;
        })
        .catch((error) => {
          if (error.code === "auth/user-not-found") {
            this.fieldErrors.email =
              "We could not find your email adress. Maybe you made a mistake, check your email adress and try again";
          } else {
            console.log(error);
          }
        });
    },
  },
};
</script>
