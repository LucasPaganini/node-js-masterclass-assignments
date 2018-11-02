import { Session } from '../Session'
import { SESSION_DURATION } from '../SESSION_DURATION'
import { SESSIONS_DB_PATH } from '../SESSIONS_DB_PATH'
import { generateToken } from '../generateToken'
import { writeFile } from 'fs'

export const createSession = async (userID: string): Promise<Session> => {
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
