<template>
  <div>
    <SearchUsers />
    <div v-if="friends.length">
      {{ friends }}
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
    ...mapGetters(["friends", "userProfile"]),
  },
  watch: {
    userProfile(user) {
      if (user && user.following.length) {
        if (this.friends.length) return;
        this.fetchFriends();
      }
    },
  },
  methods: {
    ...mapActions(["fetchFriends"]),
  },
  created() {
    // There was a issue when a user refreshed the page the friends
    // were not fetched, because the userprofile wasn't loaded yet.
    // Thats why we check in the created hook + we watch the userProfile
    if (this.userProfile && this.userProfile.following.length) {
      if (this.friends.length) return;
      this.fetchFriends();
    }
  },
};
</script>
