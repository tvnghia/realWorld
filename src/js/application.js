import * as profile from './profile'
import * as art from './article'
import * as users from './users'
import * as functions from './function'
import * as user from './user'
import * as tag from './listtag'
window.addEventListener('DOMContentLoaded', function () {
  profile.getProfile()
  profile.unfollowUser()
  profile.logOut()
  profile.followUser()

  art.listArt()
  art.newArt()
  art.getArt()
  art.editArt()
  art.delArt()
  art.feedArt()
  art.favorArt()
  art.createCmt()
  art.getComment()

  users.signUp()
  users.loGin()

  functions.showUser()
  functions.checkPage()
  functions.checkUser()
  functions.newTag()
  functions.disableLink()

  user.getUser()
  user.updateUser()
  user.newUser()

  tag.listTag()
})
