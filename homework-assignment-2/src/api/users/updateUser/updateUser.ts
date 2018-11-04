import { UserData } from '../UserData'
import { User } from '../User'
import { USERS_DB_PATH } from '../USERS_DB_PATH'
import { getUser } from '../getUser'
import { writeFile } from 'fs'
import { Omit } from '../../utils'
import { hashPassword } from '../hashPassword'

type Data = Partial<Omit<UserData, 'hashedPassword'> & { password: string }>

export const updateUser = async (
  userID: string,
  updatedData: Data,
): Promise<User> => {
  const user = await getUser(userID)

  if (updatedData.password) {
    const hashedPassword = await hashPassword(updatedData.password)
    ;(updatedData as UserData).hashedPassword = hashedPassword
    delete updatedData.password
  }

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
