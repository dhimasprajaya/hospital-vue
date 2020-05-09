<template>
  <v-container class="pa-0">
    <v-row no-gutters>
      <v-col class="pa-4 mb-2" cols="12" sm="6">
        <div class="d-flex">
          <p style="width:100px"><strong>Patient ID</strong></p>
          <p>{{ patient.patient_id }}</p>
        </div>
        <div class="d-flex">
          <p style="width:100px"><strong>Firstname</strong></p>
          <p>{{ patient.first_name }}</p>
        </div>
        <div class="d-flex">
          <p style="width:100px"><strong>Lastname</strong></p>
          <p>{{ patient.last_name }}</p>
        </div>
        <div class="d-flex">
          <p style="width:100px"><strong>Gender</strong></p>
          <p>{{ patient.gender }}</p>
        </div>
        <div class="d-flex">
          <p style="width:100px"><strong>Birthday</strong></p>
          <p>{{ patient.birthday }}</p>
        </div>
        <div class="d-flex">
          <p style="width:100px"><strong>Age</strong></p>
          <p>{{ patient.age }}</p>
        </div>
        <div class="d-flex">
          <p style="width:100px"><strong>Phone</strong></p>
          <p>{{ patient.phone }}</p>
        </div>
        <div class="d-flex">
          <p style="width:100px"><strong>Address</strong></p>
          <p>{{ patient.address }}</p>
        </div>
      </v-col>
      <v-col class="d-flex flex-column" style="height:100%" cols="12" sm="6">
        <v-img class="ma-4" :src="patient.image_url" max-height="300">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-icon
                class="mdi mdi-account-circle white--text"
                style="font-size:170px"
              ></v-icon>
            </v-row>
          </template>
        </v-img>
        <v-row no-gutters class="px-2">
          <v-col class="pb-4 px-2" cols="12" sm="6">
            <v-btn color="primary" block>
              <v-icon class="mdi mdi-email mr-4"></v-icon>
              Email
            </v-btn>
          </v-col>
          <v-col class="pb-4 px-2" cols="12" sm="6">
            <v-btn color="success white--text" block>
              <v-icon class="mdi mdi-whatsapp mr-4"></v-icon>
              WhatsApp
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Biography",

  computed: {
    ...mapGetters(["selectedPatient"]),
    patient() {
      let patient = this.selectedPatient;
      let now = new Date().getFullYear();
      let formatDate = patient.date_of_birth.substr(0, 10);
      patient.age = now - new Date(patient.date_of_birth).getFullYear();
      patient.birthday = formatDate;
      return patient;
    },
  },
};
</script>

<style scoped>
p {
  color: var(--v-grey-darken3);
}
</style>
