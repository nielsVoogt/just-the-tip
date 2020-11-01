<template>
  <Modal v-show="modalVisibile" @close="closeModal()" title="Edit tip" hasForm>
    <template v-slot:body>
      <fieldset>
        <Input
          type="text"
          label="Title"
          placeholder="Your tips title"
          v-model="tipCopy.title"
          :error="fieldErrors.title"
          @change="fieldErrors.title = ''"
        />
        <Input
          type="textarea"
          label="Description"
          placeholder="Your tips description"
          v-model="tipCopy.description"
          :error="fieldErrors.description"
          :maxLength="150"
        />
        <Input
          type="select"
          label="Category"
          v-model="tipCopy.category"
          :select-options="categories"
          :selected-option="tipCopy.category"
          selectMessage="Please select a category"
          :error="fieldErrors.category"
          @change="fieldErrors.category = ''"
        />
        <Input
          type="url"
          label="Url"
          placeholder="http://www.your-tip-url.com"
          v-model="tipCopy.url"
          :error="fieldErrors.url"
          @change="fieldErrors.url = ''"
          @blur="validateUrl()"
          optional
        />
      </fieldset>
    </template>
    <template v-slot:footer-buttons>
      <Button type="button" @click.prevent="validate()"> Update tip</Button>
    </template>
  </Modal>
</template>

<script>
import { categories } from "@/categories";
import { required, maxLength, url } from "vuelidate/lib/validators";
import editTip from "@/utils/editTip";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default {
  name: "EditTip",
  components: {
    Modal,
    Input,
    Button,
  },
  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
    },
    tip: {
      type: Object,
    },
  },
  validations: {
    tipCopy: {
      title: {
        required,
      },
      description: {
        required,
        maxLength: maxLength(150),
      },
      url: {
        url,
      },
    },
  },
  computed: {
    modalVisibile() {
      return this.isModalVisible;
    },
  },
  data() {
    return {
      categories,
      tipCopy: {},
      fieldErrors: {
        title: "",
        description: "",
        url: "",
        category: "",
      },
    };
  },
  watch: {
    "tipCopy.description": function(val) {
      this.fieldErrors.description = !this.$v.tipCopy.description.maxLength;
    },
    tip(val) {
      console.log("I fired?");
      if (Object.keys(val).length > 0) {
        this.tipCopy = Object.assign({}, this.tip.content);
      }
    },
  },
  methods: {
    validate() {
      console.log(this.tipCopy.url);
      // return;

      const newTip = {
        title: this.tipCopy.title,
        category: this.tipCopy.category,
        description: this.tipCopy.description,
        // url: this.tipCopy.url,
      };

      // TODO: Validation on fields
      editTip(newTip, this.tip.id);
    },
    validateUrl() {
      if (!this.$v.url.url) {
        this.fieldErrors.url = "Please enter a valid url";
      }
    },
    closeModal() {
      this.$emit("close");
      setTimeout(() => (this.tipCopy = {}), 200);
    },
  },
};
</script>
