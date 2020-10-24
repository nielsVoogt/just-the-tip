<template>
  <label :class="['form-group', { 'form-group--error': error }]">
    <div class="form-group-label">
      {{ label }}
      <span class="form-group-label-optional" v-if="optional">(Optional)</span>
      <small
        v-if="maxLength"
        :class="[
          'form-group-label-charcount',
          {
            'form-group-label-charcount--charcount-reached':
              value.length > maxLength,
          },
        ]"
        >Max. {{ maxLength }} characters</small
      >
    </div>
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
        v-if="type !== 'textarea' && type !== 'select'"
      />
      <textarea
        v-if="type === 'textarea'"
        v-bind="$attrs"
        v-on="$listeners"
        @input="$emit('update', $event.target.value)"
        @change="$emit('update', $event.target.value)"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
        class="form-group-textarea"
        rows="4"
        :value="value"
        spellcheck="false"
      />

      <select
        @change="$emit('update', $event.target.value)"
        v-if="type === 'select'"
        class="form-group-select"
        @blur="$emit('blur')"
        @focus="$emit('focus')"
      >
        <option value="">{{ selectMessage }}</option>
        <option
          v-for="(option, index) in selectOptions"
          :key="index"
          :selected="selectedOption === option"
        >
          {{ option }}
        </option>
      </select>

      <div class="form-group-icon" v-if="type === 'search'">
        <SearchIcon size="1.35x" />
      </div>
      <div class="form-group-show-password" v-if="type === 'password'">
        <span @click="showPasswordAsPassword()" v-if="inputType === 'text'"
          >Hide</span
        >
        <span @click="showPasswordAsText()" v-if="inputType === 'password'"
          >Show</span
        >
      </div>
    </div>
    <div class="form-group-error" v-if="error.length">{{ error }}</div>
  </label>
</template>

<script>
import { SearchIcon } from "vue-feather-icons";

const TYPES = [
  "text",
  "password",
  "email",
  "number",
  "url",
  "tel",
  "search",
  "color",
  "textarea",
  "select",
];

export default {
  name: "Input",
  inheritAttrs: false,
  components: {
    SearchIcon,
  },
  props: {
    error: {
      type: [String, Boolean],
      required: false,
    },
    label: {
      type: String,
      default: "",
      required: false,
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
    maxLength: {
      type: Number,
      required: false,
    },
    optional: {
      type: Boolean,
      required: false,
    },
    selectOptions: {
      type: Array,
      required: false,
    },
    selectMessage: {
      type: String,
      required: false,
    },
    selectedOption: {
      type: String,
      required: false,
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
  display: block;

  &--error {
    .form-group-input,
    .form-group-textarea,
    .form-group-select {
      border-color: red;

      &:focus {
        border-color: red;
      }
    }
  }
}

fieldset > * + * {
  margin-top: 1em;
}

.form-group-label {
  display: flex;
  align-items: baseline;

  .form-group-label-optional {
    font-weight: normal;
    font-style: italic;
    opacity: 0.8;
    margin-left: 0.25rem;
  }

  .form-group-label-charcount {
    font-size: 0.875rem;
    margin-left: auto;
    opacity: 0.65;
    /* TODO - define colors */

    &--charcount-reached {
      color: red;
    }
  }
}

.form-group-input,
.form-group-textarea,
.form-group-select {
  width: 100%;
  border: 1px solid #cdcdcd;
  border-radius: 5px;
  font-family: inherit;
  color: #393939;
  font-size: inherit;
  padding-left: 1rem;
  padding-right: 1rem;
  background-color: #fbfbfb;

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

.form-group-select {
  height: 50px;
  appearance: none;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")
      no-repeat;
  background-position: right 0.75rem top 12px;
}

.form-group-input {
  height: 50px;

  &[type="search"] {
    padding-left: 2.75rem;
    transition: all 0.1s ease-out;

    &::-webkit-search-cancel-button {
      -webkit-appearance: none;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-x'%3E%3Cline x1='18' y1='6' x2='6' y2='18'/%3E%3Cline x1='6' y1='6' x2='18' y2='18'/%3E%3C/svg%3E")
        no-repeat center center/cover;
      cursor: pointer;
      height: 20px;
      position: relative;
      right: 0;
      margin-right: 0;
      width: 20px;
      opacity: 0.7;

      &:hover {
        opacity: 1;
      }
    }

    &:focus {
      padding-left: 1rem;

      + .form-group-icon {
        opacity: 0;
        transform: translateX(-20%) translateY(-50%);
        z-index: 2;
      }
    }
  }
}

.form-group-textarea {
  padding-top: 1rem;
  padding-bottom: 1rem;
  resize: none;
}

.form-group-input-container {
  position: relative;
  margin-top: 0.5em;
}

.form-group-show-password {
  position: absolute;
  right: 1rem;
  top: 0;
  line-height: 50px;
  opacity: 0.75;
  cursor: pointer;
  transition: opacity 0.1s ease-out;

  &:hover {
    opacity: 1;
  }
}

.form-group-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0.75rem;
  transition: all 0.1s ease-out;
  opacity: 1;

  svg {
    display: block;
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
