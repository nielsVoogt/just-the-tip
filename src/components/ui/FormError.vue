<template>
  <div class="form-error">
    <span class="form-error-message">
      {{ error }}
    </span>
    <button @click="$emit('close')" class="form-error-close">
      <XIcon size="1.5x" />
    </button>
  </div>
</template>

<script>
import { XIcon } from "vue-feather-icons";

export default {
  name: "FormError",
  components: {
    XIcon,
  },
  props: {
    error: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped lang="scss">
.form-error {
  color: red;
  padding: 1em;
  background: #ff00000f;
  border-radius: 7px;
  margin-bottom: 1em;
  display: flex;
  align-items: center;

  .form-error-message {
    padding-right: 1em;
  }

  .form-error-close {
    line-height: 1;
    display: inline-block;
    margin-left: auto;
    margin-bottom: auto;
    opacity: 0.5;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }

    svg {
      display: block;
    }
  }
}
</style>
