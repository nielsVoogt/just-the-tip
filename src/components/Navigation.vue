<template>
  <div id="menu">
    <div v-if="currentUser">
      <router-link :to="{ name: 'Tips'}">Your tips</router-link> |
      <router-link :to="{ name: 'Friends'}">Your friends</router-link>

      <div>
      <router-link :to="{ name: 'Settings'}">Settings</router-link>
      </div>
      <button @click="signOut">Log out</button>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Registration'}">Register</router-link> |
      <router-link :to="{ name: 'Login'}">Log in</router-link>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

const fb = require("@/firebaseConfig.js");

export default {
  name: "Navigation",
  computed: mapState(["currentUser"]),
  methods: {
    signOut() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">

</style>
