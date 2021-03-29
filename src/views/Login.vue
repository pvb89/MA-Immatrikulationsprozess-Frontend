<template>
  <v-container class="fill-height main" fluid>
    <v-row align="center" justify="center" class="mx-0 px-0">
      <v-col cols="12" sm="10" md="8" lg="4" class>
        <v-card class="elevation-12">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Anmelden</v-toolbar-title>
            <v-spacer />
          </v-toolbar>
          <v-card-text class="pb-0">
            <v-form ref="form">
              <v-text-field
                label="Login"
                name="login"
                prepend-icon="mdi-account"
                type="text"
                v-model="form.mail"
                :rules="rules.mail"
              />
              <v-text-field
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                label="Password"
                name="password"
                prepend-icon="mdi-lock"
                v-model="form.password"
                :rules="rules.password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary white--text" @click="login">Login</v-btn>
            <v-btn color="primary white--text" @click="googleLogin"
              >Google Login</v-btn
            >
          </v-card-actions>
        </v-card>
        <v-alert
          class="mt-4 mb-0"
          border="left"
          colored-border
          type="error"
          elevation="4"
          v-if="alert.check"
          >{{ alert.text }}</v-alert
        >
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
    source: String,
  },
  data: () => ({
    showPassword: false,
    snackbar: false,
    alert: {
      check: null,
      elapse: null,
      text: "",
    },
    form: {
      mail: "",
      password: "",
    },
    rules: {
      mail: [
        (v) => !!v || "Bitte tragen Sie eine eMail Adresse ein",
        // v =>
        //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
        //   "Die eMail Adresse entspricht nicht den gängigen Richtlinien"
      ],
      password: [
        (v) => !!v || "Bitte tragen Sie ein Password ein",
        (v) =>
          (v && v.length > 2) ||
          "Ihr Password besteht aus mindestens 6 Zeichen",
      ],
    },
  }),
  methods: {
    showAlert() {
      this.alert.check = true;

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
    },
    async login() {
      if (this.$refs.form.validate()) {
        const userData = {
          mail: this.form.mail,
          password: this.form.password,
        };
        try {
          // API Request zum Login
          const response = await authServices.login(userData);
          // Antwort der API verarbeiten
          const token = response.data.token;
          const { userId, mail, admin } = response.data.user;
          const name = `${response.data.user.firstname} ${response.data.user.lastname}`;
          // Login Action in Vuex auslösen
          this.$store.dispatch("login", { token, userId, mail, name, admin });
          if (this.$store.getters.isAdmin) {
            this.$router.push("/adminpanel");
          } else {
            this.$router.push("/einschreiben");
          }
        } catch (error) {
          this.alert.text = "Der Benutzer oder das Passwort ist falsch";
          this.showAlert();
        }
      }
    },
    async googleLogin() {
      // One-Time-Code von google anfordern
      let authCode = await this.$gAuth.getAuthCode().catch(() => {
        this.alert.text = "Google Login fehlgeschlagen";
        this.showAlert();
      });

      try {
        // API Request zum Login
        const response = await authServices.googleLogin({ token: authCode });
        // Antwort der API verarbeiten
        const token = response.data.token;
        const { userId, mail, admin } = response.data.user;
        const name = `${response.data.user.firstname} ${response.data.user.lastname}`;
        // Login Action im Vuex starten
        this.$store.dispatch("login", { token, userId, mail, name, admin });
        // Zur Seite "Einschreibung" leiten
        if (this.$store.getters.isAdmin) {
          this.$router.push("/adminpanel");
        } else {
          this.$router.push("/einschreiben");
        }
      } catch (error) {
        this.alert.text = "Google Login fehlgeschlagen";
        this.showAlert();
      }
    },
  },
};
</script>