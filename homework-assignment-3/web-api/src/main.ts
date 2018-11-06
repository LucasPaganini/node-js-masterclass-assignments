import * as http from 'http'
import * as url from 'url'
import * as handlers from './server/handlers'

const server = http.createServer((request, response) => {
  const path = url.parse(request.url, true).pathname
  const method = request.method

  // Set CORS
  response.setHeader('Access-Control-Allow-Origin', '*')
  response.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )

  console.log({ path, method })

  const handler = Object.values(handlers).find(
    h =>
      // Same method
      method === h.method &&
      // Route is string and it's equal or is RegExp and matches
      ((typeof h.route === 'string' && path === h.route) ||
        (h.route instanceof RegExp && h.route.test(path))),
  )

  if (handler) handler.handle(request, response)
  else {
    response.writeHead(404, {
      'Content-Type': 'application/json',
    })
    response.end(JSON.stringify({ errors: [{ message: 'Page not found.' }] }))
  }
})

server.listen(3000, () => {
  console.log(`Server listening on localhost:3000`)
})
