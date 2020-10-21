<template>
  <div>
    <h1>
      These are my Tips.
    </h1>
    <Tip
      v-for="tip in getUserTips"
      :key="tip.id"
      :tip="tip.content"
      :id="tip.id"
      showOptions
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Tip from "@/components/tips/Tip";

export default {
  name: "MyTips",
  components: {
    Tip,
  },
  computed: {
    ...mapGetters(["getUserProfile", "getUserTips"]),
  },
};
</script>
