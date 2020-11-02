<template>
  <div>
    <h1>These are my Tips.</h1>
    <TipOverview :tips="userTips" :is-owner="true" />
    <div v-if="pendingFollowers">
      <div
        v-for="pendingFollower in pendingFollowers"
        :key="pendingFollower.id"
        style="border: 2px solid red"
      >
        <router-link
          :to="{ name: 'Tips', params: { slug: pendingFollower.username } }"
        >
          {{ pendingFollower.username }}
        </router-link>
        added you as a friend.
        <button @click="acceptFriendRequest(pendingFollower.id)">Accept</button>
        <button @click="denyFriendRequest(pendingFollower.id)">Deny</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TipOverview from "@/components/tips/TipOverview";

export default {
  name: "MyTips",
  components: {
    TipOverview,
  },
  computed: {
    ...mapGetters(["userProfile", "userTips", "pendingFollowers"]),
  },
  methods: {
    acceptFriendRequest(id) {
      console.log("accept", id);
    },
    denyFriendRequest(id) {
      console.log("deny", id);
    },
  },
};
</script>
