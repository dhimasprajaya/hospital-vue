<template>
  <div class="d-flex align-center fill-height">
    <v-card class="mx-auto" width="400" outlined>
      <v-card-title>Forgot Password</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="email"
          label="Email"
          outlined
          single-line
          dense
          clearable
        />

        <v-btn primary block color="accent" @click="reset">Reset</v-btn>

        <div class="d-flex">
          <a class="mt-2 py-2 accent--text" @click="back">
            <strong>
              Back to Login
            </strong>
          </a>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
  }),
  methods: {
    reset() {
      this.$router.push("/login");
    },
    back() {
      this.$router.push("/login");
    },
  },
};
</script>
