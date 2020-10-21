<template>
  <div>
    <h1>This is tips</h1>
    <div v-if="loading">...loading</div>
    <div v-else>
      {{ this.username }}
      {{ this.tips }}
    </div>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";
import getUidFromSlug from "@/firebaseUtils/getUidFromSlug";
import getTips from "@/firebaseUtils/getTips";
import getUserProfile from "@/firebaseUtils/getUserProfile";

export default {
  name: "Tips",
  data() {
    return {
      loading: true,
      tips: false,
      username: false,
      public: true,
      error: false,
    };
  },
  methods: {
    async checkIfProfileIsPublic(uid) {
      const self = this;
      const user = await getUserProfile(uid);
      if (user.public) {
        this.username = user.username;
        this.tips = await getTips(uid);
        this.loading = false;
      } else {
        this.public = false;
      }
    },
  },
  created() {
    getUidFromSlug(this.$route.params.slug)
      .then((uid) => this.checkIfProfileIsPublic(uid))
      .catch(() => (this.error = true));
  },
};
</script>
