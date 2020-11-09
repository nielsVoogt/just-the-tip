<template>
  <div>
    <div v-if="userNotFound">UserNotFound</div>
    <div v-if="userNotPublic">User not public</div>
    <TipOverview
      :tips="friendTips"
      :is-owner="false"
      v-if="friendTips.length"
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
import { mapActions, mapGetters } from "vuex";

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
    ...mapGetters(["user", "friendTips"]),
  },
  methods: {
    ...mapActions(["editFriendTipsAction"]),

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

      this.editFriendTipsAction(tips);
    },
  },
  created() {
    getUidFromSlug(this.$route.params.slug)
      .then((uid) => this.checkIfProfileIsPublic(uid))
      .catch(() => {
        this.userNotFound = true;
      });
  },
  beforeDestroy() {
    this.editFriendTipsAction([]);
  },
};
</script>
