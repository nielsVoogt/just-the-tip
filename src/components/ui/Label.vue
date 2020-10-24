<template>
  <div :class="['label', `label--${name}`]">{{ name }}</div>
</template>

<script>
export default {
  name: "Label",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.label {
  background: orange;
  padding: 0 0.75em;
  font-size: 0.875rem;
  height: 25px;
  line-height: 25px;
  color: white;
  border-radius: 20px;

  &--recipe {
    background: #5cba5a;
  }

  &--movie {
    background: #5a97ba;
  }

  &--book {
    background: #e05e5e;
  }

  &--recipe {
    background: #cc308d;
  }
}
</style>
