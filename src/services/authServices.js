import Axios from 'axios';

const url = "https://pvb-backend.azurewebsites.net";

export default {
  async login(userData) {
    return Axios({
        url: url + '/api/user/login',
        data: userData,
        method: 'POST'
      })
      .then(resp => resp.data)
  },
  async googleLogin(authCode) {
    return Axios({
        url: url + "/api/user/googleLogin",
        data: authCode,
        method: "POST"
      })
      .then(resp => resp.data)
  },
  async register(userData) {
    return Axios({
        url: url + '/api/user/register',
        data: userData,
        method: 'POST'
      })
      .then(resp => resp.data)
  }
};