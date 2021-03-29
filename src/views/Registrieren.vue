<template>
  <v-container class="fill-height main" fluid>
    <v-row align="center" justify="center" class="mx-0 px-0">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Registrierung</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text class="pb-0">
            <v-form ref="form">
              <v-text-field
                label="eMail Adresse"
                name="mail"
                id="mail"
                prepend-icon="mdi-mail"
                type="email"
                v-model="form.mail"
                :rules="rules.mail"
              />
              <v-text-field
                id="firstname"
                label="Vorname"
                name="firstname"
                prepend-icon="mdi-account"
                type="text"
                v-model="form.firstname"
                :rules="rules.text"
                autocomplete="given-name"
              />
              <v-text-field
                id="lastname"
                label="Nachname"
                name="lastname"
                prepend-icon="mdi-account"
                type="text"
                v-model="form.lastname"
                :rules="rules.text"
                autocomplete="family-name"
              />
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                id="password1"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                v-model="form.password1"
                autocomplete="new-password"
              />
              <v-text-field
                :type="showPassword ? 'text' : 'password'"
                id="password2"
                label="Password wiederholen"
                name="password"
                prepend-icon="mdi-lock"
                v-model="form.password2"
                :rules="rules.passwordConfirm"
                autocomplete="new-password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary white--text" @click="register">Registrieren</v-btn>
          </v-card-actions>
        </v-card>
        <v-alert
          class="mt-4 mb-0"
          border="left"
          colored-border
          :type="alert.type"
          elevation="4"
          v-if="alert.check"
        >{{alert.text}}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.main {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(../img/thbtec.jpg);
  background-size: cover;
}
</style>

<script>
import authServices from "@/services/authServices.js";

export default {
  props: {
    source: String
  },
  data: function() {
    return {
      showPassword: false,
      alert: {
        check: null,
        elapse: null,
        text: "null",
        type: "error"
      },
      form: {
        mail: "",
        firstname: "",
        lastname: "",
        password1: "",
        password2: ""
      },
      rules: {
        notEmpty: [v => !!v || "Bitte füllen Sie das Feld aus"],
        text: [
          v => !!v || "Bitte füllen Sie das Feld aus",
          v => (v && v.length <= 25) || "Maximal 25 Zeichen",
          v => (v && v.length >= 3) || "Mindestens 3 Zeichen"
        ],
        mail: [
          v => !!v || "Bitte tragen Sie eine eMail Adresse ein",
        ],
        password: [
          v => !!v || "Bitte tragen Sie ein Password ein",
        ],
        passwordConfirm: [
          v => !!v || "Bitte wiederholen Sie ihr Password",
        ]
      }
    };
  },
  methods: {
    async register() {
      if (this.form.password1 !== this.form.password2) {
        this.showAlert("Die Passwörter stimmen nicht überein ", "error");
        // Prüfen ob das Formular alle Regeln befolgt
      } else if (this.$refs.form.validate()) {
        // Request Body vorbereiten
        const userData = {
          mail: this.form.mail,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
          password: this.form.password1,
        };
        try {
          // API Request - Benutzer registrieren
          await authServices.register(userData);
          // Benutzerbenachrichtigung
          this.showAlert("Sie wurden erfolgreich registriert", "success");
          // Sleep damit der User den Alert lesen kann
          await this._sleep(1500);
          this.$refs.form.reset();
          this.$router.push("/login");
        } catch (error) {
          this.showAlert("Die eMail Adresse wird schon verwendet", "error");
        }
      }
    },
    // Hilfsfunktion zum "schlafen" um die weiterleitung zu verzögern
    _sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    // Hilfsfunktion um eine Benachrichtigung an den Benutzer zu senden
    showAlert(text, type) {
      this.alert.check = true;
      this.alert.text = text;
      this.alert.type = type;
      let timer = this.showAlert.timer;
      if (timer) {
        clearTimeout(timer);
      }
      this.showAlert.timer = setTimeout(() => {
        this.alert.check = null;
      }, 3000);
      this.alert.elapse = 1;
      let t = this.showAlert.t;
      if (t) {
        clearInterval(t);
      }
      this.showAlert.t = setInterval(() => {
        if (this.alert.elapse === 3) {
          this.alert.elapse = 0;
          clearInterval(this.showAlert.t);
        } else {
          this.alert.elapse++;
        }
      }, 1000);
    }
  }};
</script>