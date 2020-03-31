import RepoFactories from './axiosRepo/repoFactories'
import { rouTing } from './function'
const artApi = RepoFactories.get('articles')
const infoLocal = JSON.parse(localStorage.info)

// List Article
export const listArt = () => {
  const urlString = new URLSearchParams(window.location.search)
  // Get article in homepage
  if (document.querySelector('.home-page')) {
    // Get article in local feed
    if (!window.location.search) {
      return artApi.getListArt()
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
              console.log('ads')
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
      return artApi.getbyTag(urlString.get('tag'))
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
      return artApi.getbyAuthor(infoLocal.username)
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
          document.querySelector('.toggle-favor').setAttribute('href', `profile.html?favor=${infoLocal.username}`)

          favorBtn()
          unfavorBtn()
        })
        .catch(err => { throw err })
    } else if (urlString.has('author')) { // Get article's Author filter by author
      return artApi.getbyAuthor(urlString.get('author'))
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
          document.querySelector('.toggle-favor').setAttribute('href', `profile.html?favor=${urlString.get('author')}`)

          favorBtn()
          unfavorBtn()
        })
        .catch(err => { throw err })
    }
  }
}

// New Article
export const newArt = () => {
  if (document.querySelector('.btn-init')) {
    document.querySelector('.btn-init').addEventListener('click', btn => {
      btn.preventDefault()
      const tagArr = []
      document.querySelectorAll('.ion-close-round').forEach(item => {
        tagArr.push(item.dataset.tag)
      })
      return artApi.postNewArt({
        article: {
          title: document.querySelector('.form-title').value,
          description: document.querySelector('.form-description').value,
          body: document.querySelector('.form-info').value,
          tagList: tagArr
        }
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('newart', JSON.stringify(res.data.article))
          rouTing(`article.html?feed=${JSON.parse(localStorage.newart).slug}`)
        })
        .catch(err => {
          console.log(err.response)
        })
    })
  }
}

// Get article
export const getArt = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('feed')) {
    return artApi.getArtbyslug(urlString.get('feed'))
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
        if (res.data.article.author.username === infoLocal.username) {
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

// Edit article
export const editArt = () => {
  if (document.querySelector('.btn-change')) {
    document.querySelector('.btn-change').addEventListener('click', btn => {
      btn.preventDefault()
      const tagArr = []
      document.querySelectorAll('.ion-close-round').forEach(item => {
        tagArr.push(item.dataset.tag)
      })
      return artApi.editArt(localStorage.slug, {
        article: {
          title: document.querySelector('.form-title').value,
          description: document.querySelector('.form-description').value,
          body: document.querySelector('.form-info').value,
          tagList: tagArr
        }
      })
        .then(res => {
          console.log(res)
          localStorage.setItem('newart', JSON.stringify(res.data.article))
          rouTing('index.html')
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
      btn.addEventListener('click', () => {
        return artApi.delArt(localStorage.slug)
          .then(res => {
            console.log(res)
            rouTing('index.html')
          })
          .catch(err => { throw err })
      })
    })
  }
}

// get article on your feed
export const feedArt = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('yourfeed')) {
    document.querySelector('.your-feed').classList.add('active')
    document.querySelector('.local-feed').classList.remove('active')

    return artApi.getonFeed()
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
      .catch(err => {
        console.log(err.response)
      })
  }
}

// get article's user by favorite
export const favorArt = () => {
  const urlString = new URLSearchParams(window.location.search)
  const profileLocal = JSON.parse(localStorage.profile).username

  if (document.querySelector('.profile-page') && urlString.has('favor')) {
    if (urlString.get('favor') === profileLocal) {
      return artApi.getbyFavor(profileLocal)
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
          document.querySelector('.name-user').innerHTML = urlString.get('favor')

          favorBtn()
          unfavorBtn()
        })
        .catch(err => { throw err })
    } else if (urlString.get('favor') === infoLocal.username) {
      // Get article that I like
      return artApi.getbyFavor(infoLocal.username)
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

// favor article
const favorBtn = () => {
  if (document.querySelector('.btn-favorite')) {
    document.querySelectorAll('.btn-favorite').forEach(btn => {
      btn.addEventListener('click', e => {
        return artApi.likeArt(e.target.dataset.slug)
          .then(res => {
            console.log(res)
            btn.nextElementSibling.querySelector('.counter').innerHTML = res.data.article.favoritesCount
            btn.classList.add('hidden')
            btn.nextElementSibling.classList.remove('hidden')
          })
          .catch(err => {
            console.log(err)
            rouTing('login.html')
          })
      })
    })
  }
}

// unfavorite art
const unfavorBtn = () => {
  if (document.querySelector('.btn-unfavorite')) {
    document.querySelectorAll('.btn-unfavorite').forEach(btn => {
      btn.addEventListener('click', e => {
        return artApi.unlikeArt(e.target.dataset.slug)
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

// Get comment
export const getComment = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('feed')) {
    // return axios({
    //   method: 'get',
    //   headers: {
    //     'Content-type': 'application/json; charset=utf-8',
    //     Authorization: 'Token ' + JSON.parse(localStorage.info).token
    //   },
    //   url: '/articles/' + urlString.get('feed') + '/comments'
    // })
    return artApi.getComment(urlString.get('feed'))
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

// Post comment
export const createCmt = () => {
  if (document.querySelector('.btn-post-cmt')) {
    document.querySelector('.btn-post-cmt').addEventListener('click', e => {
      e.preventDefault()
      document.querySelector('.btn-post-cmt').setAttribute('data-slug', `${localStorage.slug}`)
      return artApi.postComment(e.target.dataset.slug)
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

// Delete comment
const delCmt = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('feed')) {
    document.querySelectorAll('.ion-trash-a').forEach(btn => {
      btn.addEventListener('click', e => {
        // return axios({
        //   method: 'delete',
        //   headers: {
        //     'Content-type': 'application/json; charset=utf-8',
        //     Authorization: 'Token ' + JSON.parse(localStorage.info).token
        //   },
        //   url: '/articles/' + urlString.get('feed') + '/comments/' + e.target.dataset.del
        // })
        return artApi.delComment(urlString.get('feed'), e.target.dataset.del)
          .then(res => {
            e.target.closest('.card').remove()
          })
          .catch(err => { throw err })
      })
    })
  }
}
