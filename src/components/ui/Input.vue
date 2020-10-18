<template>
  <label :class="['form-group', { 'form-group--error': error }]">
    <div class="form-group-label">{{ label }}</div>
    <div class="form-group-sublabel" v-if="sublabel">{{ sublabel }}</div>
    <div class="form-group-input-container">
      <input
        class="form-group-input"
        v-bind="$attrs"
        :type="inputType"
        v-on="$listeners"
        :value="value"
        @input="$emit('update', $event.target.value)"
        @change="$emit('update', $event.target.value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        spellcheck="false"
      />
      <div class="form-group-icon">
        <div class="form-group-show-password" v-if="type === 'password'">
          <eye-off-icon
            size="1.5x"
            @click="showPasswordAsPassword()"
            v-if="inputType === 'text'"
          />
          <eye-icon
            size="1.5x"
            @click="showPasswordAsText()"
            v-if="inputType === 'password'"
          />
        </div>
      </div>
    </div>
    <div class="form-group-error" v-if="error.length">{{ error }}</div>
  </label>
</template>

<script>
import { EyeIcon, EyeOffIcon } from "vue-feather-icons";

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
  name: "Input",
  inheritAttrs: false,
  components: {
    EyeIcon,
    EyeOffIcon,
  },
  props: {
    error: {
      type: [String, Boolean],
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
  data() {
    return {
      inputType: this.type,
    };
  },
  model: {
    prop: "value",
    event: "update",
  },
  methods: {
    showPasswordAsText() {
      this.inputType = "text";
    },
    showPasswordAsPassword() {
      this.inputType = "password";
    },
  },
};
</script>

<style scoped lang="scss">
.form-group {
  margin-bottom: 1em;
  display: block;

  &--error .form-group-input {
    border-color: red;
  }
}

.form-group-input {
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

.form-group-input-container {
  position: relative;
  margin-top: 0.5em;
}

.form-group-icon {
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.1s ease-out;

  svg {
    position: absolute;
    right: 0.75em;
    top: 50%;
    transform: translateY(-50%);
  }

  &:hover {
    opacity: 1;
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
}

.form-group-error {
  color: red;
  margin-top: 0.5em;
}
</style>
