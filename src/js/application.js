import { checkUser, signUp, loGin, updateUser, listArticle, getProfile, getUser, showUser, newUser, getArticle, createCmt } from './init'

window.addEventListener('DOMContentLoaded', function () {
  signUp()
  checkUser()
  loGin()
  updateUser()
  listArticle()
  getProfile()
  getUser()
  showUser()
  newUser()
  getArticle()
  createCmt()
})
