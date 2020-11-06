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
      :cta="cta"
    />
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";
import TipOverview from "@/components/tips/TipOverview";
import getUidFromSlug from "@/utils/getUidFromSlug";
import getTips from "@/utils/getTips";
import getUserProfile from "@/utils/getUserProfile";
import { mapGetters } from "vuex";

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
      cta: false,
    };
  },
  components: {
    TipOverview,
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    async checkIfProfileIsPublic(uid) {
      const self = this;
      const profile = await getUserProfile(uid);

      if (!profile.public) {
        this.userNotPublic = true;
        return;
      } else {
        this.uid = uid;
        this.user ? this.getUserTips() : this.getUserTips(2);
      }
    },

    async getUserTips(limit) {
      const tips = limit
        ? await getTips(this.uid, limit)
        : await getTips(this.uid);

      if (limit) {
        this.cta = true;
      }

      this.tips = tips;
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
