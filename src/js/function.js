const infoLocal = JSON.parse(localStorage.info)

// Check token
export const checkUser = () => {
  if (infoLocal.token) {
    document.querySelector('.regis').innerHTML = infoLocal.username
    document.querySelector('.regis').setAttribute('href', 'profile.html')
    document.querySelector('.post-new-article').parentNode.classList.remove('hidden')
    document.querySelector('.regis').classList.add('regis')
  } else {
    document.querySelector('.post-new-article').parentNode.classList.add('hidden')
    document.querySelector('.setting').innerHTML = 'Sign in'
    document.querySelector('.setting').setAttribute('href', 'login.html')
    document.querySelector('.regis').classList.remove('regis')
  }
}

// check to show user
export const showUser = () => {
  if (localStorage.info) {
    if (document.querySelector('.user-img')) {
      if (!infoLocal.image) {
        document.querySelector('.user-img').setAttribute('src', 'https://static.productionready.io/images/smiley-cyrus.jpg')
      } else {
        document.querySelector('.user-img').setAttribute('src', infoLocal.image)
      }
      if (document.querySelector('.name-user')) {
        document.querySelector('.name-user').innerHTML = infoLocal.username
      }
      if (document.querySelector('.bio')) {
        document.querySelector('.bio').innerHTML = infoLocal.bio
      }
      if (document.querySelector('.btn-follow')) {
        document.querySelector('.btn-follow').classList.add('hidden')
      }
    }
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
