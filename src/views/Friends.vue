<template>
  <div>
    <h1>This is Friends.</h1>
    <FriendsOverview />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import FriendsOverview from "@/components/friends/FriendsOverview";

export default {
  name: "Friends",
  components: {
    FriendsOverview,
  },
  methods: {
    ...mapActions(["fetchFollowingAction"]),
  },
  created() {
    this.fetchFollowingAction();
  },
};
</script>
