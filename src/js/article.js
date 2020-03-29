import axios from 'axios'
axios.defaults.baseURL = 'https://conduit.productionready.io/api'
axios.defaults.headers.common.Authorization = 'Token ' + JSON.parse(localStorage.info).token

// New Article
export const newArt = () => {
  if (document.querySelector('.btn-init')) {
    document.querySelector('.btn-init').addEventListener('click', btn => {
      btn.preventDefault()
      const tagArr = []
      document.querySelectorAll('.ion-close-round').forEach(item => {
        tagArr.push(item.dataset.tag)
      })

      return axios({
        method: 'post',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        url: '/articles',
        data: {
          article: {
            title: document.querySelector('.form-title').value,
            description: document.querySelector('.form-description').value,
            body: document.querySelector('.form-info').value,
            tagList: tagArr
          }
        }
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('newart', JSON.stringify(res.data.article))
          window.location = `article.html?feed=${JSON.parse(localStorage.newart).slug}`
        })
        .catch(err => {
          console.log(err.response)
        })
    })
  }
}

// Enter to create taglist
export const newTag = () => {
  if (document.querySelector('.form-tags')) {
    document.querySelector('.form-tags').addEventListener('keypress', e => {
      if (e.keyCode === 13 || e.which === 13) {
        const vaLue = document.querySelector('.form-tags').value
        const text = `
          <span class="tag-default tag-pill">
            <i data-tag=${vaLue} class="ion-close-round"></i>
            ${vaLue}
          </span>
        `
        document.querySelector('.tag-list').insertAdjacentHTML('beforeend', text)
        document.querySelector('.form-tags').value = ''
      }
    })
  }
}

// CHeck page Edit and Create

export const checkPage = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('edit')) {
    document.querySelector('.btn-init').classList.add('hidden')
  } else {
    if (document.querySelector('.btn-change')) {
      document.querySelector('.btn-change').classList.add('hidden')
    }
  }
}

// Edit article
export const editArt = () => {
  if (document.querySelector('.btn-change')) {
    document.querySelector('.btn-change').addEventListener('click', btn => {
      btn.preventDefault()
      const tagArr = []
      document.querySelectorAll('.ion-close-round').forEach(item => {
        tagArr.push(item.dataset.tag)
      })
      return axios({
        method: 'put',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        url: '/articles/' + localStorage.slug,
        data: {
          article: {
            title: document.querySelector('.form-title').value,
            description: document.querySelector('.form-description').value,
            body: document.querySelector('.form-info').value,
            tagList: tagArr
          }
        }
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('newart', JSON.stringify(res.data.article))
          window.location = 'index.html'
        })
        .catch(err => {
          console.log(err.response)
        })
    })
  }
}

// Delete article
export const delArt = () => {
  if (document.querySelector('.btn-del-art')) {
    document.querySelectorAll('.btn-del-art').forEach(btn => {
      btn.addEventListener('click', e => {
        return axios({
          method: 'delete',
          url: '/articles/' + localStorage.slug,
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          }
        })
          .then(res => {
            console.log(res)
            window.location = 'index.html'
          })
          .catch(err => { throw err })
      })
    })
  }
}

// get article your feed
export const feedArt = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('yourfeed')) {
    document.querySelector('.your-feed').classList.add('active')
    document.querySelector('.local-feed').classList.remove('active')
    return axios({
      method: 'get',
      url: '/articles/feed?offset=0&limit=100',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      }
    })
      .then(res => {
        console.log(res)
        let text = ''
        res.data.articles.map(item => {
          // Check img
          if (!item.author.image) {
            item.author.image = localStorage.image
          }
          // Create tag
          let tag = ''
          item.tagList.map(x => {
            tag += `
              <li class="tag-default tag-pill tag-outline"><span>${x}</span></li>
            `
          })
          // Show favor or unfavor
          let btn = ''
          if (item.favorited) {
            btn = `
              <button data-slug=${item.slug} class="btn btn-outline-primary btn-sm pull-xs-right btn-favorite hidden">
                <i class="ion-heart"></i>
                <span class="counter">${item.favoritesCount}</span>
              </button>
              <button data-slug=${item.slug} class="btn btn-primary btn-sm pull-xs-right btn-unfavorite">
                <i class="ion-heart"></i>
                <span class="counter">${item.favoritesCount}</span>
              </button>
              
              `
          } else {
            btn = `
              <button data-slug=${item.slug} class="btn btn-outline-primary btn-sm pull-xs-right btn-favorite">
                <i class="ion-heart"></i>
                <span class="counter">${item.favoritesCount}</span>
              </button>
              <button data-slug=${item.slug} class="btn btn-primary btn-sm pull-xs-right btn-unfavorite hidden">
                <i class="ion-heart"></i>
                <span class="counter">${item.favoritesCount}</span>
              </button>
            `
          }
          text += `
          <div class="article-preview">
            <div class="article-meta">
              <a href='/profile.html?author=${item.author.username}'><img src="${item.author.image}" /></a>
              <div class="info">
                <a href='/profile.html?author=${item.author.username}' data-article='${item.author.username}' class="author">${item.author.username}</a>
                <span class="date">January 20th</span>
              </div>
              ${btn}
            </div>
            <a href="article.html?feed=${item.slug}" class="preview-link">
              <h1>${item.title}</h1>
              <p>${item.body}</p>
              <span>Read more...</span>
              <ul class="tag-list-art">
                  ${tag}
              </ul>
            </a>
          </div>
          `
          if (document.querySelector('.list-article')) {
            document.querySelector('.list-article').innerHTML = text
          }
        })
      })
      .catch(err => {
        console.log(err.response)
      })
  }
}

