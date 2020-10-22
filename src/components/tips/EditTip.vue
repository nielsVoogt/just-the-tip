<template>
  <Modal v-show="modalVisibile" @close="closeModal()" title="Edit tip">
    <template v-slot:body>
      <p>
        EDIT TIP!!!!!
        {{ tip }}
      </p>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/ui/Modal";

export default {
  name: "EditTip",
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
