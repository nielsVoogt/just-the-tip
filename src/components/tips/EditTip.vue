<template>
  <Modal v-show="modalVisibile" @close="closeModal()" title="Edit tip">
    <template v-slot:body>
      <p>
        EDIT TIP!!!!!
      </p>
      <Input
        type="text"
        label="Title"
        placeholder="Your tips title"
        v-model="tipCopy.title"
        :error="fieldErrors.title"
        @change="fieldErrors.title = ''"
      />
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";

export default {
  name: "EditTip",
  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
    },
    tip: {
      type: Object,
    },
  },
  components: {
    Modal,
    Input,
  },
  computed: {
    modalVisibile() {
      return this.isModalVisible;
    },
  },
  data() {
    return {
      tipCopy: {},
      fieldErrors: {
        title: "",
      },
    };
  },
  watch: {
    tip() {
      this.tipCopy = Object.assign({}, this.tip.content);
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
