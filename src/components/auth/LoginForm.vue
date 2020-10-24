<template>
  <div>
    <div v-if="!requestEmailValidation">
      <p>
        The easiest way to share tips among your friends! Use your credentials
        to log in or
        <router-link :to="{ name: 'Registration' }">click here</router-link>
        to create a new account!
      </p>

      <form @submit.prevent="validate()" novalidate>
        <small v-if="error">{{ error }}</small>
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

          <Input
            type="password"
            label="Password"
            placeholder="Your password"
            v-model="password"
            :error="fieldErrors.password"
            @change="fieldErrors.password = ''"
          />
        </fieldset>

        <Button type="submit" size="lg" full-width>
          Login
        </Button>
      </form>
    </div>
    <div v-else class="request-email-validation">
      <h2>You haven't validated your email yet</h2>
      <p>
        We've sent you a email that contains a link to confirm your email
        adress. You need to confirm your email adress to be able to log in
      </p>
      <Button size="lg" full-width @click="requestEmailValidation = false">
        Back to login
      </Button>
    </div>
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
    ...mapActions(["logInAction"]),

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
      this.logInAction({ email: this.email, password: this.password })
        .then((response) => {
          console.log("loggedInResponse", response);
          this.$router.push({ name: "MyTips" });
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

<style scoped lang="scss">
.request-email-validation {
  text-align: center;
  h2 {
    font-weight: 700;
    font-size: 1.25rem;
    margin-bottom: 1em;
  }

  p {
    margin-bottom: 2em;
  }
}
</style>
