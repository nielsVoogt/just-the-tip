<template>
  <Modal v-show="modalVisibile" @close="closeModal()" title="Edit tip" hasForm>
    <template v-slot:body>
      <fieldset>
        {{ tipCopy }}
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
import { mapActions } from "vuex";

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
    ...mapActions(["editLocalTipAction"]),

    validate() {
      if (this.selectedCategory === "") {
        this.fieldErrors.category = "You haven't selected a category";
      }
      if (this.$v.tipCopy.invalid) {
        if (!this.$v.tipCopy.title.required)
          this.fieldErrors.title = "Title can't be empty";
        if (!this.$v.tipCopy.description.required)
          this.fieldErrors.description = "Description can't be empty";
      } else {
        this.saveEdit();
      }
    },

    saveEdit() {
      const newTip = {
        title: this.tipCopy.title,
        category: this.tipCopy.category,
        description: this.tipCopy.description,
        url: this.tipCopy.url,
      };

      editTip(newTip, this.tip.id)
        .then(() => {
          console.log("NewTip:", newTip);
          this.editLocalTipAction({ id: this.tip.id, content: newTip });
          this.$notificationHub.$emit("success", "Tip edited!");
          this.closeModal();
        })
        .catch((error) => console.error(error));
    },

    validateUrl() {
      if (!this.$v.tipCopy.url) {
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
