import repository from '../repository'
const resource = 'user'

export default {
  currentUser () {
    return repository('GET', resource)
  },
  updateUser (data) {
    return repository('PUT', resource, data)
  }
}
