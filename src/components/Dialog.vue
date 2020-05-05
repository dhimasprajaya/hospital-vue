<template>
  <v-dialog v-model="dialog.show" width="400">
    <v-card>
      <v-card-title class="headline accent white--text">
        {{ dialog.title }}
      </v-card-title>
      <p class="mt-4 text-center">
        {{ dialog.text }}
      </p>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="accent" text @click="cancel">Cancel</v-btn>
        <v-btn color="accent" text @click="confirm">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "Dialog",

  computed: {
    ...mapGetters(["dialog"]),
  },

  methods: {
    ...mapActions(["showDialog", "dismissDialog"]),
    cancel() {
      this.dialog.resolve(false);
      this.dismissDialog();
    },
    confirm() {
      this.dialog.resolve(true);
      this.dismissDialog();
    },
  },
};
</script>
