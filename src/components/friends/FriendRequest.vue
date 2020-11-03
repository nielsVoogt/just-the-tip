<template>
  <div style="border: 2px solid red">
    <router-link
      :to="{ name: 'Tips', params: { slug: pendingFollower.username } }"
    >
      {{ pendingFollower.username }}
    </router-link>
    added you as a friend.
    <button @click="acceptFriendRequest()">Accept</button>
    <button @click="denyFriendRequest()">Deny</button>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import friendRequest from "@/utils/friendRequest";

export default {
  name: "FriendRequest",
  props: {
    pendingFollower: {
      type: Object,
      required: true,
    },
  },
  methods: {
    acceptFriendRequest() {
      friendRequest("accept", this.pendingFollower).then(() => {
        console.log("accepted new follower");
        this.$notificationHub.$emit("add-notification", {
          message: `You accepted ${this.pendingFollower.username}'s request`,
          type: "default",
        });
      });
    },
    denyFriendRequest() {
      friendRequest("deny", this.pendingFollower).then(() => {
        console.log("denied then fired");
        this.$notificationHub.$emit("add-notification", {
          message: `You denied ${this.pendingFollower.username}'s request`,
          type: "default",
        });
      });
    },
  },
};
</script>