// Follow users
export const followUser = () => {
  if (document.querySelector('.btn-follow')) {
    document.querySelectorAll('.btn-follow').forEach(btn => {
      btn.addEventListener('click', e => {
        return axios({
          method: 'post',
          url: '/profiles/' + JSON.parse(localStorage.profile).username + '/follow',
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          },
          data: {
            profile: {
              username: JSON.parse(localStorage.profile).username,
              bio: JSON.parse(localStorage.profile).bio,
              image: JSON.parse(localStorage.profile).image,
              following: true
            }
          }
        })
          .then(res => {
            localStorage.setItem('profile', JSON.stringify(res.data.profile))
            document.querySelectorAll('.btn-follow').forEach(btn => {
              btn.classList.add('hidden')
            })
            document.querySelectorAll('.btn-unfollow').forEach(btn => {
              btn.classList.remove('hidden')
            })
          })
          .catch(err => { throw err })
      })
    })
  }
}

// Unfollow user
export const unfollowUser = () => {
  if (document.querySelector('.btn-unfollow')) {
    document.querySelectorAll('.btn-unfollow').forEach(btn => {
      btn.addEventListener('click', e => {
        return axios({
          method: 'delete',
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          },
          url: '/profiles/' + JSON.parse(localStorage.profile).username + '/follow'
        })
          .then(res => {
            localStorage.setItem('profile', JSON.stringify(res.data.profile))
            document.querySelectorAll('.btn-unfollow').forEach(btn => {
              btn.classList.add('hidden')
            })
            document.querySelectorAll('.btn-follow').forEach(btn => {
              btn.classList.remove('hidden')
            })
          })
          .catch(err => { throw err })
      })
    })
  }
}

// favor article
export const favorBtn = () => {
  if (document.querySelector('.btn-favorite')) {
    document.querySelectorAll('.btn-favorite').forEach(btn => {
      btn.addEventListener('click', e => {
        return axios({
          method: 'post',
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          },
          url: '/articles/' + e.target.dataset.slug + '/favorite',
          data: {
            favorited: true
          }
        })
          .then(res => {
            console.log(res)
            btn.nextElementSibling.querySelector('.counter').innerHTML = res.data.article.favoritesCount
            btn.classList.add('hidden')
            btn.nextElementSibling.classList.remove('hidden')
          })
      })
    })
  }
}

// unfavorite art
export const unfavorBtn = () => {
  if (document.querySelector('.btn-unfavorite')) {
    document.querySelectorAll('.btn-unfavorite').forEach(btn => {
      btn.addEventListener('click', e => {
        return axios({
          method: 'delete',
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          },
          url: '/articles/' + e.target.dataset.slug + '/favorite'
        })
          .then(res => {
            btn.classList.add('hidden')
            btn.previousElementSibling.classList.remove('hidden')
            btn.previousElementSibling.querySelector('.counter').innerHTML = res.data.article.favoritesCount
          })
          .catch(err => { throw err })
      })
    })
  }
}

// Logout
export const logOut = () => {
  if (document.querySelector('.btn-logout')) {
    document.querySelector('.btn-logout').addEventListener('click', e => {
      e.preventDefault()
      localStorage.removeItem('info')
      window.location = 'index.html'
    })
  }
}
