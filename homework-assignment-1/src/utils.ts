import * as http from 'http'
import * as url from 'url'

export const getPath = (req: http.IncomingMessage) => url.parse(req.url).path

export const setCommonHeaders = (res: http.ServerResponse) => {
  const headers = {
    'Content-Type': 'application/json',
  }
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value))
}
