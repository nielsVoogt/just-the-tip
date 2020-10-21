<template>
  <div class="options-menu" @mouseleave="mouseLeave" @mouseenter="mouseEnter">
    <button @click="show = !show" type="button" class="options-menu-button">
      Options
    </button>
    <div :class="{ 'options-menu-list--show': show }" class="options-menu-list">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "OptionsMenu",
  data() {
    return {
      show: false,
      timeOut: false,
    };
  },
  methods: {
    mouseLeave() {
      this.timeOut = setTimeout(() => {
        this.show = false;
      }, 500);
    },
    mouseEnter() {
      if (this.timeOut) {
        clearTimeout(this.timeOut);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.options-menu-list {
  position: absolute;
  background: red;
  display: none;

  ul {
    padding: 0.5em 0;
  }
  li {
    padding: 0.5em 1em;
  }

  &--show {
    display: block;
  }
}
</style>
