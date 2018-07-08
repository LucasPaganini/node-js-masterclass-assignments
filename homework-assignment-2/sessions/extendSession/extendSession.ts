import { Session } from '../Session'
import { SESSION_DURATION } from '../SESSION_DURATION'
import { SESSIONS_DB_PATH } from '../SESSIONS_DB_PATH'
import { writeFile } from 'fs'

export const extendSession = async (session: Session): Promise<Session> => {
  const updatedExpiration = Date.now() + SESSION_DURATION
  const extendedSession: Session = { ...session, expiration: updatedExpiration }
  const fileData = JSON.stringify(extendedSession)
  const fullPath = `${SESSIONS_DB_PATH}/${session.token}.json`

  return new Promise<Session>((resolve, reject) => {
    writeFile(fullPath, fileData, err => {
      if (err) reject(err)
      resolve(extendedSession)
    })
  })
}
