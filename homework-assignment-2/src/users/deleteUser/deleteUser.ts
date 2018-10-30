import { unlink } from 'fs'
import { USERS_DB_PATH } from '../USERS_DB_PATH'
import { listUsersIDs } from '../listUsersIDs'

export const deleteUser = async (userID: string): Promise<void> => {
  const usersIDs = new Set(await listUsersIDs())
  if (!usersIDs.has(userID))
    throw new Error(`No user found with the id "${userID}"`)

  const fullPath = `${USERS_DB_PATH}/${userID}.json`
  return new Promise<void>((resolve, reject) => {
    unlink(fullPath, err => {
      if (err) reject(err)
      resolve()
    })
  })
}
