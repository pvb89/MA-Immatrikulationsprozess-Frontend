<template>
  <v-container class="fill-height main px-0">
    <v-row align="center" justify="center" class="mx-0 px-0">
      <v-col cols="12" sm="10" md="8">
        <v-stepper v-model="e6" vertical>
          <v-stepper-step :complete="e6 > 1" step="1"
            >Studiengang auswählen</v-stepper-step
          >

          <v-stepper-content step="1">
            <v-form ref="formStudiengang">
              <v-card color="#f7f7f7" class="mb-5" shaped elevation="0">
                <v-card-text>
                  <v-combobox
                    v-model="form.course"
                    :items="options[0].auswahlStudiengang"
                    :rules="rules.notEmpty"
                    label="Wählen Sie hier bitte den gewünschten Studiengang aus."
                    prepend-icon="mdi-school"
                  />
                </v-card-text>
              </v-card>
            </v-form>

            <v-btn
              color="primary"
              @click="submitStep(2, 'formStudiengang')"
              class="mr-2"
              >Weiter</v-btn
            >
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 2" step="2"
            >Persönliche Daten</v-stepper-step
          >
          <v-stepper-content step="2">
            <v-form ref="formPerson">
              <v-card color="#f7f7f7" class="mb-5" shaped elevation="0">
                <v-card-text>
                  <v-combobox
                    ref="form.gender"
                    :rules="rules.notEmpty"
                    v-model="form.gender"
                    :items="options[0].auswahlGeschlecht"
                    label="Geschlecht"
                    prepend-icon="mdi-account"
                  />

                  <v-menu
                    ref="menuBday"
                    v-model="menuBday"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        hint="MM/DD/YYYY format"
                        v-model="form.bday"
                        label="Geburtsdatum"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-on="on"
                      />
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="form.bday"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="save"
                    />
                  </v-menu>

                  <v-text-field
                    v-model="form.birthplace"
                    label="Geburtsort"
                    prepend-icon="mdi-account"
                    type="text"
                    ref="form.person.geburtsort"
                    :rules="rules.text"
                    autocomplete="new-password"
                  />
                  <v-autocomplete
                    v-model="form.birthcountry"
                    :items="countryData"
                    :key="countryData.id"
                    persistent-hint
                    label="Geburtsland"
                    prepend-icon="mdi-account"
                    ref="form.birthcountry"
                    :rules="rules.text"
                  />
                  <v-autocomplete
                    v-model="form.nationality"
                    :items="countryData"
                    :key="countryData.id"
                    persistent-hint
                    label="Staatsangehörigkeit"
                    prepend-icon="mdi-account"
                    ref="form.nationality"
                    :rules="rules.text"
                  />
                </v-card-text>
              </v-card>
            </v-form>
            <v-card-actions>
              <v-btn
                color="primary"
                @click="submitStep(3, 'formPerson')"
                class="mr-2"
                >Weiter</v-btn
              >
              <v-btn text @click="e6 = 1">Zurück</v-btn>
            </v-card-actions>
          </v-stepper-content>

          <v-stepper-step :complete="e6 > 3" step="3"
            >Postanschrift</v-stepper-step
          >
          <v-stepper-content step="3">
            <v-form ref="formPostanschrift">
              <v-card color="#f7f7f7" class="mb-5" shaped elevation="0">
                <v-card-text>
                  <v-text-field
                    v-model="form.street"
                    label="Straße und HausNr"
                    prepend-icon="mdi-city"
                    :rules="rules.text"
                    autocomplete="address-line1"
                  />
                  <v-text-field
                    v-model="form.zipCode"
                    label="Postleitzahl"
                    prepend-icon="mdi-city"
                    type="Number"
                    onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))"
                    :rules="rules.validPLZ"
                    autocomplete="postal-code"
                  />
                  <v-text-field
                    v-model="form.domicile"
                    label="Ort"
                    prepend-icon="mdi-city"
                    :rules="rules.text"
                    autocomplete="address-level2"
                  />
                  <v-autocomplete
                    v-model="form.country"
                    :items="countryData"
                    :key="countryData.id"
                    persistent-hint
                    label="Land"
                    prepend-icon="mdi-city"
                    :rules="rules.notEmpty"
                    autocomplete="new-password"
                  />
                </v-card-text>
              </v-card>
            </v-form>
            <v-btn
              color="primary"
              @click="submitStep(4, 'formPostanschrift')"
              class="mr-2"
              >Weiter</v-btn
            >
            <v-btn text @click="e6 = 2">Zurück</v-btn>
          </v-stepper-content>

          <v-stepper-step step="4" :complete="e6 > 4"
            >Angaben zur Hochschulreife</v-stepper-step
          >
          <v-stepper-content step="4">
            <v-form ref="formHochschulreife">
              <v-card color="#f7f7f7" class="mb-5" shaped elevation="0">
                <v-card-text>
                  <v-combobox
                    v-model="form.universityQualification"
                    :items="options[0].art"
                    label="Art der Hochschulreife"
                    prepend-icon="mdi-school"
                    :rules="rules.notEmpty"
                  />
                  <v-text-field
                    v-model="form.averageGrade"
                    label="Durchschnittsnote"
                    prepend-icon="mdi-school"
                    type="Number"
                    onkeydown="javascript: return event.keyCode === 190 || event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))"
                    :rules="rules.nc"
                  />
                </v-card-text>
              </v-card>
            </v-form>
            <v-btn
              color="primary"
              @click="submitStep(5, 'formHochschulreife')"
              class="mr-2"
              >Weiter</v-btn
            >
            <v-btn text @click="e6 = 3">Zurück</v-btn>
          </v-stepper-content>

          <v-stepper-step step="5" :complete="e6 > 5"
            >Angabe zur Krankenkasse</v-stepper-step
          >
          <v-stepper-content step="5">
            <v-form ref="formKrankenkasse">
              <v-card color="#f7f7f7" class="mb-5" shaped elevation="0">
                <v-card-text>
                  <v-combobox
                    v-model="form.healthInsuranceStatus"
                    :items="options[0].krankenversicherungStatus"
                    label="Versicherungsstatus"
                    prepend-icon="mdi-clipboard-text"
                    :rules="rules.notEmpty"
                  />
                  <v-text-field
                    v-if="krankenversicherungStatus"
                    v-model="form.healthInsuranceName"
                    label="Krankenkasse"
                    prepend-icon="mdi-clipboard-text"
                  />
                  <v-text-field
                    v-if="krankenversicherungStatus"
                    v-model="form.healthInsuranceNumber"
                    label="Versicherungsnummer"
                    prepend-icon="mdi-clipboard-text"
                    onkeydown="javascript: return event.keyCode === 8 || event.keyCode === 46 ? true : !isNaN(Number(event.key))"
                    type="number"
                  />
                </v-card-text>
              </v-card>
            </v-form>
            <v-btn
              color="primary"
              @click="submitStep(6, 'formKrankenkasse')"
              class="mr-2"
              >Weiter</v-btn
            >
            <v-btn text @click="e6 = 4">Zurück</v-btn>
          </v-stepper-content>
          <v-stepper-step step="6" :complete="e6 > 6">Upload</v-stepper-step>
          <v-stepper-content step="6">
            <v-form ref="formUpload">
              <v-card color="#f7f7f7" class="mb-5" shaped elevation="0">
                <v-card-text>
                  <v-file-input
                    accept="application/pdf"
                    label="Höchster Bildungsabschluss (pdf)"
                    v-model="educationCertificateFileModel"
                    :rules="rules.filePDF"
                  />
                </v-card-text>
              </v-card>
            </v-form>
            <v-btn color="primary" @click="onSubmit()">Abschicken</v-btn>
            <v-btn text @click="e6 = 5">Zurück</v-btn>
          </v-stepper-content>
        </v-stepper>
        <v-alert
          class="mt-4"
          border="left"
          colored-border
          :type="alert.type"
          elevation="4"
          v-if="alert.check"
          >{{ alert.text }}</v-alert
        >
      </v-col>
    </v-row>
    <v-dialog v-model="dialog" persistent width="300">
      <v-card class="pt-4" color="primary" dark>
        <v-card-text>
          Ihr Antrag wird gespeichert...
          <v-progress-linear
            indeterminate
            color="white"
            class="mt-2"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSuccess" persistent width="310">
      <v-card class="pt-5" color="green" dark>
        <v-card-text> Ihr Antrag wurde erfolgreich übermittelt... </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogFailed" width="350">
      <v-card class="pt-5" color="red" dark>
        <v-card-text>
          Es gab ein Problem, bitte probieren Sie es in 5 Minuten erneut...
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.main {
  background-color: #f9f9f9;
  max-width: 100%;
}
.progressText {
  color: #000000;
}
</style>

