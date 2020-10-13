<template>
  <div>
    <div v-if="!confirmationEmailSent">
      <form>
        <label class="form-group">
          <div class="form-group-label">Email</div>
          <input type="email" v-model="email" required />
        </label>

        <label class="form-group">
          <div class="form-group-label">Password</div>
          <input type="password" v-model="password" required pattern=".{6,}" />
          <small>Password must be at least 6 characters long</small>
        </label>

        <label class="form-group">
          <div class="form-group-label">Repeat password</div>
          <input
            type="password"
            v-model="passwordRepeat"
            required
            pattern=".{6,}"
          />
        </label>

        <button type="submit" @click.prevent="validate()">
          Create account
        </button>
      </form>
    </div>
    <div v-else>
      We've sent you a email
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UserRegistration",
  data() {
    return {
      email: "",
      password: "",
      passwordRepeat: "",
      confirmationEmailSent: false,
    };
  },
  methods: {
    ...mapActions(["signUpAction"]),
    validate() {
      // @TODO: Add validations
      this.signUp();
    },
    signUp() {
      this.signUpAction({ email: this.email, password: this.password })
        .then(() => {
          console.log("Het is gelukt!");
        })
        .catch((error) => {
          console.log("Het is niet gelukt!", error);
        });
    },
  },
};
</script>
