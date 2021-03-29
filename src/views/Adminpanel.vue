<template>
  <v-container id="dashboard">
    <v-row align="center" justify="center">
      <v-col cols="12" lg="5" xl="4">
          <v-card height="70" color="#F39C12" class="white--text mb-5 py-5 px-3">
              <v-icon large left>mdi-file-move-outline</v-icon>
              <span class="text-md-h6 text-xs-body-1 font-weight-light">312 eingereichte Anträge</span>
          </v-card>
          <v-card height="70" color="#00b297" class="white--text mb-5 py-5 px-3">        
              <v-icon large left>mdi-file-check-outline</v-icon>
              <span class="text-md-h6 text-xs-body-1 font-weight-light">245 immatrikulierte Studenten</span>
          </v-card>
          <v-card height="70" color="#CC0A2F" class="white--text mb-5 py-5 px-3">        
              <v-icon large left>mdi-file-alert-outline</v-icon>
              <span class="text-md-h6 text-xs-body-1 font-weight-light">57 abgelehnt Anträge</span>
          </v-card>
          <v-card height="70" color="#2471A3" class="white--text py-5 px-3">        
              <v-icon large left>mdi-account-group-outline</v-icon>
              <span class="text-md-h6 text-xs-body-1 font-weight-light">3475 eingeschriebene Studenten</span>
          </v-card>
      </v-col>
      <v-col cols="12" lg="5" xl="6">
          <v-toolbar color="primary" dark flat> 
            <v-toolbar-title class="text-md-h6 text-xs-body-1">Status der Bearbeitung</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card class="py-3">
            <pie-chart
              :data="dataStatus"
              height="250px"
              :colors="[ '#00b297', '#F39C12', '#884EA0', '#2471A3', '#CC0A2F', '#4CAF50', '#FFC300']"
            ></pie-chart>
        </v-card>
      </v-col>
      <v-col cols="12" lg="5">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Anmeldung - Informatik und Medien</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card outlined>
            <column-chart
              height="200px"
              :data="dataIMAll"
              download="AnmeldungInsgesamt"
              :colors="['#4CAF50']"
              class="px-md-3 px-sm-0 py-5"
            ></column-chart>
          </v-card>
      </v-col>
      <v-col cols="12" lg="5">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Anmeldung - Technik</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card outlined>
            <column-chart
              height="200px"
              :data="dataTAll"
              download="AnmeldungInsgesamt"
              :colors="['#2471A3']"
              class="px-md-3 px-sm-0 py-5"
            ></column-chart>
          </v-card>
      </v-col>
      <v-col cols="12" lg="10">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Anmeldung zum SS 2020 - Informatik und Medien</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card outlined>
            <line-chart
              :data="dataIM"
              download="AnmeldungSS20IM"
              :colors="[ '#17A589', '#884EA0', '#2471A3']"
              class="px-md-3 px-sm-0 py-5"
            />
          </v-card>
      </v-col>
      <v-col cols="12" lg="10">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Anmeldung zum SS 2020 - Technik</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card outlined>
            <line-chart
              :data="dataT"
              download="AnmeldungSS20T"
              :colors="['#CC0A2F', '#4CAF50', '#FFC300']"
              class="px-md-3 px-sm-0 py-5"
            />
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>

<script>
// import authServices from "@/services/authServices.js";
import Vue from "vue";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";

Vue.use(Chartkick.use(Chart));

export default {
  props: {
    source: String
  },
  data: () => ({
    dataStatus: [
      ["Offene Anträge", 75],
      ["In Bearbeitung", 23],
      ["Rückmeldung erwartet", 24],
      ["Zahlungseingang erwartet", 13],
      ["Abgelehnt", 19],
      ["Immatrikuliert", 35]
    ],
    dataIMAll: [
      ["November", 13],
      ["Dezember", 35],
      ["Januar", 93],
      ["Februar", 92],
      ["März", 76]
    ],
    dataTAll: [
      ["November", 7],
      ["Dezember", 26],
      ["Januar", 42],
      ["Februar", 75],
      ["März", 47]
    ],
    dataIM: [
      {
        name: "Applied Computer Science",
        data: {
          "2019-11-01": 5,
          "2019-12-01": 15,
          "2020-01-01": 11,
          "2020-02-01": 34,
          "2020-03-01": 37,
          "2020-04-01": 25
        }
      },
      {
        name: "Informatik",
        data: {
          "2019-11-01": 1,
          "2019-12-01": 8,
          "2020-01-01": 3,
          "2020-02-01": 18,
          "2020-03-01": 24,
          "2020-04-01": 27
        }
      },
      {
        name: "Medizininformatik",
        data: {
          "2019-11-01": 7,
          "2019-12-01": 12,
          "2020-01-01": 10,
          "2020-02-01": 41,
          "2020-03-01": 31,
          "2020-04-01": 24
        }
      }
    ],
    dataT: [
      {
        name: "Ingenieurwissenschaften",
        data: {
          "2019-11-01": 5,
          "2019-12-01": 15,
          "2020-01-01": 11,
          "2020-02-01": 34,
          "2020-03-01": 37,
          "2020-04-01": 25
        }
      },
      {
        name: "Wirtschaftsingenieurwesen",
        data: {
          "2019-11-01": 1,
          "2019-12-01": 8,
          "2020-01-01": 3,
          "2020-02-01": 18,
          "2020-03-01": 24,
          "2020-04-01": 27
        }
      },
      {
        name: "Maschinenbau",
        data: {
          "2019-11-01": 7,
          "2019-12-01": 12,
          "2020-01-01": 10,
          "2020-02-01": 41,
          "2020-03-01": 31,
          "2020-04-01": 24
        }
      }
    ]
  }),
  methods: {}
};
</script>