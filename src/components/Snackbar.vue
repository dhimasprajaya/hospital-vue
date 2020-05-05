<template>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    left
  >
    {{ snackbar.message }}
    <v-btn dark text @click="snackbar.show = false">
      Close
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Snackbar",

  computed: {
    ...mapGetters(["snackbar"]),
  },
};
</script>
