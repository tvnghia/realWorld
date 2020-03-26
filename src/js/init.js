import axios from 'axios'

axios.defaults.baseURL = 'https://conduit.productionready.io/api'

// Event signup
export const signUp = () => {
  if (document.querySelector('.sign-up')) {
    document.querySelector('.sign-up').addEventListener('click', e => {
      e.preventDefault()
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
          Authorization: 'Token ' + JSON.parse(localStorage.info).token,
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
          // localStorage.setItem('token', res.data.user.token)
          // localStorage.setItem('username', res.data.user.username)
          // localStorage.setItem('email', res.data.user.email)
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
  return axios({
    method: 'get',
    url: '/articles',
    headers: {
      'Content-type': 'application/json; charset=utf-8'
    }
  })
    .then(res => {
      let text = ''
      res.data.articles.map(item => {
        text += `
        <div class="article-preview">
          <div class="article-meta">
            <a href='/profile.html?exam=${item.author.username}'><img src="${item.author.image}" /></a>
            <div class="info">
              <a href='/profile.html?exam=${item.author.username}' data-article='${item.author.username}' class="author">${item.author.username}</a>
              <span class="date">January 20th</span>
            </div>
            <button class="btn btn-outline-primary btn-sm pull-xs-right">
              <i class="ion-heart"></i> 29
            </button>
          </div>
          <a href="article.html?feed=${item.slug}" class="preview-link">
            <h1>${item.title}</h1>
            <p>${item.slug}</p>
            <span>Read more...</span>
          </a>
        </div>
        `
        if (document.querySelector('.list-article')) {
          document.querySelector('.list-article').innerHTML = text
        }
      })
    })
    .catch(err => { throw err })
}

// Get profile
export const getProfile = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('exam')) {
    return axios({
      method: 'get',
      url: '/profiles/' + urlString.get('exam'),
      headers: {
        'Content-type': 'application/json; charset=utf-8'
      }
    })
      .then(res => {
        document.querySelector('.user-img').setAttribute('src', res.data.profile.image)
        document.querySelector('.name-user').innerHTML = res.data.profile.username
        document.querySelector('.bio').innerHTML = res.data.profile.bio
        document.querySelector('.btn-edit').classList.add('hidden')
        document.querySelector('.btn-follow').classList.remove('hidden')
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
          Authorization: 'Token ' + JSON.parse(localStorage.info).token,
          'Content-type': 'application/json; charset=utf-8'
        }
      })
        .then(res => {
          // localStorage.setItem('user', JSON.stringify(res.data.user))
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
        localStorage.setItem('slug', res.data.article.slug)
        document.querySelector('.title').innerHTML = res.data.article.title
        document.querySelectorAll('.article-img').forEach(e => {
          e.setAttribute('href', `profile.html?exam=${res.data.article.author.username}`)
        })

        document.querySelectorAll('.author-img').forEach(e => {
          e.setAttribute('src', res.data.article.author.image)
        })

        document.querySelectorAll('.author').forEach(e => {
          e.innerHTML = res.data.article.author.username
          e.setAttribute('href', `profile.html?exam=${res.data.article.author.username}`)
        })

        document.querySelectorAll('.btn-follow-art').forEach(e => {
          e.innerHTML = `
          <i class="ion-plus-round"></i>
          &nbsp;
          Follow ${res.data.article.author.username} <span class="counter">(10)</span>
          `
          document.querySelector('.article-body').innerHTML = res.data.article.body
        })

        // Check img
        const infoLocal = JSON.parse(localStorage.info)
        if (infoLocal.image) {
          document.querySelector('.comment-author-img').setAttribute('src', infoLocal.image
          )
        } else {
          document.querySelector('.comment-author-img').setAttribute('src', localStorage.getItem('image'))
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
          Authorization: 'Token ' + JSON.parse(localStorage.info).token,
          'Content-type': 'application/json; charset=utf-8'
        },
        data: {
          comment: {
            body: document.querySelector('.body-cmt').value
          }
        }
      })
        .then(res => {
          console.log(res)
          const text =
            `
              <div class="card">
                <div class="card-block">
                  <p class="card-text">${res.data.comment.body}</p>
                </div>
                <div class="card-footer">
                  <a href="profile.html?exam=${JSON.parse(localStorage.info).username}" class="comment-author">
                    <img src="${localStorage.image}" class="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="profile.html?exam=${JSON.parse(localStorage.info).username}" class="comment-author">${res.data.comment.author.username}</a>
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
                <a href="profile.html?exam=${JSON.parse(localStorage.info).username}" class="comment-author">
                  <img src="${localStorage.image}" class="comment-author-img" />
                </a>
                &nbsp;
                <a href="profile.html?exam=${JSON.parse(localStorage.info).username}"            class="comment-author commented">${item.author.username}</a>
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
            'Content-type': 'application/json; charset=utf-8',
            Authorization: 'Token ' + JSON.parse(localStorage.info).token
          },
          url: '/articles/' + urlString.get('feed') + '/comments/' + e.target.dataset.del
        })
          .then(res => {
            e.target.parentNode.parentNode.parentNode.remove()
          })
          .catch(err => { throw err })
      })
    })
  }
}
