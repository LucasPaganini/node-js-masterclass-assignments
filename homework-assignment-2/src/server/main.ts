import * as http from 'http'
import * as url from 'url'
import * as handlers from './handlers'

const server = http.createServer((request, response) => {
  const path = url.parse(request.url, true).path
  const method = request.method

  console.log({ path, method })

  const handler = Object.values(handlers).find(
    h =>
      // Same method
      method === h.method &&
      // Route is string and it's equal or is RegExp and matches
      ((typeof h.route === 'string' && path === h.route) ||
        (h.route as RegExp).test(path)),
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
