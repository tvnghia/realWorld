import repoFactories from './axiosRepo/repoFactories'
const tagsApi = repoFactories.get('tags')

// List article by tag
export const listTag = () => {
  if (document.querySelector('.home-page')) {
    const urlString = new URLSearchParams(window.location.search)
    if (!window.location.search || urlString.has('tag')) {
      return tagsApi.getTags()
        .then(res => {
          let tag = ''
          res.data.tags.map(item => {
            tag += `
              <a href="index.html?tag=${item}" class="tag-pill tag-default">${item}</a>`
            document.querySelector('.tag-list').innerHTML = tag
          })
        })
        .catch(err => { throw err })
    }
  }
}
