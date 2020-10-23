<template>
  <Modal v-show="modalVisibile" @close="closeModal()" title="Delete tip">
    <template v-slot:body>
      <p>
        Are you sure you want to delete <strong>{{ tipCopy.title }}</strong>
      </p>
    </template>
    <template v-slot:footer-buttons>
      <Button type="button" @click.prevent="confirmDelete()"
        >Yes, delete this tip</Button
      >
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

export default {
  name: "DeleteTip",
  props: {
    isModalVisible: {
      type: Boolean,
      required: true,
    },
    tip: {
      type: Object,
    },
  },
  computed: {
    modalVisibile() {
      return this.isModalVisible;
    },
  },
  data() {
    return {
      tipCopy: {},
    };
  },
  components: {
    Modal,
    Button,
  },
  watch: {
    tip(val) {
      if (Object.keys(val).length > 0) {
        this.tipCopy = Object.assign({}, this.tip.content);
      }
    },
  },
  methods: {
    confirmDelete() {
      console.log("Delete this tip yo");
    },
    closeModal() {
      this.$emit("close");
      setTimeout(() => (this.tipCopy = {}), 200);
    },
  },
};
</script>

<style scoped>
strong {
  font-weight: bold;
}
</style>
