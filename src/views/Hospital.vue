<template>
  <v-container class="backdrop" fluid>
    <v-toolbar flat color="white">
      <v-toolbar-title>Hospital</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="accent" dark v-on="on" @click="addItem()"
            >New Item</v-btn
          >
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container class="pa-0">
              <v-row dense>
                <v-col cols="6" sm="6">
                  <v-text-field
                    label="Hospital ID"
                    v-model="hospital.hospital_id"
                    @blur="$v.hospital.hospital_id.$touch()"
                    :error-messages="hospitalIdErrors"
                    outlined
                    single-line
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-select
                    label="Type"
                    v-model="hospital.type"
                    @blur="$v.hospital.type.$touch()"
                    :error-messages="typeErrors"
                    :items="hospitalTypes"
                    outlined
                    single-line
                    dense
                    hide-details
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-text-field
                    label="Name"
                    v-model="hospital.name"
                    @blur="$v.hospital.name.$touch()"
                    :error-messages="nameErrors"
                    outlined
                    single-line
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-text-field
                    label="Province"
                    v-model="hospital.province"
                    @blur="$v.hospital.province.$touch()"
                    :error-messages="provinceErrors"
                    outlined
                    single-line
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-text-field
                    label="City"
                    v-model="hospital.city"
                    @blur="$v.hospital.city.$touch()"
                    :error-messages="cityErrors"
                    outlined
                    single-line
                    dense
                    hide-details
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12">
                  <v-textarea
                    label="Address"
                    v-model="hospital.address"
                    @blur="$v.hospital.address.$touch()"
                    :error-messages="addressErrors"
                    auto-grow
                    outlined
                    single-line
                    rows="3"
                    hide-details
                  ></v-textarea>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-text-field
                    label="Latitude"
                    v-model.number="hospital.latitude"
                    @blur="$v.hospital.latitude.$touch()"
                    :error-messages="latitudeErrors"
                    outlined
                    single-line
                    dense
                    hide-details
                    type="number"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-text-field
                    label="Longitude"
                    v-model.number="hospital.longitude"
                    @blur="$v.hospital.longitude.$touch()"
                    :error-messages="longitudeErrors"
                    outlined
                    single-line
                    dense
                    hide-details
                    type="number"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="accent darken-3" text @click="dialog = false"
              >Cancel</v-btn
            >
            <v-btn
              color="accent darken-3"
              text
              @click="save"
              :disabled="$v.$invalid"
              >Save</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      class="mt-2"
      :headers="headers"
      :items="hospitals"
      sort-by="hospital_id"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small color="error" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Hospital",

  data: () => ({
    dialog: false,
    headers: [
      { text: "Hospital ID", value: "hospital_id" },
      { text: "Name", value: "name" },
      { text: "Type", value: "type" },
      { text: "Province", value: "province" },
      { text: "City", value: "city" },
      { text: "Address", value: "address" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    hospital: {},
    isEdit: false,
  }),

  validations: {
    hospital: {
      hospital_id: { required },
      type: { required },
      name: { required },
      province: { required },
      city: { required },
      address: { required },
      latitude: { required },
      longitude: { required },
    },
    // validationGroup: [
    //   "hospital.hospital_id",
    //   "hospital.type",
    //   "hospital.name",
    //   "hospital.province",
    //   "hospital.city",
    //   "hospital.address",
    //   "hospital.latitude",
    //   "hospital.longitude",
    // ],
  },

  computed: {
    ...mapGetters(["hospitalTypes", "hospitals"]),
    formTitle() {
      return this.isEdit === false ? "New Hospital" : "Edit Hospital";
    },
    hospitalIdErrors() {
      const errors = [];
      if (!this.$v.hospital.hospital_id.$dirty) return errors;
      !this.$v.hospital.hospital_id.required &&
        errors.push("Hospital ID is required");
      return errors;
    },
    typeErrors() {
      const errors = [];
      if (!this.$v.hospital.type.$dirty) return errors;
      !this.$v.hospital.type.required && errors.push("Type is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.hospital.name.$dirty) return errors;
      !this.$v.hospital.name.required && errors.push("Name is required");
      return errors;
    },
    provinceErrors() {
      const errors = [];
      if (!this.$v.hospital.province.$dirty) return errors;
      !this.$v.hospital.province.required &&
        errors.push("Province is required");
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.hospital.city.$dirty) return errors;
      !this.$v.hospital.city.required && errors.push("City is required");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.hospital.address.$dirty) return errors;
      !this.$v.hospital.address.required && errors.push("Address is required");
      return errors;
    },
    latitudeErrors() {
      const errors = [];
      if (!this.$v.hospital.latitude.$dirty) return errors;
      !this.$v.hospital.latitude.required &&
        errors.push("Latitude is required");
      return errors;
    },
    longitudeErrors() {
      const errors = [];
      if (!this.$v.hospital.longitude.$dirty) return errors;
      !this.$v.hospital.longitude.required &&
        errors.push("Longitude is required");
      return errors;
    },
  },

  created() {
    this.getHospitals();
  },

  methods: {
    ...mapActions([
      "getHospitals",
      "createHospital",
      "editHospital",
      "deleteHospital",
      "showDialog",
    ]),
    addItem() {
      this.isEdit = false;
      this.hospital = Object.assign({}, {});
    },
    editItem(item) {
      this.isEdit = true;
      this.hospital = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.showDialog({
        title: "Delete Item",
        text: "Confirm delete this item?",
      }).then((confirm) => {
        if (confirm) {
          this.deleteHospital(item);
        }
      });
    },

    save() {
      this.isEdit
        ? this.editHospital(this.hospital)
        : this.createHospital(this.hospital);

      this.hospital = {};
      this.dialog = false;
    },
  },
};
</script>
