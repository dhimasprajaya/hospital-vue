<template>
  <v-row class="fill-height">
    <v-col
      class="d-none d-sm-flex align-center justify-center primary"
      cols="12"
      sm="6"
    >
      <div class="text-center">
        <v-icon
          class="mdi mdi-hospital-building mb-4"
          color="white"
          alt="logo"
          style="font-size: 100px"
        ></v-icon>
        <h1 class="white--text">Hospital Apps</h1>
      </div>
    </v-col>
    <v-col class="bg1" cols="12" sm="6">
      <router-view></router-view>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
};
</script>
