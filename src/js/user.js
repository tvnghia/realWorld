import repoFactories from './axiosRepo/repoFactories'
const userApi = repoFactories.get('user')

const infoLocal = JSON.parse(localStorage.info)

// get user
export const getUser = () => {
  if (localStorage.info) {
    if (document.querySelector('.regis')) {
      document.querySelector('.regis').addEventListener('click', e => {
        e.preventDefault()

        return userApi.currentUser()
          .then(res => {
            window.location = 'profile.html'
          })
          .catch(err => { throw err })
      })
    }
  }
}

// Update user
export const updateUser = () => {
  if (document.querySelector('.btn-update-user')) {
    document.querySelector('.btn-update-user').addEventListener('click', e => {
      e.preventDefault()

      return userApi.updateUser({
        user: {
          email: document.querySelector('.input-email').value,
          bio: document.querySelector('.input-bio').value,
          username: document.querySelector('.input-user-name').value,
          password: document.querySelector('.input-password').value,
          image: document.querySelector('.input-img').value
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
      if (infoLocal.image) {
        document.querySelector('.user-img').setAttribute('src', infoLocal.image)
      } else {
        document.querySelector('.user-img').setAttribute('src', localStorage.image)
      }
      if (document.querySelector('.name-user')) {
        document.querySelector('.name-user').innerHTML = infoLocal.username
      }
      if (document.querySelector('.bio')) {
        document.querySelector('.bio').innerHTML = infoLocal.bio
      }
    }
  }
}
