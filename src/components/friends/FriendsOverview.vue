<template>
  <div>
    <SearchUsers />
    <div v-if="followers">
      {{ followers }}
    </div>
    <div v-else>
      You have no friends yet
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SearchUsers from "@/components/friends/SearchUsers";

export default {
  name: "FriendsOverview",
  components: {
    SearchUsers,
  },
  computed: {
    ...mapGetters(["followers"]),
  },
  methods: {
    ...mapActions(["fetchFollowersAction"]),
  },
  created() {
    if (this.followers === null) {
      this.fetchFollowersAction();
    }
  },
};
</script>
