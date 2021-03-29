<template>
  <div class>
    <v-parallax class="hidden-sm-and-down" src="../img/thbpeople.jpg"></v-parallax>
    <v-container fill-height fluid class="px-0 py-0 mb-5">
      <v-row class="mx-auto" align="center" justify="center">
        <v-col cols="12" md="10" lg="8">
          <v-row>
            <v-col class="text-justify">
              <h1 class="mb-3 mt-3">Willkommen an der Immatrikulationseite der THB</h1>
              <v-divider color="#CC0A2F"></v-divider>
              <p
                class="text-justify mt-3"
              >Lorem ipsum dolor sit amet, consetetur, sed diam nonumy eirmod tempor invidunt ut labore et sadipscing elitr, sed diam nonumy eirmod tempor invidunt sit amet, consetetur, sed diam nonumy eirmod tempor invidunt ut labore et sadipscing elitr, ut labore et, sed diam nonumy eirmod tempor invidunt ut labore et</p>
            </v-col>
          </v-row>
          <v-row justify="space-around" class="text-center">
            <v-col cols="12" md="4">
              <v-hover v-slot:default="{ hover }" open-delay="100">
                <v-card class="mx-auto" outlined :elevation="hover ? 8 : 0">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-card-text>
                        <v-icon x-large color="primary">mdi-account-multiple</v-icon>
                      </v-card-text>
                      <v-list-item-title class="headline mb-3">3425 Studenten</v-list-item-title>
                      <v-card-text
                        class="text-justify"
                      >Lorem ipsum dolor sit amet, consetetur, et sadipscing elitr, sed diam nonumy eirmod ipsum dolor sit amet, consetetur, sed diam nonumy eirmod tempor invidunt ut labore et sadipscing elitr, sed diam nonumy eirmod, sed diam nonumy eirmod tempor invidunt ut labore et sadipscing elitr, sed diam nonumy eirmod</v-card-text>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" md="4">
              <v-hover v-slot:default="{ hover }" open-delay="100">
                <v-card class="mx-auto" outlined :elevation="hover ? 8 : 0">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-card-text>
                        <v-icon x-large color="primary">mdi-school</v-icon>
                      </v-card-text>
                      <v-list-item-title class="headline mb-3">26 Studiengänge</v-list-item-title>
                      <v-card-text
                        class="text-justify"
                      >Lorem ipsum dolor sit amet, consetetur, sed diam nonumy eirmod tempor invidunt ut labore et sadipscing elitr, sed diam, sed diam nonumy eirmod tempor invidunt ut labore et sadipscing elitr, sed diam nonumy eirmod nonumy eirmod tempor invidunt ut labore et, sed diam nonumy eirmod tempor invidunt ut labore et</v-card-text>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="12" md="4">
              <v-hover v-slot:default="{ hover }" open-delay="100">
                <v-card class="mx-auto" outlined :elevation="hover ? 8 : 0">
                  <v-list-item three-line>
                    <v-list-item-content>
                      <v-card-text>
                        <v-icon x-large color="primary">mdi-marker-check</v-icon>
                      </v-card-text>
                      <v-list-item-title class="headline mb-3">21895 Absolventen</v-list-item-title>
                      <v-card-text
                        class="text-justify"
                      >Lorem ipsum dolor sit amet, consetetur, sed diam nonumy eirmod tempor invidunt ut labore onumy eirmod tempor invidunt ut labore et sadipscing elitr, sed diam nonumy eirmod labore et, sed diam nonumy eirmod tempor invidunt ut labore et</v-card-text>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-parallax class="hidden-sm-and-down" src="../img/thbpeople.jpg" height="300"/>
    <v-container fluid class="px-0 py-0">
      <v-row class="mx-auto" align="center" justify="center">
        <v-col cols="12" md="8">
          <h1 class="text-center my-5">Der Verlauf ihrer Immatrikulation</h1>
          <v-timeline class="mb-5" :dense="$vuetify.breakpoint.smAndDown">
            <v-timeline-item icon="mdi-file-document-box-check-outline">
              <span slot="icon" class="white--text">1</span>
              <v-card class="elevation-2">
                <v-card-title class="headline">Immatrikulationsantrag stellen</v-card-title>
                <v-card-text
                  class="white"
                >Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola impest et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
              </v-card>
            </v-timeline-item>
            <v-timeline-item icon="mdi-file-document-box-check-outline">
              <span slot="icon" class="white--text">2</span>
              <v-card class="elevation-2">
                <v-card-title class="headline">Ihre Unterlagen werden aktuell geprüft</v-card-title>
                <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
              </v-card>
            </v-timeline-item>
            <v-timeline-item icon="mdi-file-document-box-check-outline">
              <span slot="icon" class="white--text">3</span>
              <v-card class="elevation-2">
                <v-card-title class="headline">Ihr Zahlungseingang wird erwartet</v-card-title>
                <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevot, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
              </v-card>
            </v-timeline-item>
            <v-timeline-item color="green" icon="mdi-file-document-box-check-outline">
              <span slot="icon" class="white--text">4</span>
              <v-card class="elevation-2">
                <v-card-title class="headline">Sie wurden erfolgreich Immatrikuliert</v-card-title>
                <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune s et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  data: () => ({
    show: false,
    items: [
      {
        color: "red lighten-2",
        icon: "mdi-star"
      },
      {
        color: "purple darken-1",
        icon: "mdi-book-variant"
      },
      {
        color: "green lighten-1",
        icon: "mdi-airballoon"
      },
      {
        color: "indigo",
        icon: "mdi-buffer"
      }
    ]
  })
};
</script>