<template>
  <div>
    <h1>
      This is Tips.
      <div v-if="getUserProfile">
        <p>User first login?</p>
        {{ getUserProfile.firstLogin }}
      </div>
      <div v-if="$route.params.slug">
        <p>Looking at {{ $route.params.slug }} tips</p>
      </div>
    </h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Tips",
  computed: {
    ...mapGetters(["getUserProfile"]),
  },
  created() {
    console.log(this.$route.params.slug);
  },
};
</script>
