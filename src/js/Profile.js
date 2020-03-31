import repoFactories from './axiosRepo/repoFactories'

import axios from 'axios'
import { rouTing } from './function'
const profileApi = repoFactories.get('profiles')

const infoLocal = JSON.parse(localStorage.info)
axios.defaults.baseURL = 'https://conduit.productionready.io/api'

// Get profile
export const getProfile = () => {
  const urlString = new URLSearchParams(window.location.search)
  if (urlString.has('author')) {
    return profileApi.getProfile(urlString.get('author'))
      .then(res => {
        console.log(res)
        document.querySelector('.user-img').setAttribute('src', res.data.profile.image)
        document.querySelector('.name-user').innerHTML = res.data.profile.username
        document.querySelector('.bio').innerHTML = res.data.profile.bio
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

// Unfollow user
export const unfollowUser = () => {
  if (document.querySelector('.btn-unfollow')) {
    document.querySelectorAll('.btn-unfollow').forEach(btn => {
      btn.addEventListener('click', e => {
        return profileApi.unfollowUser(JSON.parse(localStorage.profile).username)
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

// Logout
export const logOut = () => {
  if (document.querySelector('.btn-logout')) {
    document.querySelector('.btn-logout').addEventListener('click', e => {
      e.preventDefault()
      localStorage.setItem('info', JSON.stringify({}))
      rouTing('index.html')
    })
  }
}

// Follow users
export const followUser = () => {
  if (document.querySelector('.btn-follow')) {
    document.querySelectorAll('.btn-follow').forEach(btn => {
      btn.addEventListener('click', e => {
        return profileApi.followUser(JSON.parse(localStorage.profile).username, {
          profile: {
            username: JSON.parse(localStorage.profile).username,
            bio: JSON.parse(localStorage.profile).bio,
            image: JSON.parse(localStorage.profile).image,
            following: true
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
