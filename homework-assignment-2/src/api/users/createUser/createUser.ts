import { writeFile } from 'fs'
import { generateUserID } from '../generateUserID'
import { USERS_DB_PATH } from '../USERS_DB_PATH'
import { UserData } from '../UserData'
import { User } from '../User'
import { Omit } from '../../utils'
import { hashPassword } from '../hashPassword'
import { getUserByEmail } from '../getUserByEmail'

export const createUser = async (
  data: Omit<UserData, 'hashedPassword'> & { password: string },
): Promise<User> => {
  const emailIsBeingUsed = await getUserByEmail(data.email).then(
    () => true,
    () => false,
  )
  if (emailIsBeingUsed)
    throw new Error(`Email "${data.email}" is already being used`)

  const [id, hashedPassword] = await Promise.all([
    generateUserID(),
    hashPassword(data.password),
  ])

  const newUser = { ...data, id, hashedPassword }
  delete newUser.password

  const fileData = JSON.stringify(newUser)
  const fullPath = `${USERS_DB_PATH}/${id}.json`

  return new Promise<User>((resolve, reject) => {
    writeFile(fullPath, fileData, err => {
      if (err) reject(err)
      resolve(newUser)
    })
  })
}
