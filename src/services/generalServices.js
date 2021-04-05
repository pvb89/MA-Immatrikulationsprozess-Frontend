import Axios from 'axios';

const url = "https://pvb-backend.azurewebsites.net";

export default {
  postCourseEntry(userData) {
    return Axios({
        url: url + '/api/course/entry',
        data: userData,
        method: 'POST'
      })
      .then(resp => resp.data)
  },
  postEducationCertificate(userData) {
    return Axios({
        url: url + '/api/course/postEducationCertificate',
        data: userData,
        method: 'POST'
      })
      .then(resp => resp.data)
  },
  getCourseEntrys() {
    return Axios({
        url: url + '/api/course/entry',
        method: 'GET',
      })
      .then(resp => resp.data.data)
  }
};