<template>
  <Modal v-show="modalVisibile" @close="closeModal()" title="Delete tip">
    <template v-slot:body>
      <p>
        Are you sure you want to delete <strong>{{ tipCopy.title }}</strong>
      </p>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/ui/Modal";

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
  },
  watch: {
    tip(val) {
      if (Object.keys(val).length > 0) {
        this.tipCopy = Object.assign({}, this.tip.content);
      }
    },
  },
  methods: {
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
