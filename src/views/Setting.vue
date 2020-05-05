<template>
  <v-container class="backdrop" fluid>
    <h2>Setting</h2>
    <br />
    <v-btn primary color="accent" @click="test">Test</v-btn>
    <p class="mt-4">Value : {{ dialog }}</p>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Setting",

  computed: {
    ...mapGetters(["dialog"]),
  },

  methods: {
    ...mapActions(["showDialog"]),
    test() {
      this.showDialog({ title: "Test Nih", text: "Test Nih" }).then(
        (resolve) => {
          if (resolve) {
            console.log("resolve", resolve);
          } else {
            console.log("resolve", resolve);
          }
        }
      );
    },
  },
};
</script>
