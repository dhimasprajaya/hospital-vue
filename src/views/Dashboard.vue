<template>
  <div class="b-green">
    <h1>Dashboard</h1>
    <v-btn color="primary" @click="logout">Logout</v-btn>
  </div>
</template>

<script>
export default {
  name: "Dashboard",

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
