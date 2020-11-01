<template>
  <div>
    <h1>These are my Tips.</h1>
    <TipOverview :tips="userTips" :is-owner="true" />
    <div v-if="newFollowers">
      <div
        v-for="newFollower in newFollowers"
        :key="newFollower.id"
        style="border: 2px solid red"
      >
        <router-link :to="{ name: 'Tips', params: { slug: newFollower.name } }">
          {{ newFollower.name }}
        </router-link>
        added you as a friend.
        <button @click="acceptFriendRequest(newFollower.id)">Accept</button>
        <button @click="denyFriendRequest(newFollower.id)">Deny</button>
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
    ...mapGetters(["userProfile", "userTips", "newFollowers"]),
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
