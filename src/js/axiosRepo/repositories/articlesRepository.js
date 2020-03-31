// articlesRepository
import repository from '../repository'

const resource = '/articles'

export default {
  getListArt () {
    return repository('GET', `${resource}`)
  },
  getArtbyslug (slug) {
    return repository('GET', `${resource}/${slug}`)
  },
  getbyTag (tag) {
    return repository('GET', `${resource}?tag=${tag}`)
  },
  getbyAuthor (author) {
    return repository('GET', `${resource}?author=${author}`)
  },
  getbyFavor (name) {
    return repository('GET', `${resource}?favorited=${name}`)
  },
  getonFeed () {
    return repository('GET', `${resource}/feed?offset=0&limit=10`)
  },
  postNewArt (data) {
    return repository('POST', `${resource}`, data)
  },
  likeArt (slug) {
    return repository('POST', `${resource}/${slug}/favorite`)
  },
  editArt (slug, data) {
    return repository('PUT', `${resource}/${slug}`, data)
  },
  delArt (slug) {
    return repository('DELETE', `${resource}/${slug}`)
  },
  unlikeArt (slug) {
    return repository('DELETE', `${resource}/${slug}/favorite`)
  },
  getComment (slug) {
    return repository('GET', `${resource}/${slug}/comments`)
  },
  postComment (slug) {
    return repository('POST', `${resource}/${slug}/comments`)
  },
  delComment (slug, id) {
    return repository('DELETE', `${resource}/${slug}/comments/${id}`)
  }
}
