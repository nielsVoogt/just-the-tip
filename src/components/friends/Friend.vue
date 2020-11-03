<template>
  <router-link
    :to="{ name: 'Tips', params: { slug: follower.username } }"
    class="friend"
  >
    <div>{{ follower.username }}</div>
    <div>{{ follower.tipCount }} tips</div>
  </router-link>
</template>

<script>
export default {
  name: "Friend",
  props: {
    follower: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.friend {
  background: white;
  display: inline-block;
  padding: 1em;
  font-weight: normal;
  text-decoration: none;
  margin: 1em;
}
</style>
