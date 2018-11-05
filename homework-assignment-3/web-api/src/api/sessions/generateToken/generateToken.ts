import { generateID } from '../../utils'
import { listSessionsTokens } from '../listSessionsTokens'

export const generateToken = async (): Promise<string> => {
  const TOKEN_LEN = 10
  let token = generateID(TOKEN_LEN)

  // Check if this token is already being used
  // Repeat the process until the generated token is unique
  const tokens = new Set(await listSessionsTokens())
  while (tokens.has(token)) token = generateID(TOKEN_LEN)

  return token
}
