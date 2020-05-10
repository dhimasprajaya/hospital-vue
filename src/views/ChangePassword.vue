<template>
  <v-container class="backdrop" fluid>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Setting</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
    </v-toolbar>

    <v-card class="mt-2" width="400" outlined>
      <v-card-title>Change Password</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="currentPassword"
          @blur="$v.currentPassword.$touch()"
          :error-messages="currentPasswordErrors"
          label="Current Password"
          outlined
          single-line
          dense
          :append-icon="showCurrent ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showCurrent ? 'text' : 'password'"
          @click:append="showCurrent = !showCurrent"
        />
        <v-text-field
          v-model="newPassword"
          @blur="$v.newPassword.$touch()"
          :error-messages="newPasswordErrors"
          label="New Password"
          outlined
          single-line
          dense
          :append-icon="showNew ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showNew ? 'text' : 'password'"
          @click:append="showNew = !showNew"
        />
        <v-text-field
          v-model="confirmPassword"
          @blur="$v.confirmPassword.$touch()"
          :error-messages="confirmPasswordErrors"
          label="Confirm Password"
          outlined
          single-line
          dense
          :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showConfirm ? 'text' : 'password'"
          @click:append="showConfirm = !showConfirm"
        />

        <v-btn
          primary
          block
          color="accent"
          @click="change"
          :disabled="$v.$invalid"
          >Change Password</v-btn
        >
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "ChangePassword",

  data: () => ({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  }),

  validations: {
    currentPassword: {
      required,
      minLength: minLength(8),
    },
    newPassword: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      sameAs: sameAs("newPassword"),
    },
  },

  computed: {
    ...mapGetters(["dialog"]),
    currentPasswordErrors() {
      const errors = [];
      if (!this.$v.currentPassword.$dirty) return errors;
      !this.$v.currentPassword.minLength &&
        errors.push("Must be at least 8 char");
      !this.$v.currentPassword.required &&
        errors.push("Current Password is required");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.minLength && errors.push("Must be at least 8 char");
      !this.$v.newPassword.required && errors.push("New Password is required");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.sameAs && errors.push("Password not match");
      return errors;
    },
  },

  methods: {
    ...mapActions(["showDialog"]),
    change() {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },
  },
};
</script>
