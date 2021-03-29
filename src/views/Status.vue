<template>
  <v-container class="fill-height main px-0">
    <v-row align="center" justify="center" class="mx-0 px-0 pb-0">
      <v-col cols="12" sm="10" md="8">
        <h4 class="text-center" v-if="courseEntrys.length === 0">
          Sie sind noch an keinem Studiengang eingeschrieben
        </h4>
        <v-simple-table
          fixed-header
          style="max-height: 300px; overflow-y: auto"
          class="mb-5 elevation-2"
          v-if="courseEntrys.length > 0"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Studiengang</th>
                <th class="text-left">Status</th>
                <th class="text-left hidden-sm-and-down">Information</th>
                <th class="text-center">Aktion</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in courseEntrys" :key="entry.id">
                <td>{{ entry.course.description }}</td>
                <td>{{ entry.status.status }}</td>
                <td class="hidden-sm-and-down">
                  {{ entry.status.description }}
                </td>
                <td class="text-center">
                  <v-btn text small outlined @click="loadDetails(entry.id)"
                    >Details</v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>

        <v-stepper
          v-model="antrag[0].statusId"
          v-if="stepper && antrag[0].statusId < 6"
        >
          <v-stepper-header>
            <v-stepper-step
              color="orange"
              :complete="antrag[0].statusId > 1"
              step="1"
              >Antrag eingangen</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step
              :complete="antrag[0].statusId > 2"
              step="2"
              color="deep-orange"
              >Unterlagen prüfen</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step
              :complete="antrag[0].statusId > 3"
              step="3"
              color="primary"
              v-show="antrag[0].statusId == 3"
              >Dokumente fehlerhaft</v-stepper-step
            >

            <v-divider v-show="antrag[0].statusId == 3"></v-divider>

            <v-stepper-step
              :complete="antrag[0].statusId > 3"
              step="4"
              color="deep-orange "
              >Zahlungseingang</v-stepper-step
            >

            <v-divider></v-divider>

            <v-stepper-step
              :complete="antrag[0].statusId > 4"
              step="5"
              color="green"
              >Immatrikuliert</v-stepper-step
            >
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1" align="center" justify="center">
              <v-card class="pb-5" color="#f7f7f7" shaped elevation="0">
                <v-toolbar color="orange" dark flat class="mb-5">
                  <v-toolbar-title>Antrag eingegangen</v-toolbar-title>
                  <v-spacer /> </v-toolbar
                >Vielen Dank, Ihr Antrag ist erfolgreich bei uns eingegangen.
                <br />
                <br />Den aktuellen Status Ihrer Bewerbung können Sie hier
                einsehen. <br />Desweiteren werden Sie von uns per eMail über
                Aktualisierungen informiert.
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="2" align="center" justify="center">
              <v-card class="pb-5" color="#f7f7f7" shaped elevation="0">
                <v-toolbar class="mb-5" color="deep-orange" dark flat>
                  <v-toolbar-title>Unterlagen prüfen</v-toolbar-title>
                  <v-spacer /> </v-toolbar
                >Ihre Unterlagen werden aktuell von einem Mitarbeiter/in der
                Hochschule geprüft. <br />Wir bemühen uns um eine
                schnellstmögliche Bearbeitung Ihrer Unterlagen.
                <br />
                <br />Sollten Sie Fragen haben, können Sie uns telefonisch oder
                über das <href>Kontaktformular</href> erreichen.
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="3" align="center" justify="center">
              <v-card class color="#f7f7f7" shaped elevation="0">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Dokumente fehlerhaft</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <v-form ref="formUpload">
                  <v-card color="#f7f7f7" class elevation="0">
                    <v-card-title class="title"
                      >Bitte laden Sie ihre Dokumente erneut hoch</v-card-title
                    >
                    <v-card-text class="pb-0">
                      <v-file-input
                        accept="application/pdf"
                        label="Höchster Bildungsabschluss (pdf)"
                        v-model="form.fileBildungsabschluss"
                        :rules="rules.filePDF"
                      />
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer />
                      <v-btn color="primary" class="mb-2">Hochladen</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="4" align="center" justify="center">
              <v-card class="pb-5" color="#f7f7f7" shaped elevation="0">
                <v-toolbar color="deep-orange" dark flat>
                  <v-toolbar-title>Zahlungseingang</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <br />Ihre Unterlagen wurden erfolgreich geprüft. <br />Bitte
                überweisen Sie den Betrag von 283,70€ innerhalb von zwei Wochen
                auf das unten stehende Konto.
                <br />
                <br />
                <strong>Empfänger:</strong> Landeshauptkasse / TH Brandenburg
                <br />
                <strong>Kreditinstitut:</strong> Landesbank Hessen-Thüringen
                (Helaba)
                <br />
                <strong>IBAN:</strong> DE 13 3005 0000 7110 402869
                <br />
                <strong>BIC/Swift:</strong> WELADEDDXXX
                <br />
                <br />
                <strong>Verwendungszweck:</strong>
                1006600002458 - Name, Vorname
              </v-card>
            </v-stepper-content>

            <v-stepper-content step="5" align="center" justify="center">
              <v-card class="pb-5" color="#f7f7f7" shaped elevation="0">
                <v-toolbar color="green" dark flat>
                  <v-toolbar-title>Immatrikuliert</v-toolbar-title>
                  <v-spacer />
                </v-toolbar>
                <br />
                <h2>
                  Herzlichen Glückwunsch, Sie wurden erfolgreich für den
                  Studiengang {{ antrag[0].bezeichnung }} immatrikuliert.
                </h2>
              </v-card>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
        <v-card color="white" class="px-5 py-5" v-if="antrag[0].statusId >= 6">
          <v-card color="#f7f7f7" elevation="0" class="pb-5" shaped>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Achtung</v-toolbar-title>
              <v-spacer />
            </v-toolbar>
            <v-card-text class="pb-0 text-center black--text">
              <div v-if="antrag[0].statusId == 6">
                <h3>
                  Ihre Immatrikulation ist leider fehlgeschlagen, da Sie die
                  Frist für die Zahlung der Semestergebühren überschritten
                  haben.
                </h3>
                <br />Falls Sie Ihren Antrag auf Immatrikulation aufrecht
                erhalten wollen, melden Sie sich bitte telefonisch oder über das
                Kontaktformular bei uns.
              </div>
              <div v-if="antrag[0].statusId == 7">
                <h3>
                  Ihre Immatrikulation ist leider fehlgeschlagen, da Sie den
                  geforderten Numerus Clausus für den Studiengang
                  Wirtschaftsingenieurwesen nicht erreicht haben.
                </h3>
                <br />Eine Einschreibung ist daher zum jetzigen Zeitpunkt für
                das gewünschte Semster nicht mehr möglich.
              </div>
            </v-card-text>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.main {
  background-color: #f9f9f9;
  max-width: 100%;
}
</style>

<script>
import generalServices from "@/services/generalServices.js";

export default {
  data() {
    return {
      pufferId: null,
      e1: 1,
      stepper: false,
      antrag: [{ status: 0 }],
      courseEntrys: [],
      interval: null,
      form: {
        fileBildungsabschluss: null,
        filePassbild: null,
      },
      rules: {
        filePDF: [
          (v) => !!v || "Bitte laden Sie eine Datei hoch"
        ]
      },
    };
  },
  methods: {
    loadDetails(id) {
      this.pufferId = id;
      this.stepper = true;
      this.antrag = this.courseEntrys.filter((item) => item.id == id);
    },
    async loadData() {
      const userId = this.$store.getters.getIdUser;
      this.courseEntrys = await generalServices.getCourseEntrys(userId);
      if (this.stepper) {
        this.loadDetails(this.pufferId);
      }
    },
  },
  mounted() {
    this.loadData();
    this.interval = setInterval(
      function () {
        this.loadData();
      }.bind(this),
      5000
    );
  },
  beforeDestroy: function () {
    clearInterval(this.interval);
  },
};
</script>