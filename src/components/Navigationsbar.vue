<template>
  <div>

    <v-navigation-drawer
      v-model="drawer"
      v-if="isLoggedIn"
      app
      :mini-variant.sync="mini"
      style="background-color: #f9f9f9"
    >
      <template v-slot:prepend>
        <v-list-item class="px-2 elevation-3" style="background-color: #CC0A2F">
          <v-list-item-avatar style="border-style: solid; border-color:#CC0A2F; border-width: thin">
            <v-img src="https://api-private.atlassian.com/users/0356db95b439a0540b2f5ab4b2fabf7a/avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="py-0 white--text">
            <v-list-item-title>{{userName}}</v-list-item-title>
            <v-list-item-subtitle class="white--text">Logged In</v-list-item-subtitle>
          </v-list-item-content>

          <v-btn icon @click.stop="mini = !mini" class="hidden-lg-and-down white--text">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list v-if="!isAdmin" dense>
        <v-list-item
          v-for="item in filterPrivatItemNavigation"
          :key="`A-${item.id}`"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/" @click="logout">
          <v-list-item-icon>
            <v-icon color="primary">mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title></v-list-item-title>Abmelden
          </v-list-item-content>
        </v-list-item>
      </v-list>

       <v-list v-if="isAdmin" dense>
        <v-list-item
          v-for="item in filterAdminItemNavigation"
          :key="`A-${item.id}`"
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title></v-list-item-title>
            {{ item.title }}
          </v-list-item-content>
        </v-list-item>

        <v-list-item router to="/" @click="logout">
          <v-list-item-icon>
            <v-icon color="primary">mdi-logout-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title></v-list-item-title>Abmelden
          </v-list-item-content>
        </v-list-item>
      </v-list>

    </v-navigation-drawer>

    <v-app-bar app color="primary" dark height="56" class="elevation-3">
      <v-avatar size="32" :tile="true">
        <img :src="require('@/assets/logo.png')" alt="logo" />
      </v-avatar>
      <v-toolbar-title class="ml-3">TH-Brandeburg</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-badge content="2" class="mr-3 mt-3" color="green" overlap>
        <v-icon size="28" color="white">mdi-message-alert</v-icon>
      </v-badge> -->

      <v-app-bar-nav-icon v-if="isLoggedIn" @click.stop="drawer= !drawer" class="hidden-lg-and-up" />
      <div v-if="!isLoggedIn">
        <v-btn
          v-for="item in filterPublicItemNavigation"
          :key="`B-${item.id}`"
          :to="item.route"
          class="mx-1 hidden-sm-and-down"
          text
        >{{ item.title }}</v-btn>
      </div>

      <v-menu left bottom v-if="!isLoggedIn">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" class="hidden-md-and-up">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="item in filterPublicItemNavigation"
            :key="`C-${item.id}`"
            :to="item.route"
          >
            <v-list-item-title>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: true,
    mini: false,
    itemsNavigation: [
      {
        id: 1,
        title: "Startseite",
        icon: "mdi-home-outline",
        admin: false,
        public: true,
        route: "/"
      },
      {
        id: 2,
        title: "Anmelden",
        icon: "mdi-account-key-outline",
        admin: false,
        public: true,
        route: "/login"
      },
      {
        id: 3,
        title: "Registrieren",
        icon: "mdi-account-plus-outline",
        admin: false,
        public: true,
        route: "/registrieren"
      },
      {
        id: 4,
        title: "Einschreiben",
        icon: "mdi-file-document-outline",
        admin: false,       
        public: false,
        route: "/einschreiben"
      },
      {
        id: 5,
        title: "Status",
        icon: "mdi-information-outline",
        admin: false,
        public: false,
        route: "/status"
      },
      {
        id: 6,
        title: "Dashboard",
        icon: "mdi-monitor-dashboard",
        admin: true,
        public: false,
        route: "/adminpanel"
      }
    ]
  }),
  computed: {
    filterPublicItemNavigation: function() {
      let result = this.itemsNavigation.filter(item => item.public);
      return result;
    },
    filterPrivatItemNavigation: function() {
      let privat = this.itemsNavigation.filter(item => !item.public);
      let result = privat.filter(item => !item.admin);
      return result;
    },
    filterAdminItemNavigation: function() {
      let result = this.itemsNavigation.filter(item => item.admin);
      return result;
    },
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isAdmin: function() {
      return this.$store.getters.isAdmin;
    },
    userName: function() {
      return this.$store.getters.getNameUser;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }
};
</script>