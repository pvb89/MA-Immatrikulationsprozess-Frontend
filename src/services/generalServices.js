import Axios from 'axios';

const url = "https://pvb-backend.azurewebsites.net";

export default {
  async postCourseEntry(userData) {
    return Axios({
        url: url + '/api/course/entry',
        data: userData,
        method: 'POST'
      })
      .then(resp => resp.data)
  },
  async postEducationCertificate(userData) {
    return Axios({
        url: url + '/api/course/postEducationCertificate',
        data: userData,
        method: 'POST'
      })
      .then(resp => resp.data)
  },
  async getCourseEntrys() {
    return Axios({
        url: url + '/api/course/entry',
        method: 'GET',
      })
      .then(resp => resp.data.data)
  }
};