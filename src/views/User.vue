<template>
  <v-container class="backdrop" fluid>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>User</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
    </v-toolbar>

    <!-- Tables -->
    <v-data-table
      class="mt-2"
      :headers="headers"
      :items="dataset"
      hide-default-footer
      hide-default-header
    ></v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "User",

  data: () => ({
    headers: [
      { text: "Name", value: "name" },
      { text: "Email", value: "email" },
      { text: "Role", value: "role" },
    ],
  }),

  computed: {
    ...mapGetters(["users"]),
    dataset() {
      let users = this.users;
      let i = 0;
      users.forEach((item) => {
        i++;
        item.name = "Admin " + i;
      });
      return users;
    },
  },

  methods: {
    ...mapActions(["getUsers"]),
  },

  created() {
    this.getUsers();
  },
};
</script>
