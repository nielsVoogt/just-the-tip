<template>
  <div>
    <h1>These are my Tips.</h1>
    <UserTips :tips="getUserTips" :show-options="true" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserTips from "@/components/tips/UserTips";

export default {
  name: "MyTips",
  components: {
    UserTips,
  },
  computed: {
    ...mapGetters(["getUserProfile", "getUserTips"]),
  },
};
</script>
