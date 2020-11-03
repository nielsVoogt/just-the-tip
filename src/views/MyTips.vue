<template>
  <div>
    <h1>These are my Tips.</h1>
    <TipOverview :tips="userTips" :is-owner="true" />
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
    ...mapGetters(["userTips"]),
  },
};
</script>
