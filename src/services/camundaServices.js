import Axios from 'axios';

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
  },
  async triggerProcess(courseEntryId) {
    return Axios({
        url: url + '/api/camunda/triggerProcess',
        method: 'POST',
        data: {
          id: courseEntryId
        },  
      })
      .then(
        resp => resp.data)
  }
};