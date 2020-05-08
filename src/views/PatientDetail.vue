<template>
  <v-container class="backdrop" fluid>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Patient Detail</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
    </v-toolbar>

    <!-- Tab -->
    <v-tabs class="mt-2" v-model="tab">
      <v-tab v-for="item in items" :key="item.tab"> {{ item.tab }} </v-tab>
    </v-tabs>

    <!-- Tab Item -->
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <component :is="item.content"></component>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import Biography from "../components/Biography";
import MedicalHistory from "../components/MedicalHistory";

export default {
  name: "PatientDetail",

  components: {
    Biography,
    MedicalHistory,
  },

  data: () => ({
    tab: null,
    items: [
      { tab: "Biography", content: "Biography" },
      { tab: "Medical History", content: "MedicalHistory" },
    ],
  }),
};
</script>
