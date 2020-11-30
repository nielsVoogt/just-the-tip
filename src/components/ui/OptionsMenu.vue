<template>
  <div class="options-menu" @mouseleave="mouseLeave" @mouseenter="mouseEnter">
    <button @click="show = !show" type="button" class="options-menu-button">
      <MoreVerticalIcon />
    </button>
    <div
      :class="{ 'options-menu-list--show': show }"
      class="options-menu-list"
      @click="clickDetected()"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { MoreVerticalIcon } from "vue-feather-icons";
export default {
  name: "OptionsMenu",
  components: {
    MoreVerticalIcon,
  },
  data() {
    return {
      show: false,
      timeOut: false,
    };
  },
  methods: {
    clickDetected() {
      this.show = false;
    },
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
.options-menu {
  position: absolute;
  right: 0.75em;
  top: 1em;
}

.options-menu-button {
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
}
.options-menu-item {
  padding: 0.5em 0.75em;
  border-radius: 3px;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  color: #646464;
  white-space: nowrap;

  svg {
    margin-right: 0.5em;
  }

  &:hover {
    background: rgba(196, 196, 196, 0.15);
  }
}

.options-menu-list {
  position: absolute;
  background: white;
  border-radius: 5px;
  box-shadow: 0px 10px 15px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.05);
  display: none;
  right: 0;
  top: 0;
  padding: 3px;

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
