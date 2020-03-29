import axios from 'axios'
import { favorBtn, unfavorBtn } from './article'
axios.defaults.baseURL = 'https://conduit.productionready.io/api'
axios.defaults.headers.common.Authorization = 'Token ' + JSON.parse(localStorage.info).token

// Event signup
export const signUp = () => {
  if (document.querySelector('.sign-up')) {
    document.querySelector('.sign-up').addEventListener('click', e => {
      e.preventDefault()
      console.log('adwjndj')
      return axios({
        method: 'post',
        url: '/users',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        data: {
          user: {
            username: document.querySelector('.name').value,
            email: document.querySelector('.email').value,
            password: document.querySelector('.pass').value
          }
        }
      })
        .then(res => {
          localStorage.setItem('info', JSON.stringify(res.data.user))
          localStorage.setItem('image', 'https://static.productionready.io/images/smiley-cyrus.jpg')
          window.location = 'index.html'
        })
        .catch(err => {
          const arr = err.response.data.errors

          // Name
          if (arr.username) {
            let text = ''
            arr.username.map(item => {
              text += `<p class='err-username'>Username ${item}</p>`
              document.querySelector('.error-username').innerHTML = text
            })
          } else {
            document.querySelectorAll('.err-username').forEach(err => {
              err.remove()
            })
          }

          // Email
          if (arr.email) {
            let text = ''
            arr.email.map(item => {
              text += `<li class='err-email'>Email ${item}</li>`
              document.querySelector('.error-email').innerHTML = text
            })
          } else {
            document.querySelectorAll('.err-email').forEach(err => {
              err.remove()
            })
          }

          // Password
          if (arr.password) {
            let text = ''
            arr.password.map(item => {
              text += `<li class='err-password'>Password ${item}</li>`
              document.querySelector('.error-password').innerHTML = text
            })
          } else {
            document.querySelectorAll('.err-password').forEach(err => {
              err.remove()
            })
          }
        })
    })
  }
}

// Check token
export const checkUser = () => {
  if (localStorage.info) {
    document.querySelector('.regis').innerHTML = JSON.parse(localStorage.info).username
    document.querySelector('.regis').setAttribute('href', 'profile.html')
    document.querySelector('.post-new-article').parentNode.classList.remove('hidden')
  } else {
    document.querySelector('.post-new-article').parentNode.classList.add('hidden')
    document.querySelector('.setting').innerHTML = 'Sign in'
    document.querySelector('.setting').setAttribute('href', 'login.html')
  }
}

// Login
export const loGin = () => {
  if (document.querySelector('.sign-in')) {
    document.querySelector('.sign-in').addEventListener('click', e => {
      e.preventDefault()
      return axios({
        method: 'post',
        url: '/users/login',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        data: {
          user: {
            email: document.querySelector('.email').value,
            password: document.querySelector('.pass').value
          }
        }
      })
        .then(res => {
          localStorage.setItem('info', JSON.stringify(res.data.user))
          localStorage.setItem('image', 'https://static.productionready.io/images/smiley-cyrus.jpg')
          window.location = 'index.html'
        })
        .catch(err => { throw err })
    })
  }
}

// Update user
export const updateUser = () => {
  if (document.querySelector('.btn-update-user')) {
    document.querySelector('.btn-update-user').addEventListener('click', e => {
      e.preventDefault()
      return axios({
        method: 'put',
        url: '/user',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        data: {
          user: {
            email: document.querySelector('.input-email').value,
            bio: document.querySelector('.input-bio').value,
            username: document.querySelector('.input-user-name').value,
            password: document.querySelector('.input-password').value,
            image: document.querySelector('.input-img').value
          }
        }
      })
        .then(res => {
          localStorage.setItem('info', JSON.stringify(res.data.user))
          window.location = 'profile.html'
        })
        .catch(err => { throw err })
    })
  }
}

// Show new user after PUT
export const newUser = () => {
  if (localStorage.info) {
    if (document.querySelector('.user-img')) {
      if (JSON.parse(localStorage.info).image) {
        document.querySelector('.user-img').setAttribute('src', JSON.parse(localStorage.info).image)
      } else {
        document.querySelector('.user-img').setAttribute('src', localStorage.image)
      }
      if (document.querySelector('.name-user')) {
        document.querySelector('.name-user').innerHTML = JSON.parse(localStorage.info).username
      }
      if (document.querySelector('.bio')) {
        document.querySelector('.bio').innerHTML = JSON.parse(localStorage.info).bio
      }
    }
  }
}

