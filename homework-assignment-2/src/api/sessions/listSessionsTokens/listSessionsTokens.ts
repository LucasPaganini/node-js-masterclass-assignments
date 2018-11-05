import { listDirectoryFiles, removeFileExtension } from '../../utils'
import { SESSIONS_DB_PATH } from '../SESSIONS_DB_PATH'

export const listSessionsTokens = async (): Promise<string[]> => {
  const files = await listDirectoryFiles(SESSIONS_DB_PATH)
  const jsonFiles = files.filter(f => f.endsWith('.json'))
  const tokens = jsonFiles.map(removeFileExtension)
  return tokens
}
