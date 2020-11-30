<template>
  <div>
    <div class="header">
      <PaperclipIcon size="20" />
      <span class="header-title">My tips</span>
    </div>
    <TipOverview :tips="userTips" :is-owner="true" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TipOverview from "@/components/tips/TipOverview";
import { PaperclipIcon } from "vue-feather-icons";
export default {
  name: "MyTips",
  components: {
    TipOverview,
    PaperclipIcon,
  },
  computed: {
    ...mapGetters(["userTips"]),
  },
};
</script>
