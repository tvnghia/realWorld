import { checkUser, signUp, loGin, updateUser, listArticle, getProfile, getUser, showUser, newUser, getArticle, createCmt, getComment } from './init'

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
  getComment()
})
