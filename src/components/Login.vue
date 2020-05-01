<template>
  <div class="d-flex align-center fill-height">
    <v-card class="mx-auto" width="400" outlined>
      <v-card-title>Login</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          single-line
          dense
          clearable
        />

        <v-text-field
          v-model="password"
          label="Password"
          outlined
          single-line
          dense
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />

        <v-btn primary block color="accent" @click="login">Login</v-btn>

        <div class="d-flex flex-row-reverse">
          <a class="mt-2 py-2 accent--text" @click="forgot">
            <strong>
              Forgot Password
            </strong>
          </a>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    email: "",
    password: "",
    show: false,
  }),

  methods: {
    ...mapActions(["login"]),
    forgot() {
      this.$router.push("/forgot");
    },
  },
};
</script>
