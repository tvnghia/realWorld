import axios from 'axios'

axios.defaults.baseURL = 'https://api.github.com'
axios.defaults.headers.common.Authorization = 'token '
// Get
export const getAllRepos = () => {
  return axios.get('/users/JVghiaTran/repos')
    .then(response => {
      let text = ''
      response.data.map(item => {
        text += `<div class='list'>
        <div data-repo='${item.name}' class='item'><p class='content'>${item.name}</p>
        <button data-repo="${item.name}" class='del'>X</button>
        </div>
        <input type='text' class='hidden replace' autofocus='true'>
        </div>
        `
      })
      document.querySelector('.view').innerHTML = text

      createBtn()
      editRepos()
    })
    .catch(error => { throw error })
}

// Post
export const postData = () => {
  return axios({
    method: 'post',
    url: 'user/repos',
    headers: {
      'Content-type': 'application/json'
    },
    data: {
      name: document.querySelector('#new-repo').value
    }
  })
    .then(response => {
      const newItem = document.createElement('DIV')
      const delButton = document.createElement('BUTTON')
      const text = document.createElement('P')
      const list = document.createElement('DIV')

      const replace = document.createElement('INPUT')
      replace.className = 'replace hidden'
      replace.type = 'text'
      replace.autofocus = 'true'

      newItem.appendChild(text)
      newItem.appendChild(delButton)
      list.appendChild(newItem)
      list.appendChild(replace)

      delButton.className = 'del'
      newItem.className = 'item'
      delButton.innerHTML = 'X'
      text.className = 'content'
      list.className = 'list'

      text.innerHTML = response.data.name
      const dataAtt = document.createAttribute('data-repo')
      const itemAtt = document.createAttribute('data-repo')

      itemAtt.value = text.innerHTML
      dataAtt.value = text.innerHTML
      delButton.setAttributeNode(dataAtt)
      newItem.setAttributeNode(itemAtt)
      document.querySelector('.view').insertAdjacentElement('afterbegin', list)
      document.querySelector('#new-repo').value = ''

      editRepos()
    })
    .catch(error => { throw error })
}
// click to post
export const createBtn = () => {
  document.querySelector('.btn').onclick = () => {
    postData()
  }
}

// Delete
export const delBtn = () => {
  const prt = document.querySelector('.view')
  prt.addEventListener('click', e => {
    if (e.target.classList.contains('del')) {
      return axios({
        method: 'delete',
        url: 'repos/JVghiaTran/' + e.target.dataset.repo,
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(response => {
          e.target.parentNode.parentNode.remove()
        })
        .catch(error => { throw error })
    }
  })
}

// Edit
export const editRepos = () => {
  document.querySelectorAll('.list').forEach(e => {
    e.ondblclick = () => {
      e.querySelector('.replace').value = e.querySelector('.content').innerHTML
      e.querySelector('.item').classList.add('hidden')
      e.querySelector('.replace').classList.remove('hidden')

      document.onclick = (div) => {
        if (div.target !== e.querySelector('.replace')) {
          if (e.querySelector('.replace').value === '') {
            return axios({
              method: 'delete',
              url: 'repos/JVghiaTran/' + e.querySelector('.item').dataset.repo,
              headers: {
                'Content-type': 'application/json'
              }
            })
              .then(res => {
                e.remove()
              })
              .catch(err => { throw err })
          } else {
            return axios({
              method: 'patch',
              url: 'repos/JVghiaTran/' + e.querySelector('.item').dataset.repo,
              headers: {
                'Content-type': 'application/json'
              },
              data: {
                name: e.querySelector('.replace').value
              }
            })
              .then(res => {
                e.querySelector('.replace').classList.add('hidden')
                e.querySelector('.item').classList.remove('hidden')
                e.querySelector('.content').innerHTML = res.data.name
              })
              .catch(err => { throw err })
          }
        }
      }

      e.querySelector('.replace').onkeypress = (x) => {
        if (x.which === 13 || x.keyCode === 13) {
          if (e.querySelector('.replace').value === '') {
            return axios({
              method: 'delete',
              url: 'repos/JVghiaTran/' + e.querySelector('.item').dataset.repo,
              headers: {
                'Content-type': 'application/json'
              }
            })
              .then(res => {
                e.remove()
              })
              .catch(err => { throw err })
          } else {
            return axios({
              method: 'patch',
              url: 'repos/JVghiaTran/' + e.querySelector('.item').dataset.repo,
              headers: {
                'Content-type': 'application/json'
              },
              data: {
                name: e.querySelector('.replace').value
              }
            })
              .then(res => {
                e.querySelector('.replace').classList.add('hidden')
                e.querySelector('.item').classList.remove('hidden')
                e.querySelector('.content').innerHTML = res.data.name
              })
              .catch(err => { throw err })
          }
        }
      }
    }
  })
}
