<template>
  <v-container fluid class="backdrop">
    <v-row>
      <v-col v-for="item in items" :key="item.label" cols="12" sm="4">
        <v-card outlined tile>
          <v-card-title>Total {{ item.label }} : {{ item.total }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-btn color="primary" @click="logout">Logout</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",

  data: () => ({
    items: [
      { label: "Hospital", total: 1000 },
      { label: "Doctor", total: 1000 },
      { label: "Patient", total: 1000 },
    ],
  }),

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>
