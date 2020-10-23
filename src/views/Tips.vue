<template>
  <div>
    <h1>This is tips</h1>
    <div v-if="loading">...loading</div>
    <div v-else>
      <Input
        type="search"
        placeholder="Search tips by title"
        v-model="searchQuery"
      />
      <Tip v-for="tip in filteredTips" :key="tip.id" :tip="tip.content" />
      <div v-if="noResults">
        No results
      </div>
    </div>
    <div v-if="userNotFound">UserNotFound</div>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig.js";
import Tip from "@/components/tips/Tip";
import getUidFromSlug from "@/utils/getUidFromSlug";
import getTips from "@/utils/getTips";
import getUserProfile from "@/utils/getUserProfile";
import Input from "@/components/ui/Input";

export default {
  name: "Tips",
  computed: {
    filteredTips() {
      const self = this;
      return this.tips.filter((tip) => {
        return tip.content.title.indexOf(self.searchQuery) !== -1;
      });
    },
  },
  data() {
    return {
      noResults: false,
      searchQuery: "",
      loading: true,
      tips: [],
      username: false,
      public: true,
      userNotFound: false,
    };
  },
  components: {
    Input,
    Tip,
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
      .catch(() => {
        this.loading = false;
        this.userNotFound = true;
      });
  },
};
</script>
