import Axios from 'axios';

// const camundaUrl = process.env.VUE_APP_CAMUNDA_URL + process.env.VUE_APP_PROCESS_ID + '/start';
const url = "https://pvb-backend.azurewebsites.net";

export default {
  prozessStarten(userData) {
    return Axios({
        url: url + '/api/camunda/startProcess',
        method: 'POST',
        data: userData,  
      })
      .then(
        resp => resp.data)
  }
};