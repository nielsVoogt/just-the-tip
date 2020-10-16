<template>
  <div id="menu">
    <div v-if="isUserAuth">
      <router-link :to="{ name: 'Tips' }">Your tips</router-link> |
      <router-link :to="{ name: 'Friends' }">Your friends</router-link>

      <div>
        <router-link :to="{ name: 'Settings' }">Settings</router-link>
      </div>
      <button @click="logOut()">Log out</button>
    </div>
    <div v-else>
      <router-link :to="{ name: 'Registration' }">Register</router-link> |
      <router-link :to="{ name: 'Login' }">Log in</router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Navigation",
  computed: {
    ...mapGetters(["isUserAuth"]),
  },
  methods: {
    ...mapActions(["logOutAction"]),
    logOut() {
      this.logOutAction().then(() =>
        this.$router.push({ name: "LandingPage" }).catch(() => {})
      );
    },
  },
};
</script>

<style lang="scss"></style>
