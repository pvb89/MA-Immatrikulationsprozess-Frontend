import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Registrieren from '../views/Registrieren.vue'
import Einschreiben from '../views/Einschreiben.vue'
import Status from '../views/Status.vue'
import Adminpanel from '../views/Adminpanel.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registrieren',
    name: 'Registrieren',
    component: Registrieren
  },
  {
    path: '/status',
    name: 'Status',
    component: Status,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/einschreiben',
    name: 'Einschreiben',
    component: Einschreiben,
    meta: {
      requiresAuth: true    }
  },
  {
    path: '/adminpanel',
    name: 'Adminpanel',
    component: Adminpanel,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // Prüfen ob die Ziel Route eine Auhorisierung erfordert
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Via Vuex prüfen ob ein User eingeloggt ist
    let isLoggendIn = store.getters.isLoggedIn;
    if (isLoggendIn) {
      // Prüfen ob die Ziel Route Adminrechte benötigt
      if (to.matched.some(record => record.meta.requiresAdmin)) {
        let isAdmin = store.getters.isAdmin;
        if (isAdmin) {
          next();
        } else {
          from()
        }
      }
      next();
    } else {
      next('/registrieren')
    }
  } else {
    next();
  }
})



export default router