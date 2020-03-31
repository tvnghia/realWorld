import axios from 'axios'
const baseDomain = 'https://conduit.productionready.io/api'
axios.defaults.baseURL = baseDomain

const infoLocal = JSON.parse(localStorage.info)
if (infoLocal.token) {
  axios.defaults.headers.common.Authorization = 'Token ' + infoLocal.token
}

export default (method, resource, data = null) => {
  return axios({
    method,
    url: resource,
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    },
    data
  })
}
