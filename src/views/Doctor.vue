<template>
  <v-container class="backdrop" fluid>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Doctor</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="accent" dark @click="addItem">Add New</v-btn>
    </v-toolbar>

    <!-- Card -->
    <v-row dense class="mt-1">
      <v-col v-for="doctor in doctors" :key="doctor.id" cols="12" sm="6" md="4">
        <v-card @click="editItem(doctor)">
          <v-row no-gutters>
            <v-col cols="4">
              <v-img class="ma-1" height="100" contain :src="doctor.image_url">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-icon
                      class="mdi mdi-account-box grey--text"
                      style="font-size:70px"
                    ></v-icon>
                  </v-row>
                </template>
              </v-img>
              <p
                class="ma-1 text-center primary white--text"
                style="font-size:12px"
              >
                {{ doctor.doctor_id }}
              </p>
            </v-col>
            <v-col class="pl-2" cols="8">
              <h4 class="pa-0 ma-0">
                {{ doctor.first_name + " " + doctor.last_name }}
              </h4>
              <p class="primary--text ma-0" style="font-size:14px">
                <strong>
                  {{ doctor.specialist }}
                </strong>
              </p>
              <hr class="mr-2" />
              <p class="ma-0" style="font-size:14px">
                <i class="mdi mdi-phone mr-2 primary--text"></i>
                {{ doctor.phone }}
              </p>
              <br />
              <p class="ma-0" style="font-size:12px">
                License Number :
              </p>
              <p class="ma-0" style="font-size:14px">
                {{ doctor.license_number }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col
        v-if="emptyData"
        cols="12"
        class="d-flex flex-column align-center justify-center"
        style="height:400px"
      >
        <v-icon class="mdi mdi-file-find" style="font-size:90px"></v-icon>
        <p>No data available</p>
      </v-col>
    </v-row>

    <!-- Right Navigation Drawer -->
    <v-navigation-drawer v-model="drawerRight" clipped right app width="380">
      <v-container>
        <v-toolbar flat>
          <v-toolbar-title class="ml-n4">{{ formTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-row dense>
          <v-col cols="12" class="d-flex justify-center mb-4">
            <croppa
              v-model="imageCroppa"
              :width="180"
              :height="180"
              :quality="2"
              placeholder="Upload Image"
              :placeholder-font-size="14"
              :initial-image="initialImage"
              :prevent-white-space="true"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Firstname"
              v-model="doctor.first_name"
              @blur="$v.doctor.first_name.$touch()"
              :error-messages="firstNameErrors"
              outlined
              single-line
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Lastname"
              v-model="doctor.last_name"
              @blur="$v.doctor.last_name.$touch()"
              :error-messages="lastNameErrors"
              outlined
              single-line
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Phone Number"
              v-model="doctor.phone"
              @blur="$v.doctor.phone.$touch()"
              :error-messages="phoneErrors"
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="Doctor ID"
              v-model="doctor.doctor_id"
              @blur="$v.doctor.doctor_id.$touch()"
              :error-messages="doctorIdErrors"
              outlined
              single-line
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="License Number"
              v-model="doctor.license_number"
              @blur="$v.doctor.license_number.$touch()"
              :error-messages="licenseNumberErrors"
              outlined
              single-line
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Specialization"
              v-model="doctor.specialist"
              @blur="$v.doctor.specialist.$touch()"
              :error-messages="specialistErrors"
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:append>
        <div class="d-flex pa-2">
          <v-btn v-if="isEdit" color="error" @click="deleteItem()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" outlined color="accent" @click="cancel">
            Cancel
          </v-btn>
          <v-btn
            primary
            color="accent"
            @click="save"
            width="100"
            :disabled="$v.$invalid"
          >
            Save
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Doctor",

  data: () => ({
    drawerRight: false,
    isEdit: false,
    doctor: {},
    imageCroppa: {},
    initialImage: null,
  }),

  validations: {
    doctor: {
      first_name: { required },
      last_name: { required },
      phone: { required },
      doctor_id: { required },
      license_number: { required },
      specialist: { required },
    },
  },

  computed: {
    ...mapGetters(["doctors"]),
    emptyData() {
      return this.doctors.length > 0 ? false : true;
    },
    formTitle() {
      return this.isEdit === false ? "New Doctor" : "Edit Doctor";
    },
    firstNameErrors() {
      const errors = [];
      if (!this.$v.doctor.first_name.$dirty) return errors;
      !this.$v.doctor.first_name.required &&
        errors.push("Firstname is required");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.doctor.last_name.$dirty) return errors;
      !this.$v.doctor.last_name.required && errors.push("Lastname is required");
      return errors;
    },
    phoneErrors() {
      const errors = [];
      if (!this.$v.doctor.phone.$dirty) return errors;
      !this.$v.doctor.phone.required && errors.push("Phone is required");
      return errors;
    },
    doctorIdErrors() {
      const errors = [];
      if (!this.$v.doctor.doctor_id.$dirty) return errors;
      !this.$v.doctor.doctor_id.required &&
        errors.push("Doctor ID is required");
      return errors;
    },
    licenseNumberErrors() {
      const errors = [];
      if (!this.$v.doctor.license_number.$dirty) return errors;
      !this.$v.doctor.license_number.required &&
        errors.push("License number is required");
      return errors;
    },
    specialistErrors() {
      const errors = [];
      if (!this.$v.doctor.specialist.$dirty) return errors;
      !this.$v.doctor.specialist.required &&
        errors.push("Specialization is required");
      return errors;
    },
  },

  created() {
    this.getDoctors();
  },

  methods: {
    ...mapActions([
      "getDoctors",
      "createDoctor",
      "editDoctor",
      "deleteDoctor",
      "showDialog",
      "uploadImage",
    ]),
    addItem() {
      this.drawerRight = true;
      this.isEdit = false;

      this.$v.$reset();
      this.doctor = {};
      this.refreshimage({});
    },
    editItem(doctor) {
      this.drawerRight = true;
      this.isEdit = true;
      this.doctor = Object.assign({}, doctor);
      this.refreshimage(doctor);
    },
    cancel() {
      this.drawerRight = false;
      this.isEdit = false;
      this.doctor = {};
    },
    deleteItem() {
      this.showDialog({
        title: "Delete Doctor",
        text: "Confirm delete this data?",
      }).then((confirm) => {
        if (confirm) {
          this.deleteDoctor(this.doctor);
          this.drawerRight = false;
          this.isEdit = false;
        }
      });
    },
    prepareImagePayload() {
      return new Promise((resolve) => {
        this.imageCroppa.generateBlob(
          (blob) => {
            // Set image payload
            let payload = {
              folder: "img/doctor",
              filename:
                this.doctor.first_name +
                "_" +
                this.doctor.last_name +
                "_" +
                this.doctor.doctor_id,
              file: blob,
            };
            resolve(payload);
          },
          "image/jpeg",
          0.8 // 80% compressed jpeg file
        );
      });
    },
    async save() {
      try {
        // Prepare image payload
        const payload = await this.prepareImagePayload();
        var imageUrl = await this.uploadImage(payload);
        this.doctor.image_url = imageUrl;
      } catch (error) {
        console.log("err vue-croppa", error);
      }

      this.isEdit
        ? this.editDoctor(this.doctor)
        : this.createDoctor(this.doctor);

      this.doctor = {};
      this.drawerRight = false;
      this.isEdit = false;
    },
    refreshimage() {
      var image = new Image();
      // image.setAttribute("crossorigin", "anonymous");
      image.src = this.doctor.image_url;

      this.initialImage = image;
      this.imageCroppa.refresh();
    },
  },
};
</script>
