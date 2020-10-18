<template>
  <div>
    <h1>
      This is Tips.
      <div>
        <p>User first login?</p>
        {{ getUserProfile.firstLogIn }}
      </div>
      <div>
        <p>Looking at someone elses tips</p>
        {{ $route.params.slug }}
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
};
</script>
