<template>
  <div>
    <h1>This is Friends.</h1>
    <FriendsOverview />
  </div>
</template>

<script>
import FriendsOverview from "@/components/friends/FriendsOverview";

export default {
  name: "Friends",
  components: {
    FriendsOverview,
  },
};
</script>
