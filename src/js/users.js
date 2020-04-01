import repoFactories from './axiosRepo/repoFactories'
import { rouTing } from './function'
const usersApi = repoFactories.get('users')

// Signup
export const signUp = () => {
  if (document.querySelector('.sign-up')) {
    document.querySelector('.sign-up').addEventListener('click', e => {
      e.preventDefault()
      const error = document.querySelector('.error-username')
      const name = document.querySelector('.name')
      const email = document.querySelector('.email')
      const atPosition = email.value.indexOf('@')
      const emailStr = email.value.substr(0, atPosition)
      const dotPosition = email.value.lastIndexOf('.')
      const pass = document.querySelector('.pass')
      const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

      if (name.value === '' || email.value === '' || pass.value === '') {
        error.innerHTML = 'Username, email and password cant be blank'
        return false
      } else if (name.value.length < 8) {
        error.innerHTML = 'The username must be longer than 8 characters'
        return false
      } else if (atPosition < 1 || dotPosition < (atPosition + 2) || (dotPosition + 2) > email.value.length) {
        error.innerHTML = 'Email invalid'
        return false
      } else if (pass.value.length < 5) {
        error.innerHTML = 'Pass is too short'
        return false
      } else if (pass.value === name.value || pass.value === emailStr) {
        error.innerHTML = 'Pass donot same with Name or Email'
        return false
      } else if (!pass.value.match(pattern)) {
        error.innerHTML = 'PassW must contain at least one numeric digit, one uppercase and one lowercase letter'
        console.log('asd')
        return false
      } else {
        return usersApi.signup({
          user: {
            username: name.value,
            email: email.value,
            password: pass.value
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
      }
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
