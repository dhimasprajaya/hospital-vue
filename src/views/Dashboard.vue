<template>
  <v-container class="backdrop" fluid>
    <v-row no-gutters>
      <v-col v-for="item in summaries" :key="item.label" cols="12" sm="4">
        <v-card outlined tile>
          <v-card-title
            >Total {{ item.label }} : {{ item.total | thousand }}</v-card-title
          >
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="12" md="8">
        <v-card id="map" height="460px" style="z-index:0"></v-card>
      </v-col>
      <v-col cols="12" sm="12" md="4">
        <v-row no-gutters>
          <v-col class="mb-4" cols="12">
            <v-card outlined tile>
              <v-card-title>Period: January - June 2020</v-card-title>
              <v-card-subtitle
                >Last Update : {{ new Date().toDateString() }}</v-card-subtitle
              >
            </v-card>
          </v-col>
          <v-col class="mb-2" cols="12" sm="6" md="12">
            <v-card outlined tile>
              <canvas id="chart-visit"></canvas>
            </v-card>
          </v-col>
          <v-col class="mb-2" cols="12" sm="6" md="12">
            <v-card outlined tile>
              <canvas id="chart-patient"></canvas>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "Dashboard",

  data: () => ({
    summaries: [
      { label: "Hospital", total: null },
      { label: "Doctor", total: 3500 },
      { label: "Patient", total: 1000000 },
    ],
  }),

  methods: {
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
        Hospitals: hospitals,
      };

      L.control.layers(baseLayers, overlays).addTo(map);
    },
    initChart() {
      let chartData = {
        visit: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: {
            label: "Visit",
            data: [2, 8, 4, 10, 20, 15],
          },
        },
        patient: {
          labels: ["Male", "Female"],
          datasets: {
            label: "Patient",
            data: [10, 20],
          },
        },
      };

      // Line Chart
      new Chart("chart-visit", {
        type: "line",
        data: {
          labels: chartData.visit.labels,
          datasets: [
            {
              fill: false,
              label: chartData.visit.datasets.label,
              backgroundColor: "rgb(255, 99, 132)",
              borderColor: "rgb(255, 99, 132)",
              data: chartData.visit.datasets.data,
            },
          ],
        },
        options: {
          elements: {
            line: {
              tension: 0,
            },
          },
          layout: {
            padding: {
              bottom: 10,
            },
          },
          title: {
            display: true,
            text: "Visit Statistic",
          },
        },
      });

      // Pie Chart
      new Chart("chart-patient", {
        type: "pie",
        data: {
          labels: chartData.patient.labels,
          datasets: [
            {
              backgroundColor: ["rgb(255, 205, 86)", "rgb(54, 162, 235)"],
              borderColor: ["rgb(255, 205, 86)", "rgb(54, 162, 235)"],
              data: chartData.patient.datasets.data,
            },
          ],
        },
        options: {
          layout: {
            padding: {
              bottom: 10,
            },
          },
          title: {
            display: true,
            text: "Visit Statistic",
          },
        },
      });
    },
  },

  mounted() {
    this.initMap();
    this.initChart();
  },
};
</script>
