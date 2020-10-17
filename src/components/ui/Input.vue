<template>
  <label :class="['form-group', { 'form-group--error': error }]">
    <div class="form-group-label">{{ label }}</div>
    <div class="form-group-sublabel" v-if="sublabel">{{ sublabel }}</div>
    <input
      class="form-group-input"
      v-bind="$attrs"
      :type="type"
      v-on="$listeners"
      :value="value"
      @input="$emit('update', $event.target.value)"
      @change="$emit('update', $event.target.value)"
      @blur="$emit('blur')"
      @focus="$emit('focus')"
    />
    <div class="form-group-error" v-if="error">{{ error }}</div>
  </label>
</template>

<script>
const TYPES = [
  "text",
  "password",
  "email",
  "number",
  "url",
  "tel",
  "search",
  "color",
];

export default {
  inheritAttrs: false,
  props: {
    error: {
      type: Array,
      required: false,
    },
    label: {
      type: String,
      default: "",
      required: true,
    },
    sublabel: {
      type: String,
      default: "",
      required: false,
    },
    value: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
      validator(value) {
        const isValid = TYPES.includes(value);
        if (!isValid) {
          console.warn(`allowed types are ${TYPES}`);
        }
        return isValid;
      },
    },
  },
  model: {
    prop: "value",
    event: "update",
  },
};
</script>

<style scoped lang="scss">
.form-group {
  margin-bottom: 1em;
  display: block;

  &--error {
    .form-group-input {
      border-color: red;
    }
  }
}

.form-group-input {
  margin-top: 0.5em;
  width: 100%;
  height: 50px;
  border: 1px solid #cdcdcd;
  border-radius: 5px;
  font-family: inherit;
  color: #393939;
  font-size: inherit;
  padding-left: 1rem;
  padding-right: 1rem;
  background: #fbfbfb;

  &::-webkit-input-placeholder {
    color: #949494;
  }
  &::-moz-placeholder {
    color: #949494;
  }
  &:-moz-placeholder {
    color: #949494;
  }

  &:focus {
    outline: 0;
    border-color: orange;
  }
}

.form-group-label {
  color: #393939;
  font-weight: 500;
}

.form-group-sublabel,
.form-group-error {
  color: #949494;
  font-size: 0.875rem;
  margin-top: 0.25em;
}

.form-group-error {
  color: red;
}
</style>
