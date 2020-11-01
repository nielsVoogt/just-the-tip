<template>
  <div>
    {{ username }} {{ uid }}
    <div v-if="userNotFound">UserNotFound</div>
    <div v-if="userNotPublic">User not public</div>
    <TipOverview
      :tips="tips"
      :is-owner="false"
      v-if="tips.length"
      :uid="uid"
      :slug="username"
    />
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";
import TipOverview from "@/components/tips/TipOverview";
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
      uid: false,
    };
  },
  components: {
    TipOverview,
  },
  methods: {
    checkIfProfileIsPublic(uid) {
      const self = this;
      getUserProfile(uid).then((user) => {
        if (user.public) {
          this.uid = uid;
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
