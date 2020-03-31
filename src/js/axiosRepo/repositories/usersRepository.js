import repository from '../repository'
const resource = 'users'

export default {
  signup (data) {
    return repository('POST', resource, data)
  },
  login (data) {
    return repository('POST', `${resource}/login`, data)
  }
}
