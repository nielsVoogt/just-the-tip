<template>
  <div>
    <h1>I am favorites</h1>
    <TipOverview
      :tips="likedTips"
      :is-owner="false"
      :is-favorite="true"
      v-if="likedTips.length"
      :uid="user.uid"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import getLikedTips from "@/utils/getLikedTips";

import TipOverview from "@/components/tips/TipOverview";
export default {
  name: "Favorites",
  components: {
    TipOverview,
  },
  data() {
    return {
      likedTips: [],
    };
  },
  computed: {
    ...mapGetters(["followers", "user"]),
  },
  created() {
    const followersUids = this.followers.map((follower) => follower.uid);
    getLikedTips(followersUids).then((tips) => (this.likedTips = tips));
  },
};
</script>
