<template>
  <Modal v-show="modalVisibile" @close="closeModal()" title="Delete tip">
    <template v-slot:body>
      <p>
        Are you sure you want to delete
        <strong>{{ title }}</strong>
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
import deleteTip from "@/utils/deleteTip";
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
      title: false,
      id: false,
    };
  },
  components: {
    Modal,
    Button,
  },
  watch: {
    tip(val) {
      if (Object.keys(val).length > 0) {
        this.title = this.tip.content.title;
        this.id = this.tip.id;
      }
    },
  },
  methods: {
    confirmDelete() {
      deleteTip(this.id)
        .then(() => {
          this.$store.dispatch("deleteLocalTipAction", this.id);
          this.$notificationHub.$emit("success", "Deleted tip!");
          this.closeModal();
        })
        .catch((error) => {
          console.log(error);
          this.$notificationHub.$emit("error", "Something went wrong");
          this.closeModal();
        });
    },
    closeModal() {
      this.$emit("close");
      setTimeout(() => {
        (this.title = false), (this.id = false);
      }, 200);
    },
  },
};
</script>

<style scoped>
strong {
  font-weight: bold;
}
</style>
