<template>
  <div class="tip">
    <h2>{{ tip.title }}</h2>
    <p>{{ tip.description }}</p>
    <p>{{ tip.url }}</p>
    <div>{{ tip.category }}</div>

    <OptionsMenu v-if="showOptions">
      <button @click="editTip()">Edit</button>
      <button @click="deleteTip()">Delete</button>
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
    tip: {
      type: Object,
      required: true,
    },
    showOptions: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    editTip() {
      this.$emit("edit");
    },
    deleteTip() {
      this.$emit("delete");
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
