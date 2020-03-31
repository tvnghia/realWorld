import repoFactories from './axiosRepo/repoFactories'
import { rouTing } from './function'
const usersApi = repoFactories.get('users')

// Signup
export const signUp = () => {
  if (document.querySelector('.sign-up')) {
    document.querySelector('.sign-up').addEventListener('click', e => {
      e.preventDefault()

      return usersApi.signup({
        user: {
          username: document.querySelector('.name').value,
          email: document.querySelector('.email').value,
          password: document.querySelector('.pass').value
        }
      })
        .then(res => {
          localStorage.setItem('info', JSON.stringify(res.data.user))
          localStorage.setItem('image', 'https://static.productionready.io/images/smiley-cyrus.jpg')
          rouTing('index.html')
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

// Login
export const loGin = () => {
  if (document.querySelector('.sign-in')) {
    document.querySelector('.sign-in').addEventListener('click', e => {
      e.preventDefault()

      return usersApi.login({
        user: {
          email: document.querySelector('.email').value,
          password: document.querySelector('.pass').value
        }
      })
        .then(res => {
          localStorage.setItem('info', JSON.stringify(res.data.user))
          localStorage.setItem('image', 'https://static.productionready.io/images/smiley-cyrus.jpg')
          rouTing('index.html')
        })
        .catch(err => { throw err })
    })
  }
}
