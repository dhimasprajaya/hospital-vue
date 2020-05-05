<template>
  <v-container class="backdrop" fluid>
    <v-data-table :headers="headers" :items="hospitals" sort-by="hospital_id">
      <template v-slot:top>
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
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Hospital ID"
                        v-model="hospital.hospital_id"
                        outlined
                        single-line
                        dense
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-select
                        label="Type"
                        v-model="hospital.type"
                        :items="hospitalTypes"
                        outlined
                        single-line
                        dense
                        hide-details
                      ></v-select>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-text-field
                        label="Name"
                        v-model="hospital.name"
                        outlined
                        single-line
                        dense
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Province"
                        v-model="hospital.province"
                        outlined
                        single-line
                        dense
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="City"
                        v-model="hospital.city"
                        outlined
                        single-line
                        dense
                        hide-details
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-textarea
                        label="Address"
                        v-model="hospital.address"
                        auto-grow
                        outlined
                        single-line
                        rows="3"
                        hide-details
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Latitude"
                        v-model.number="hospital.latitude"
                        outlined
                        single-line
                        dense
                        hide-details
                        type="number"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        label="Longitude"
                        v-model.number="hospital.longitude"
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
                <v-btn color="accent darken-3" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
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

  computed: {
    ...mapGetters(["hospitalTypes", "hospitals"]),
    formTitle() {
      return this.isEdit === false ? "New Hospital" : "Edit Hospital";
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
      this.hospital = {};
    },
    editItem(item) {
      this.isEdit = true;
      this.hospital = item;
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
