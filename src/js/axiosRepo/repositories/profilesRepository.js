// profilesRepository
import repository from '../repository'
const resource = 'profiles'

export default {
  getProfile (username) {
    return repository('GET', `${resource}/${username}`)
  },
  unfollowUser (username) {
    return repository('DELETE', `${resource}/${username}/follow`)
  },
  followUser (username, data) {
    return repository('POST', `${resource}/${username}/follow`, data)
  }
}
