<template>
  <div class="d-flex align-center fill-height">
    <v-card class="mx-auto" width="400" outlined>
      <v-card-title>Forgot Password</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="email"
          @blur="$v.email.$touch()"
          :error-messages="emailErrors"
          label="Email"
          outlined
          single-line
          dense
          clearable
        />

        <v-btn
          primary
          block
          color="accent"
          @click="reset"
          :disabled="$v.$invalid"
          >Reset</v-btn
        >

        <div class="d-flex">
          <router-link
            tag="a"
            class="mt-2 py-2 accent--text"
            style="text-decoration: none"
            to="/login"
          >
            <strong>Back to Login</strong>
          </router-link>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import axios from "axios";

export default {
  data: () => ({
    email: "",
  }),

  validations: {
    email: {
      required,
      email,
      available: (val) => {
        if (val === "") return true;
        return axios.get("user/test").then((res) => {
          console.log(res);
          return true;
        });
      },
    },
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      !this.$v.email.available && errors.push("E-mail is not available");
      return errors;
    },
  },

  methods: {
    reset() {
      this.$router.push("/login");
    },
  },
};
</script>
