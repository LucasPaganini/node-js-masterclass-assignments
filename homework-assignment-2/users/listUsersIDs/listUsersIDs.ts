import { readdir } from 'fs'
import { USERS_DB_PATH } from '../USERS_DB_PATH'

export const listUsersIDs = (): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    readdir(USERS_DB_PATH, (err, files) => {
      if (err) reject(err)
      const ids = files.map(file => file.split('.')[0])
      resolve(ids)
    })
  })
}
