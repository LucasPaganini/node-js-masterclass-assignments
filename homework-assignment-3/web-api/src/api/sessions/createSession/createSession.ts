import { Session } from '../Session'
import { SESSION_DURATION } from '../SESSION_DURATION'
import { SESSIONS_DB_PATH } from '../SESSIONS_DB_PATH'
import { generateToken } from '../generateToken'
import { writeFile } from 'fs'
import { getUser } from '../../users'
import { hashPassword } from '../../users/hashPassword'

export const createSession = async (
  userID: string,
  password: string,
): Promise<Session> => {
  const [user, hashPass] = await Promise.all([
    getUser(userID),
    hashPassword(password),
  ])
  if (user.hashedPassword !== hashPass) throw new Error('Wrong password')

  const session: Session = {
    userID,
    expiration: Date.now() + SESSION_DURATION,
    token: await generateToken(),
  }
  const fullPath = `${SESSIONS_DB_PATH}/${session.token}.json`
  const fileData = JSON.stringify(session)

  return new Promise<Session>((resolve, reject) => {
    writeFile(fullPath, fileData, err => {
      if (err) reject(err)
      resolve(session)
    })
  })
}
