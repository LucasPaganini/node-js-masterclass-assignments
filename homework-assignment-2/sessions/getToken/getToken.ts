import { IncomingMessage } from 'http'

export const getToken = (req: IncomingMessage): string => {
  // TODO: Look for the token if the body and in other headers
  if (typeof req.headers.authorization === 'string')
    return req.headers.authorization
}
