import { IncomingMessage, ServerResponse } from 'http'

export interface Handler {
  route: string | RegExp
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS'
  handle(req: IncomingMessage, res: ServerResponse): void
}
