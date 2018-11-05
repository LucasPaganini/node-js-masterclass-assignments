import { USERS_DB_PATH } from '../USERS_DB_PATH'
import { listDirectoryFiles, removeFileExtension } from '../../utils'

export const listUsersIDs = async (): Promise<string[]> => {
  const files = await listDirectoryFiles(USERS_DB_PATH)
  const jsonFiles = files.filter(f => f.endsWith('.json'))
  const ids = jsonFiles.map(removeFileExtension)
  return ids
}