// List Article
export const listArticle = () => {
  const urlString = new URLSearchParams(window.location.search)
  // Get article in homepage
  if (document.querySelector('.home-page')) {
    // Get article in local feed
    if (!window.location.search) {
      return axios({
        method: 'get',
        url: '/articles?offset=0&limit=100',
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
          favorBtn()
          unfavorBtn()
        })
        .catch(err => { throw err })
    } else if (urlString.has('tag')) { // Get article filter by tag
      return axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        url: `/articles?tag=${urlString.get('tag')}`
      })
        .then(res => {
          let text = ''
          res.data.articles.map(item => {
            // Check img
            if (!item.author.image) {
              item.author.image = localStorage.image
            }
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
          favorBtn()
          unfavorBtn()
        })
        .catch(err => { throw err })
    }
  } else if (document.querySelector('.profile-page')) {
    // Get article's User in profile page
    if (!window.location.search) {
      return axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        url: `/articles?author=${JSON.parse(localStorage.info).username}`
      })
        .then(res => {
          let text = ''
          res.data.articles.map(item => {
            // Check img
            if (!item.author.image) {
              item.author.image = localStorage.image
            }
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
          // Set Href for toggle favorite
          document.querySelector('.toggle-favor').setAttribute('href', `profile.html?favor=${JSON.parse(localStorage.info).username}`)

          favorBtn()
          unfavorBtn()
        })
        .catch(err => { throw err })
    } else if (urlString.has('author')) { // Get article's Author filter by author
      return axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        url: `/articles?author=${urlString.get('author')}`
      })
        .then(res => {
          let text = ''
          res.data.articles.map(item => {
            // Check img
            if (!item.author.image) {
              item.author.image = localStorage.image
            }
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
          // Set href for toggle favorite
          document.querySelector('.toggle-favor').setAttribute('href', `profile.html?favor=${JSON.parse(localStorage.profile).username}`)

          favorBtn()
          unfavorBtn()
        })
        .catch(err => { throw err })
    }
  }
}

