import { writeFile } from 'fs'
import { generateUserID } from '../generateUserID'
import { USERS_DB_PATH } from '../USERS_DB_PATH'
import { UserData } from '../UserData'
import { User } from '../User'

export const createUser = async (data: UserData): Promise<User> => {
  const id = await generateUserID()
  const newUser: User = { ...data, id }
  const fileData = JSON.stringify(newUser)
  const fullPath = `${USERS_DB_PATH}/${id}.json`

  return new Promise<User>((resolve, reject) => {
    writeFile(fullPath, fileData, err => {
      if (err) reject(err)
      resolve(newUser)
    })
  })
}
