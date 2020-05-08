<template>
  <v-container class="backdrop" fluid>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title style="min-width:64px">Patient</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        label="Search"
        append-icon="mdi-magnify"
        single-line
        outlined
        dense
        hide-details
      ></v-text-field>
    </v-toolbar>

    <!-- Data Table-->
    <v-data-table
      class="mt-2"
      :headers="headers"
      :items="dataset"
      :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn outlined color="primary" height="30" @click="viewDetail(item)"
          >View Detail</v-btn
        >
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Patient",

  data: () => ({
    search: "",
    headers: [
      { text: "Patient ID", value: "patient_id" },
      { text: "Name", value: "fullname" },
      { text: "Gender", value: "gender" },
      { text: "Age", value: "age" },
      { text: "Birthday", value: "date_of_birth" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  computed: {
    ...mapGetters(["patients"]),
    dataset() {
      var dataset = this.patients;
      var now = new Date().getFullYear();
      dataset.forEach((item) => {
        var age = now - new Date(item.date_of_birth).getFullYear();

        item.fullname = item.first_name + " " + item.last_name;
        item.age = age;
        item.date_of_birth = item.date_of_birth.substr(0, 10);
      });
      return dataset;
    },
  },

  created() {
    this.getPatients();
  },

  methods: {
    ...mapActions(["getPatients"]),
    viewDetail(item) {
      console.log(item);
    },
  },
};
</script>