// get article's user by favorite
export const favorArt = () => {
  const urlString = new URLSearchParams(window.location.search)
  const profileLocal = JSON.parse(localStorage.profile).username
  const infoLocal = JSON.parse(localStorage.info).username

  if (document.querySelector('.profile-page') && urlString.has('favor')) {
    if (urlString.get('favor') === profileLocal) {
      console.log('sa')
      return axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        url: `/articles?favorited=${profileLocal}`
      })
        .then(res => {
          console.log(res)
          let text = ''
          res.data.articles.map(item => {
            // Check img
            if (!item.author.image) {
              item.author.image = localStorage.image
            }
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
          document.querySelector('.toggle-favor').classList.add('active')
          document.querySelector('.toggle-art').setAttribute('href', `profile.html?author=${profileLocal}`)
          document.querySelector('.toggle-art').classList.remove('active')

          favorBtn()
          unfavorBtn()
        })
        .catch(err => { throw err })
    } else if (urlString.get('favor') === infoLocal) {
      return axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        url: `/articles?favorited=${JSON.parse(localStorage.info).username}`
      })
        .then(res => {
          console.log(res)
          document.querySelector('.toggle-favor').classList.add('active')
          document.querySelector('.toggle-art').classList.remove('active')
          document.querySelector('.toggle-art').setAttribute('href', 'profile.html')
          if (res.data.articles.length === 0) {
            document.querySelector('.list-article').innerHTML = 'No acticles here........'
          } else {
            let text = ''
            res.data.articles.map(item => {
              // Check img
              if (!item.author.image) {
                item.author.image = localStorage.image
              }
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
          }

          favorBtn()
          unfavorBtn()
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  }
}

// List tag
export const listTag = () => {
  if (document.querySelector('.home-page')) {
    const urlString = new URLSearchParams(window.location.search)
    if (!window.location.search || urlString.has('tag')) {
      return axios({
        method: 'get',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        url: '/tags'
      })
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

// Get profile
export const getProfile = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('author')) {
    return axios({
      method: 'get',
      url: '/profiles/' + urlString.get('author'),
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      }
    })
      .then(res => {
        document.querySelector('.user-img').setAttribute('src', res.data.profile.image)
        document.querySelector('.name-user').innerHTML = res.data.profile.username
        document.querySelector('.bio').innerHTML = res.data.profile.bio
        const infoLocal = JSON.parse(localStorage.info)
        if (res.data.profile.username !== infoLocal.username) {
          document.querySelector('.btn-edit').classList.add('hidden')
          document.querySelector('.btn-follow').classList.remove('hidden')
          document.querySelector('.btn-follow').innerHTML = `
          <i class="ion-plus-round"></i> &nbsp;Follow ${res.data.profile.username}
          `
        }
        // Local Storage username to folow method
        localStorage.setItem('profile', JSON.stringify(res.data.profile))

        // btn-follow and btn-unfollow
        const profileLocal = JSON.parse(localStorage.profile).following
        if (profileLocal) {
          document.querySelectorAll('.btn-follow').forEach(btn => {
            btn.classList.add('hidden')
          })
          document.querySelectorAll('.btn-unfollow').forEach(btn => {
            btn.classList.remove('hidden')
          })
        }
      })
      .catch(err => { throw err })
  }
}

// get user
export const getUser = () => {
  if (localStorage.info) {
    document.querySelector('.regis').addEventListener('click', e => {
      e.preventDefault()
      return axios({
        method: 'get',
        url: '/user',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        }
      })
        .then(res => {
          window.location = 'profile.html'
        })
        .catch(err => { throw err })
    })
  }
}

// show user
export const showUser = () => {
  if (localStorage.info) {
    if (document.querySelector('.user-img')) {
      if (!JSON.parse(localStorage.info).image) {
        document.querySelector('.user-img').setAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg')
      } else {
        document.querySelector('.user-img').setAttribute('src', JSON.parse(localStorage.info).image)
      }
      if (document.querySelector('.name-user')) {
        document.querySelector('.name-user').innerHTML = JSON.parse(localStorage.info).username
      }
      if (document.querySelector('.bio')) {
        document.querySelector('.bio').innerHTML = JSON.parse(localStorage.info).bio
      }
      if (document.querySelector('.btn-follow')) {
        document.querySelector('.btn-follow').classList.add('hidden')
      }
    }
  }
}

// Get article
export const getArticle = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('feed')) {
    return axios({
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      url: '/articles/' + urlString.get('feed')
    })
      .then(res => {
        // Check img ''
        if (!res.data.article.author.image) {
          res.data.article.author.image = localStorage.image
        }
        localStorage.setItem('slug', res.data.article.slug)
        document.querySelector('.title').innerHTML = res.data.article.title
        document.querySelectorAll('.article-img').forEach(e => {
          e.setAttribute('href', `profile.html?author=${res.data.article.author.username}`)
        })

        document.querySelectorAll('.author-img').forEach(e => {
          e.setAttribute('src', res.data.article.author.image)
        })

        document.querySelectorAll('.author').forEach(e => {
          e.innerHTML = res.data.article.author.username
          e.setAttribute('href', `profile.html?author=${res.data.article.author.username}`)
        })
        document.querySelector('.comment-author-img').setAttribute('src', res.data.article.author.image)

        document.querySelectorAll('.btn-follow-art').forEach(e => {
          e.innerHTML = `
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow ${res.data.article.author.username} <span class="counter">(10)</span>
          `
        })
        document.querySelector('.article-body').innerHTML = res.data.article.body

        // Check who's article
        const infoLocal = JSON.parse(localStorage.info).username
        if (res.data.article.author.username === infoLocal) {
          document.querySelectorAll('.btn-follow-art').forEach(btn => {
            // btn.closest('a').setAttribute('href', 'create-edit-article.html?edit')
            btn.classList.add('hidden')
          })
          document.querySelectorAll('.btn-favor').forEach(btn => {
            btn.classList.add('hidden')
          })
        } else {
          document.querySelectorAll('.btn-del-art').forEach(btn => {
            btn.classList.add('hidden')
          })
          document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.classList.add('hidden')
          })
        }
        // Local storage username to follow method
        localStorage.setItem('profile', JSON.stringify(res.data.article.author))

        // btn-follow and btn-unfollow
        const profileLocal = JSON.parse(localStorage.profile).following
        if (profileLocal) {
          document.querySelectorAll('.btn-follow').forEach(btn => {
            btn.classList.add('hidden')
          })
          document.querySelectorAll('.btn-unfollow').forEach(btn => {
            btn.classList.remove('hidden')
          })
        }
      })
      .catch(err => {
        throw err
      })
  }
}

