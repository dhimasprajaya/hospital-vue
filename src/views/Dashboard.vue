<template>
  <v-container class="backdrop" fluid>
    <v-row no-gutters>
      <v-col v-for="item in items" :key="item.label" cols="12" sm="4">
        <v-card outlined tile>
          <v-card-title>Total {{ item.label }} : {{ item.total }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="8">
        <v-card id="map" height="460px"></v-card>
      </v-col>
      <v-col cols="12" sm="4" g="4">
        <v-card>
          <v-card-subtitle>
            <b>
              Legend
            </b>
          </v-card-subtitle>
          <v-card-actions>
            <v-btn primary color="primary" @click="logout">logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",

  data: () => ({
    items: [
      { label: "Hospital", total: 1000 },
      { label: "Doctor", total: 1000 },
      { label: "Patient", total: 1000 },
    ],
  }),

  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    initMap() {
      // JSON Data
      let mapData = {
        latLong: [-6.18, 106.82],
        zoom: 14,
        hospitals: [
          {
            type: "RSIA",
            name: "Rumah Sakit Anak dan Bunda Harapan Kita",
            latLong: [-6.184941521994001, 106.80025752465502],
          },
          {
            type: "RSU",
            name: "Rumah Sakit Pusat Angkatan Darat Gatot Soebroto",
            latLong: [-6.17594832268097, 106.83782392802841],
          },
        ],
      };

      // Setup Layer
      var hospitals = L.layerGroup();
      mapData.hospitals.forEach((obj) => {
        L.marker(obj.latLong)
          .bindPopup("<b>" + obj.type + "</b><br>" + obj.name)
          .addTo(hospitals);
      });

      var mbAttr =
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl =
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

      var grayscale = L.tileLayer(mbUrl, {
          id: "mapbox/light-v9",
          tileSize: 512,
          zoomOffset: -1,
          attribution: mbAttr,
        }),
        streets = L.tileLayer(mbUrl, {
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          attribution: mbAttr,
        });

      // Setup Map
      var map = L.map("map", {
        center: mapData.latLong,
        zoom: mapData.zoom,
        layers: [grayscale, hospitals],
      });

      var baseLayers = {
        Grayscale: grayscale,
        Streets: streets,
      };

      var overlays = {
        Hospital: hospitals,
      };

      L.control.layers(baseLayers, overlays).addTo(map);
    },
  },

  mounted() {
    this.initMap();
  },
};
</script>
