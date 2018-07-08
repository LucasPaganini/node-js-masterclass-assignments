import { SESSIONS_DB_PATH } from '../SESSIONS_DB_PATH'
import { unlink } from 'fs'

export const deleteSession = async (token: string): Promise<void> => {
  const fullPath = `${SESSIONS_DB_PATH}/${token}.json`

  return new Promise<void>((resolve, reject) => {
    unlink(fullPath, err => {
      if (err) reject(err)
      resolve()
    })
  })
}
