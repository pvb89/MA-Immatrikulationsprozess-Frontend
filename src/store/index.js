import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const getDefaultState = () => {
  return {
    token: localStorage.getItem('token') || '',
    userId: localStorage.getItem('userId') || '',
    mail: localStorage.getItem('mail') || '',
    name: localStorage.getItem('name') || '',
    admin: JSON.parse(localStorage.getItem('admin')) || false
  };
};

export default new Vuex.Store({
  state: getDefaultState(),
  mutations: {
    loginSuccess: (state, { token, user, mail, name, admin }) => {
      state.token = token;
      state.userId = user;
      state.mail = mail;
      state.name = name;
      state.admin = admin;
    },
    defaultState: state => {
      Object.assign(state, getDefaultState());
    },
    setToken: state => {
      Axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
    },
    setName: (state, { name }) => {
      state.name = name;
    }
  },
  actions: {
    login: ({ commit }, { token, userId, mail, name, admin}) => {
      commit('loginSuccess', { token, userId, mail, name, admin});

      // Auth Header setzen
      Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Daten in localStorage laden
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('mail', mail);
      localStorage.setItem('name', name);
      localStorage.setItem('admin', admin);

    },
    logout: ({ commit }) => {      

      // Auth Header entfernen
      Axios.defaults.headers.common['Authorization'] = '';

      // Daten vom localStorage entfernen
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('mail');
      localStorage.removeItem('name');
      localStorage.removeItem('admin');
      
      commit('defaultState', '');
    },
    setToken: ({ commit }) => {
      commit('setToken');
    },
    setName: ({ commit }, { name})  => {
      commit('setName'), { name };
    }
  },
  getters: {
    getIdUser: state => state.userId,
    isLoggedIn: state => !!state.token,
    isAdmin: state => state.admin,
    getMailUser: state => state.mail,
    getNameUser: state => state.name,
  },
})