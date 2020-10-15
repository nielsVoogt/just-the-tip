<template>
  <div style="border: 2px solid red; padding: 3em;">
    <input type="password" v-model="confirmUserDeletePassword" />
    <button type="button" @click="validateUserDelete()">
      Delete my account
    </button>
  </div>
</template>

<script>
import reAuthenticateUser from "../firebaseUtils/reAuthenticateUser";
import { mapActions } from "vuex";

export default {
  name: "DeleteAccount",
  data() {
    return {
      confirmUserDeletePassword: "",
    };
  },
  methods: {
    ...mapActions["deleteAccountAction"],

    async validateUserDelete() {
      const user = await reAuthenticateUser(
        this.confirmUserDeletePassword
      ).catch((error) => {
        console.log("User made mistake in password", error.message);
      });
      await this.deleteAccountAction({ user });
    },
  },
};
</script>
