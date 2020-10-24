<template>
  <div>
    <button
      @click="selectCategory('ALL')"
      :class="{ active: selected === 'ALL' }"
    >
      All
    </button>
    <button
      v-for="(category, index) in categories"
      :key="`category-${index}`"
      @click="selectCategory(category)"
      :class="{ active: selected === category }"
    >
      {{ category }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Filters",
  props: {
    categories: {
      type: Array,
      required: false,
    },
    selected: {
      type: String,
      required: true,
    },
  },
  methods: {
    selectCategory(category) {
      this.$emit("category-selected", category);
    },
  },
};
</script>

<style scoped lang="scss">
button {
  background: white;
  border-radius: 50px;
  height: 30px;
  line-height: 30px;
  padding: 0 1em;

  &:hover {
    background: orange;
  }

  &.active {
    pointer-events: none;
    background: yellow;
  }
}
</style>
