<template>
  <div>
    <div class="header">
      <div class="friend">
        <div class="friend-avatar"></div>
        <div class="friend-details">
          <div>nelisthegreat69</div>
          <div>21 tips</div>
        </div>
      </div>
    </div>
    <SearchUsers />
    <div v-if="followers">
      <Friend
        v-for="follower in followers"
        :follower="follower"
        :key="follower.username"
      />
    </div>
    <div v-else>
      You have no friends yet
    </div>
    <div v-if="pendingFollowers">
      <FriendRequest
        v-for="pendingFollower in pendingFollowers"
        :pending-follower="pendingFollower"
        :key="pendingFollower.username"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SearchUsers from "@/components/friends/SearchUsers";
import Friend from "@/components/friends/Friend";
import FriendRequest from "@/components/friends/FriendRequest";

export default {
  name: "FriendsOverview",
  components: {
    FriendRequest,
    SearchUsers,
    Friend,
  },
  computed: {
    ...mapGetters(["followers", "pendingFollowers"]),
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
