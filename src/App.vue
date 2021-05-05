<template>
  <v-app>
    <Navigationsbar />
    <v-main class="mb-xs-5">
      <router-view />
    </v-main>
    <v-footer color="primary white--text" inset app class="pt-2">
      <v-row align="center" justify="space-between">
        <v-col cols="12" sm="6">
          &copy;
          {{ new Date().getFullYear() }} —
          <strong>Patryk von Behren</strong>
        </v-col>
        <v-col class="text-right d-none d-sm-inline" cols="12" sm="6">
          <v-btn
            :href="data.link"
            target="_blank"
            color="white"
            v-for="(data, i) in footerData"
            :key="data + i"
            class="mx-1"
            icon
          >
            <v-icon size="20px">{{ data.icon }}</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import Navigationsbar from "./components/Navigationsbar";


console.log("upload ging");

export default {
  props: {
    source: String
  },
  data: () => ({
    footerData: [
      {
        icon: "mdi-facebook",
        link: "https://www.facebook.com/THBrandenburg "
      },
      {
        icon: "mdi-twitter",
        link: "https://twitter.com/th_brandenburg"
      },
      {
        icon: "mdi-linkedin",
        link: "https://www.linkedin.com/school/th-brandenburg"
      },
      {
        icon: "mdi-xing",
        link: "https://www.xing.com/companies/technischehochschulebrandenburg"
      },
      {
        icon: "mdi-instagram",
        link: "https://www.instagram.com/th_brandenburg"
      }
    ]
  }),
  components: {
    Navigationsbar
  },
  mounted() {
    if(this.$store.getters.isAdmin && this.$store.getters.isLoggedIn) {
      this.$router.push("/adminpanel").catch(()=>{});
    } else if(this.$store.getters.isLoggedIn) {
      this.$router.push("/status").catch(()=>{});
    }
  }
};
</script>