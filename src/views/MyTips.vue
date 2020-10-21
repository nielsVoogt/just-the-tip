<template>
  <div>
    <h1>
      This is Tips.
    </h1>
    <div v-if="getUserProfile">
      <p>User first login?</p>
      {{ getUserProfile.firstLogin }}
    </div>
    <div v-for="tip in getUserTips" :key="tip.uid" class="tip">
      <h2>{{ tip.content.title }}</h2>
      <p>{{ tip.content.description }}</p>
    </div>
    <div v-if="$route.params.slug">
      <p>Looking at {{ $route.params.slug }} tips</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MyTips",
  computed: {
    ...mapGetters(["getUserProfile", "getUserTips"]),
  },
};
</script>

<style scoped>
.tip {
  border: 1px solid black;
  padding: 1em;
  display: inline-block;
  background: white;
  margin: 1em;
  width: 300px;
}
</style>
