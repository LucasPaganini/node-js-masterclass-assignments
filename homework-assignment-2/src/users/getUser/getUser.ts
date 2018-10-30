import { listUsersIDs } from '../listUsersIDs'
import { USERS_DB_PATH } from '../USERS_DB_PATH'
import { validateUser } from '../validateUser'
import { User } from '../User'
import { readFile } from 'fs'

export const getUser = async (userID: string): Promise<User> => {
  const usersIDs = new Set(await listUsersIDs())
  if (!usersIDs.has(userID))
    throw new Error(`No user found with the id "${userID}"`)

  const fullPath = `${USERS_DB_PATH}/${userID}.json`
  return new Promise<User>((resolve, reject) => {
    readFile(fullPath, (err, data) => {
      if (err) reject(err)
      try {
        const maybeUser = JSON.parse('' + data)
        const user = validateUser(maybeUser)
        resolve(user)
      } catch (err) {
        reject(err)
      }
    })
  })
}
