<template>
  <div :class="['label', `label--${name.toLowerCase()}`]">
    {{ name }}
  </div>
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
  padding: 0.125em 0.5em;
  font-size: 0.875rem;
  color: white;
  border-radius: 3px;
  display: flex;
  align-items: center;

  &--recipe {
    background: #5cba5a;
  }

  &--movie {
    background: #5a97ba;
  }

  &--documentary {
    background: #e05e5e;
  }

  &--recipe {
    background: #cc308d;
  }
}
</style>
