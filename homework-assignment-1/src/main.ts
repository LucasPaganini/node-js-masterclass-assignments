import 'source-map-support/register'

import * as http from 'http'

import { PORT } from './constants'
import { getPath, setCommonHeaders } from './utils'

const server = http.createServer((req, res) => {
  const path = getPath(req)
  setCommonHeaders(res)

  switch (path) {
    case '/hello':
      res.writeHead(200)
      res.end(JSON.stringify({ data: 'Welcome!' }))
      break
    default:
      res.writeHead(404)
      res.end(JSON.stringify({ errors: [{ message: 'Invalid route.' }] }))
      break
  }
})

server.listen(PORT, _ => {
  console.log(`Server listening on port ${PORT}`)
})
