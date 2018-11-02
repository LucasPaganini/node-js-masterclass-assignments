import { IncomingMessage } from 'http'
import { getToken } from '../getToken'
import { getSession } from '../getSession'
import { sessionIsValid } from '../sessionIsValid'
import { Session } from '../Session'

export const authenticateRequest = async (
  req: IncomingMessage,
): Promise<Session> => {
  const token = getToken(req)
  const session = await getSession(token)
  if (!sessionIsValid(session)) throw new Error('This session has expired')
  return session
}
