import repository from '../repository'
const resource = 'tags'

export default {
  getTags () {
    return repository('GET', resource)
  }
}
