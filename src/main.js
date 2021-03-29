import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import Axios from 'axios'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLEAUTH_CLIENTID,
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)

const token = localStorage.getItem('token');
if (token) {
  Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
