import { Session } from '../Session'
import { SESSIONS_DB_PATH } from '../SESSIONS_DB_PATH'
import { validateSession } from '../validateSession'
import { readFile } from 'fs'

export const getSession = async (token: string): Promise<Session> => {
  const fullPath = `${SESSIONS_DB_PATH}/${token}.json`

  return new Promise<Session>((resolve, reject) => {
    readFile(fullPath, (err, data) => {
      if (err) reject(err)
      try {
        const maybeSession = JSON.parse('' + data)
        const session = validateSession(maybeSession)
        resolve(session)
      } catch (err) {
        reject(err)
      }
    })
  })
}
