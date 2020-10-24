<template>
  <div>
    {{ username }}
    <div v-if="userNotFound">UserNotFound</div>
    <div v-if="userNotPublic">User not public</div>
    <UserTips :tips="tips" :show-options="false" v-if="tips.length" />
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";
import UserTips from "@/components/tips/UserTips";
import getUidFromSlug from "@/utils/getUidFromSlug";
import getTips from "@/utils/getTips";
import getUserProfile from "@/utils/getUserProfile";

export default {
  name: "Tips",
  data() {
    return {
      noResults: false,
      username: this.$route.params.slug,
      public: true,
      userNotFound: false,
      userNotPublic: false,
      tips: [],
    };
  },
  components: {
    UserTips,
  },
  methods: {
    checkIfProfileIsPublic(uid) {
      const self = this;
      getUserProfile(uid).then((user) => {
        if (user.public) {
          getTips(uid).then((tips) => {
            this.tips = tips;
          });
        } else {
          this.userNotPublic = true;
        }
      });
    },
  },
  created() {
    getUidFromSlug(this.$route.params.slug)
      .then((uid) => this.checkIfProfileIsPublic(uid))
      .catch(() => {
        this.userNotFound = true;
      });
  },
};
</script>
