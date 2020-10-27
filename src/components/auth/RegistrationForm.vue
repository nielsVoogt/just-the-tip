d<template>
  <div>
    <p>
      Please add your details to register your account. Already got a account?
      <router-link :to="{ name: 'Login' }">Click here</router-link>
      to login.
    </p>

    <form @submit.prevent="validate()">
      <fieldset>
        <Input
          type="text"
          label="Username"
          placeholder="e.g. nielsthedev"
          v-model="username"
          v-on:blur="validateUsername()"
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
      </fieldset>
      <FormError v-if="formError" :error="formError" @close="formError = ''" />

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
import { mapGetters, mapActions } from "vuex";
import createUserCollections from "../../utils/createUserCollections.js";
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
  watch: {
    username(name) {
      if (/\s/.test(name)) {
        this.fieldErrors.username = "Username can't contain spaces";
      }
    },
  },
  methods: {
    ...mapActions(["logOutAction"]),
    async validateUsername() {
      if (this.username !== "") {
        const chosenUsername = await fb.userNamesCollection
          .doc(this.username.toLowerCase())
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
        if (!this.$v.username.$required)
          this.fieldErrors.username = "Username can't be empty";
        if (!this.$v.email.$required)
          this.fieldErrors.email = "Email can't be empty";
        if (!this.$v.password.$required)
          this.fieldErrors.password = "Password can't be empty";
      } else {
        this.signUp();
      }
    },

    signUp() {
      this.accountSetup = true;
      fb.auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          createUserCollections(
            response.user.uid,
            this.username.toLowerCase()
          ).then(() => {
            // Unfortunatly Firebase does a automatic login after creation.
            // We block this behaviour by immediatly logging the user out after creation
            this.logOutAction();
            response.user
              .sendEmailVerification({
                url: `${process.env.VUE_APP_URL}/login`,
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
