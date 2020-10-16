<template>
  <div>
    <h1>This is Tips.{{ getUserProfile.firstLogIn }}</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Tips",
  computed: {
    ...mapGetters(["getUserProfile"]),
  },
};
</script>
