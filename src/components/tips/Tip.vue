<template>
  <div class="tip">
    <h2>{{ tip.title }}</h2>
    <p>{{ tip.description }}</p>
    {{ showOptions }}
  </div>
</template>

<script>
export default {
  name: "Tip",
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