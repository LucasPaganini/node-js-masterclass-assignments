import { UserData } from '../UserData'
import { User } from '../User'
import { USERS_DB_PATH } from '../USERS_DB_PATH'
import { getUser } from '../getUser'
import { writeFile } from 'fs'

export const updateUser = async (
  userID: string,
  updatedData: UserData,
): Promise<User> => {
  const user = await getUser(userID)
  const updatedUser = { ...user, ...updatedData }
  const fileData = JSON.stringify(updatedUser)
  const fullPath = `${USERS_DB_PATH}/${userID}.json`

  return new Promise<User>((resolve, reject) => {
    writeFile(fullPath, fileData, err => {
      if (err) reject(err)
      resolve(updatedUser)
    })
  })
}
