<template>
  <div class="tip">
    <h2>{{ tip.title }}</h2>
    <p>{{ tip.description }}</p>
    <p>{{ tip.url }}</p>

    <OptionsMenu v-if="showOptions">
      <ul>
        <li>Option</li>
        <li>Option</li>
      </ul>
    </OptionsMenu>
  </div>
</template>

<script>
import OptionsMenu from "@/components/ui/OptionsMenu";

export default {
  name: "Tip",
  components: {
    OptionsMenu,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    tip: {
      type: Object,
      required: true,
    },
    showOptions: {
      type: Boolean,
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
.tip {
  border: 1px solid black;
  padding: 1em;
  display: inline-block;
  background: white;
  margin: 1em;
  width: 300px;
}
</style>