// Post comment
export const createCmt = () => {
  if (document.querySelector('.btn-post-cmt')) {
    document.querySelector('.btn-post-cmt').addEventListener('click', e => {
      e.preventDefault()
      document.querySelector('.btn-post-cmt').setAttribute('data-slug', `${localStorage.slug}`)
      return axios({
        method: 'post',
        url: '/articles/' + e.target.dataset.slug + '/comments',
        headers: {
          'Content-type': 'application/json; charset=utf-8'
        },
        data: {
          comment: {
            body: document.querySelector('.body-cmt').value
          }
        }
      })
        .then(res => {
          const text =
            `
              <div class="card">
                <div class="card-block">
                  <p class="card-text">${res.data.comment.body}</p>
                </div>
                <div class="card-footer">
                  <a href="profile.html?author=${JSON.parse(localStorage.info).username}" class="comment-author">
                    <img src="${localStorage.image}" class="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="profile.html?author=${JSON.parse(localStorage.info).username}" class="comment-author">${res.data.comment.author.username}</a>
                  <span class="date-posted">Dec 29th</span>
                  <span class="mod-options" data-user='${res.data.comment.author.username}'>
                    <i class="ion-edit"></i>
                    <i data-del=${res.data.comment.id} class="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            `
          document.querySelector('.list-comment').insertAdjacentHTML('afterbegin', text)
          document.querySelector('.body-cmt').value = ''

          // check src img
          if (JSON.parse(localStorage.info).image) {
            document.querySelector('.comment-author-img').setAttribute('src', JSON.parse(localStorage.info).image)
          }

          if (document.querySelector('.err-body')) {
            document.querySelector('.err-body').remove()
          }

          // Check icon Trash and Edit
          const infoLocal = JSON.parse(localStorage.info).username
          document.querySelectorAll('[data-user]').forEach(item => {
            if (item.dataset.user !== infoLocal) {
              item.classList.add('hidden')
            }
          })

          delCmt()
        })
        .catch(err => {
          if (err.response.data.errors.body) {
            let text = ''
            err.response.data.errors.body.map(item => {
              text += `<p class='err-body'>Comment ${item}</p>`
              document.querySelector('.error-body').innerHTML = text
            })
          }
        })
    })
  }
}

// Get comment
export const getComment = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('feed')) {
    return axios({
      method: 'get',
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      },
      url: '/articles/' + urlString.get('feed') + '/comments'
    })
      .then(res => {
        let text = ''
        res.data.comments.map(item => {
          text += `
            <div class="card">
              <div class="card-block">
                <p class="card-text">${item.body}</p>
              </div>
              <div class="card-footer">
                <a href="profile.html?author=${JSON.parse(localStorage.info).username}" class="comment-author">
                  <img src="${localStorage.image}" class="comment-author-img" />
                </a>
                &nbsp;
                <a href="profile.html?author=${JSON.parse(localStorage.info).username}"          class="comment-author commented">${item.author.username}</a>
                <span class="date-posted">Dec 29th</span>
                <span data-user='${item.author.username}' class="mod-options">
                  <i class="ion-edit"></i>
                  <i data-del=${item.id} class="ion-trash-a"></i>
                </span>
                </div>
            </div>
          `
          document.querySelector('.list-comment').innerHTML = text
          // check src img
          if (item.author.image) {
            document.querySelector('.comment-author-img').setAttribute('src', JSON.parse(localStorage.info).image)
          }
        })

        // Check icon Trash and Edit
        const infoLocal = JSON.parse(localStorage.info)
        document.querySelectorAll('[data-user]').forEach(item => {
          if (item.dataset.user !== infoLocal.username) {
            item.classList.add('hidden')
          }
        })

        delCmt()
      })
      .catch(err => { throw err })
  }
}

// Delete comment
export const delCmt = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('feed')) {
    document.querySelectorAll('.ion-trash-a').forEach(btn => {
      btn.addEventListener('click', e => {
        return axios({
          method: 'delete',
          headers: {
            'Content-type': 'application/json; charset=utf-8'
          },
          url: '/articles/' + urlString.get('feed') + '/comments/' + e.target.dataset.del
        })
          .then(res => {
            e.target.closest('.card').remove()
          })
          .catch(err => { throw err })
      })
    })
  }
}
