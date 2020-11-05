<template>
  <div class="notification-container">
    <div
      v-for="(notification, i) in notifications"
      :key="i"
      :class="['notification', `notification--${notification.type}`]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Notifications",
  data() {
    return {
      notifications: [],
    };
  },
  watch: {
    notifications() {
      setTimeout(() => this.notifications.shift(), 5000);
    },
  },
  created() {
    this.$notificationHub.$on("success", (message) => {
      this.notifications.push({ message: message, type: "success" });
    });
    this.$notificationHub.$on("error", (message) => {
      this.notifications.push({ message: message, type: "error" });
    });
  },
};
</script>

<style>
.notification-container {
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  right: 1em;
  bottom: 1em;
}
</style>
