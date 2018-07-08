import { USERS_DB_PATH } from '../USERS_DB_PATH'
import { listDirectoryFiles, removeFileExtension } from '../../utils'

export const listUsersIDs = async (): Promise<string[]> => {
  const files = await listDirectoryFiles(USERS_DB_PATH)
  const ids = files.map(removeFileExtension)
  return ids
}
