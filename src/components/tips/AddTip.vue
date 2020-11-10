<template>
  <Modal
    v-show="modalVisibile"
    @close="closeModal()"
    title="Add new tip"
    hasForm
  >
    <template v-slot:body>
      <fieldset>
        <Input
          type="text"
          label="Title"
          placeholder="Your tips title"
          v-model="title"
          :error="fieldErrors.title"
          @change="fieldErrors.title = ''"
        />
        <Input
          type="textarea"
          label="Description"
          placeholder="Your tips description"
          v-model="description"
          :error="fieldErrors.description"
          @change="fieldErrors.description = ''"
          :maxLength="150"
        />
        <Input
          type="select"
          label="Category"
          v-model="selectedCategory"
          :select-options="categories"
          selectMessage="Please select a category"
          :error="fieldErrors.category"
          @change="fieldErrors.category = ''"
        />
        <Input
          type="url"
          label="Url"
          placeholder="http://www.your-tip-url.com"
          v-model="url"
          :error="fieldErrors.url"
          @change="fieldErrors.url = ''"
          optional
          @blur="validateUrl()"
        />
      </fieldset>
    </template>
    <template v-slot:footer-buttons>
      <Button type="button" @click.prevent="validate()">Add tip</Button>
    </template>
  </Modal>
</template>

<script>
import { db, fb } from "@/firebaseConfig.js";
import { categories } from "@/categories";
import { required, maxLength, url } from "vuelidate/lib/validators";
import addTip from "../../utils/addTip.js";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { mapGetters } from "vuex";

export default {
  name: "AddTip",
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
  computed: {
    modalVisibile() {
      return this.isModalVisible;
    },
  },
  data() {
    return {
      categories,
      selectedCategory: "",
      title: "",
      description: "",
      url: "",
      fieldErrors: {
        title: "",
        description: "",
        url: "",
        category: "",
      },
    };
  },
  watch: {
    selectedCategory(val) {
      if (val !== "") this.fieldErrors.category = "";
    },
  },
  methods: {
    validateUrl() {
      if (!this.$v.url.url) {
        this.fieldErrors.url = "Please enter a valid url";
      }
    },
    validate() {
      if (this.selectedCategory === "") {
        this.fieldErrors.category = "You haven't selected a category";
      }
      if (this.$v.$invalid) {
        if (!this.$v.title.$required)
          this.fieldErrors.title = "Title can't be empty";
        if (!this.$v.description.$required)
          this.fieldErrors.description = "Description can't be empty";
      } else {
        this.addNewTip();
      }
    },
    addNewTip() {
      const tip = {
        title: this.title,
        description: this.description,
        url: this.url,
        category: this.selectedCategory,
        likes: [],
      };

      addTip(tip)
        .then((tipId) => {
          // Add the tip to vuex store
          this.$store.dispatch("addNewLocalTipAction", {
            id: tipId,
            content: tip,
          });

          this.$notificationHub.$emit("success", "Added new tip");

          // UI reset
          this.closeModal();
          this.resetForm();
        })
        .catch((error) => console.error(error));
    },

    closeModal() {
      this.$emit("close");
    },

    resetForm() {
      // Clear all form values
      this.selectedCategory = "";
      this.title = "";
      this.description = "";
      this.url = "";

      // Clear all possible form errors
      this.fieldErrors.title = "";
      this.fieldErrors.description = "";
      this.fieldErrors.url = "";
      this.fieldErrors.category = "";
    },
  },
};
</script>
