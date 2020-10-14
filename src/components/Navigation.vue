<template>
  <div id="menu">
    <div v-if="getUser">
      <router-link :to="{ name: 'Tips' }">Your tips</router-link> |
      <router-link :to="{ name: 'Friends' }">Your friends</router-link>

      <div>
        <router-link :to="{ name: 'Settings' }">Settings</router-link>
      </div>
      <button @click="logOutAction()">Log out</button>
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
    ...mapGetters(["getUser"]),
  },
  methods: {
    ...mapActions(["logOutAction"]),
  },
};
</script>

<style lang="scss"></style>
