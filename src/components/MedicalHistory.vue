<template>
  <v-container class="pa-0">
    <v-row no-gutters class="pb-4">
      <v-col cols="12" sm="6">
        <v-list>
          <v-list-item-group v-model="item" color="primary">
            <v-list-item
              v-for="(item, i) in medical_history"
              :key="i"
              @click="updateMap(item)"
            >
              <v-list-item-content>
                <v-list-item-title> {{ item.hospital.name }}</v-list-item-title>
                <v-list-item-subtitle>
                  Visited at : {{ item.timestamp }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col class="px-4" cols="12" sm="6">
        <v-card flat id="map" height="400px" style="z-index:0"></v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "MedicalHistory",

  data: () => ({
    item: 0,
    maps: null,
    medical_history: [
      {
        timestamp: "2020-03-13 10:58:32",
        hospital: {
          id: 1,
          type: "RSIA",
          name: "Rumah Sakit Anak dan Bunda Harapan Kita",
          latitude: -6.184941521994001,
          longitude: 106.80025752465502,
        },
        doctor: {
          first_name: "John",
          last_name: "Doe",
          specialist: "Dokter Umum",
        },
      },
      {
        timestamp: "2020-02-25 12:00:00",
        hospital: {
          id: "2",
          type: "RSU",
          name: "Rumah Sakit Pusat Angkatan Darat Gatot Soebroto",
          latitude: -6.17594832268097,
          longitude: 106.83782392802841,
        },
        doctor: {
          first_name: "Angela",
          last_name: "Lim",
          specialist: "Dokter Kandungan",
        },
      },
      {
        timestamp: "2020-01-10 12:00:32",
        hospital: {
          id: 1,
          type: "RSIA",
          name: "Rumah Sakit Anak dan Bunda Harapan Kita",
          latitude: -6.184941521994001,
          longitude: 106.80025752465502,
        },
        doctor: {
          first_name: "John",
          last_name: "Doe",
          specialist: "Kandungan",
        },
      },
    ],
  }),

  methods: {
    initMap() {
      // Setup Layer
      let hospitals = L.layerGroup();

      // Set hospital arrays
      let arrays = [];
      this.medical_history.forEach((item) => {
        arrays.push(item.hospital);
      });

      // Remove Duplicate
      let unique = Array.from(new Set(arrays.map((item) => item.id))).map(
        (id) => {
          return arrays.find((item) => item.id === id);
        }
      );

      unique.forEach((item) => {
        let latLong = [item.latitude, item.longitude];
        L.marker(latLong)
          .bindPopup("<b>" + item.type + "</b><br>" + item.name)
          .addTo(hospitals);
      });

      let mbAttr =
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        mbUrl =
          "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

      let grayscale = L.tileLayer(mbUrl, {
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

      let map = new L.map("map");
      map.addLayer(grayscale);
      map.addLayer(hospitals);

      let baseLayers = {
        Grayscale: grayscale,
        Streets: streets,
      };

      let overlays = {
        Hospitals: hospitals,
      };

      L.control.layers(baseLayers, overlays).addTo(map);
      this.maps = map;
    },
    updateMap(item) {
      let latLong = [item.hospital.latitude, item.hospital.longitude];
      let zoom = 16;

      this.maps.setView(latLong, zoom);
    },
  },

  mounted() {
    this.initMap();
    this.updateMap(this.medical_history[0]);
  },
};
</script>
