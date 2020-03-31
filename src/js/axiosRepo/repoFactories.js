import articlesRepository from './repositories/articlesRepository'
import profilesRepository from './repositories/profilesRepository'
import usersRepository from './repositories/usersRepository'
import userRepository from './repositories/userRepository'
import tagsRepository from './repositories/tagsRepository'

const repositories = {
  articles: articlesRepository,
  profiles: profilesRepository,
  users: usersRepository,
  user: userRepository,
  tags: tagsRepository
}

export default {
  get (name) {
    return repositories[name]
  }
}
