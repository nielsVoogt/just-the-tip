<template>
  <Modal v-show="modalVisibile" @close="closeModal()" title="Delete tip">
    <template v-slot:body>
      <p>
        DELETE TIP!!!!!
        {{ tip }}
      </p>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/ui/Modal";

export default {
  name: "DeleteTip",
  props: ["isModalVisible", "tip"],
  computed: {
    modalVisibile() {
      return this.isModalVisible;
    },
  },
  components: {
    Modal,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>
