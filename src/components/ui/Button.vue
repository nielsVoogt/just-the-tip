<template>
  <button
    :class="[
      'btn',
      `btn--${size}`,
      `btn--${color}`,
      { 'btn--full': fullWidth },
    ]"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button",
  inheritAttrs: true,
  props: {
    fullWidth: {
      type: Boolean,
      required: false,
    },
    size: {
      type: String,
      required: false,
      default: "md",
      validator: function(value) {
        return ["sm", "md", "lg"].indexOf(value) !== -1;
      },
    },
    color: {
      type: String,
      required: false,
      default: "default",
      validator: function(value) {
        return (
          ["default", "primary", "secondary", "danger"].indexOf(value) !== -1
        );
      },
    },
  },
};
</script>

<style lang="scss">
button {
  -webkit-appearance: none;
  background: transparent;
  border: none;
  color: inherit;
  font: inherit;
  line-height: inherit;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  width: auto;
}

.btn {
  border-radius: 0.375em;
  cursor: pointer;
  color: white;
  background: #ffe500;
  font-weight: bold;
  color: #252525;

  &:hover {
    /* background: orange; */
    background: #ffd600;
  }

  &--sm {
    font-size: 0.875rem;
    height: 30px;
    line-height: 30px;
    padding: 0 0.75em;
  }

  &--md {
    font-size: 1rem;
    height: 40px;
    line-height: 40px;
    padding: 0 1em;
  }

  &--lg {
    font-size: 1.125rem;
    height: 50px;
    line-height: 50px;
    padding: 0 1.25em;
  }

  &--full {
    width: 100%;
  }

  // -------------- DISABLED

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