<script>
import countryData from "@/assets/countryData.json";
import generalServices from "@/services/generalServices.js";
import camundaServices from "@/services/camundaServices.js";

export default {
  data() {
    return {
      dialog: false,
      dialogSuccess: false,
      dialogFailed: false,
      e6: 1,
      date: null,
      menuHochschulreife: null,
      menuBday: null,
      educationCertificateFileModel: null,
      alert: {
        check: null,
        elapse: null,
        text: "",
        type: "",
      },
      countryData: countryData,
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 10 || "Name must be less than 10 characters",
      ],
      rules: {
        notEmpty: [(v) => !!v || "Bitte füllen Sie das Feld aus"],
        text: [
          (v) => !!v || "Bitte füllen Sie das Feld aus",
          (v) => (v && v.length <= 25) || "Maximal 25 Zeichen",
          (v) => (v && v.length >= 3) || "Mindestens 3 Zeichen",
        ],
        nc: [
          (v) =>
            (v >= 1 && v < 5) || "Bitte eine Note zwischen 1 und 4 eingeben",
        ],
        validPLZ: [
          // https://packagist.org/packages/fadoe/postalcode-validator
          (v) =>
            /^([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[0-9]{3}$/.test(v) ||
            "Die Postleitzahl ist ungültig",
        ],
        filePDF: [
          (v) => !!v || "Bitte laden Sie eine Datei hoch",
          // v => v.size < 200000 || "Die Datei muss kleiner als 5 MB sein",
          // v =>
          //   v.type === "application/pdf" ||
          //   "Die Datei ist vom falschen Typ, bitte laden Sie eine PDF Datei hoch"
        ],
      },
      form: {
        date: null,
        course: null,
        gender: null,
        bday: null,
        birthplace: null,
        birthcountry: null,
        nationality: null,
        street: null,
        zipCode: null,
        domicile: null,
        country: null,
        universityQualification: null,
        averageGrade: null,
        healthInsuranceStatus: {
          text: "Dauer-befreit",
          value: false,
        },
        healthInsuranceName: "",
        healthInsuranceNumber: 0,
        educationCertificateFile: "",
        processId: ""
      },
      options: [
        {
          auswahlGeschlecht: [
            { value: "m", text: "Männlich" },
            { value: "w", text: "Weiblich" },
            { value: "d", text: "Divers" },
          ],
          krankenversicherungStatus: [
            { value: false, text: "Dauerbefreit" },
            { value: true, text: "Versicherungspflichtig" },
          ],
          yesNo: [
            { value: true, text: "Ja" },
            { value: false, text: "Nein" },
          ],
          art: [
            { value: "allg", text: "Allgemeine Hochschulreife" },
            { value: "fach", text: "Fachgebundene Hochschulreife " },
          ],
          auswahlStudiengang: [
            { value: 1, text: "Applied Computer Science" },
            { value: 2, text: "Informatik" },
            { value: 3, text: "Medizininformatik" },
            { value: 4, text: "Ingenieurwissenschaften" },
            { value: 5, text: "Wirtschaftsingenieurwesen" },
            { value: 6, text: "Maschinenbau" },
          ],
        },
      ],
    };
  },
  methods: {
    // Eingabe vor jeden Schritt prüfen
    submitStep(e, form) {
      if (this.$refs[form].validate()) this.e6 = e;
    },
    async onSubmit() {
      // Formular validieren
      if (this.$refs.formUpload.validate()) {
        this.dialog = true;
        let responseCourseEntry;
        // Einschreibung an das Backend senden
        try {
          let educationCertificateForm = new FormData();

          educationCertificateForm.append(
            "educationCertificate",
            this.educationCertificateFileModel
          );
          responseCourseEntry = await generalServices.postCourseEntry(
            this.form
          );
          educationCertificateForm.append(
            "courseEntryId",
            responseCourseEntry.data
          );
          await generalServices.postEducationCertificate(
            educationCertificateForm
          );
        } catch (err) {
          this.dialog = false;
          this.dialogFailed = true;
          await this._sleep(5000);
          this.dialogFailed = false;
        }
        // Camunda Prozess starten
        try {
          // Datensatz für Camunda vorbereiten
          const userDataCamunda = {
            variables: {
              courseEntryId: {
                value: responseCourseEntry.data,
                type: "integer",
              },
              averageGrade: {
                value: this.form.averageGrade,
                type: "double",
              },
              course: {
                value: this.form.course.text,
                type: "string",
              },
              courseId: {
                value: this.form.course.value,
                type: "integer",
              },
              name: {
                value: this.$store.getters.getNameUser,
                type: "string",
              },
              universityQualification: {
                value: this.form.universityQualification.text,
                type: "string",
              },
              bday: {
                value: this.form.bday,
                type: "string",
              },
              nationality: {
                value: this.form.nationality,
                type: "string",
              },
              street: {
                value: this.form.street,
                type: "string",
              },
              zipCode: {
                value: this.form.zipCode,
                type: "integer",
              },
              domicile: {
                value: this.form.domicile,
                type: "string",
              },
              country: {
                value: this.form.country,
                type: "string",
              },
              birthcountry: {
                value: this.form.birthcountry,
                type: "string",
              },
            },
            withVariablesInReturn: true,
          };
          // API Aufruf im Backend
          await camundaServices.prozessStarten(userDataCamunda);
          // Formular zurücksetzen
          this.$refs.formUpload.reset();
          // Zum Status routen
          this.dialog = false;
          this.dialogSuccess = true;
          await this._sleep(3000);
          this.dialogSuccess = false;
          this.$router.push("/status");
        } catch (err) {
          // Benutzerbenachrichtigung
          this.dialog = false;
          this.dialogFailed = true;
          await this._sleep(5000);
          this.dialogFailed = false;
        }
      } else {
        this.dialogFailed = true;
        await this._sleep(5000);
        this.dialogFailed = false;
      }
    },
    _sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    save(date) {
      this.$refs.menuBday.save(date);
    },
  },
  watch: {
    menuBday(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  computed: {
    krankenversicherungStatus: function () {
      return this.form.healthInsuranceStatus.value;
    },
  },
};
</script>