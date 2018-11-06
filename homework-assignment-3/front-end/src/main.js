const http = require('http')
const url = require('url')
const utils = require('./utils')

const server = http.createServer(async (request, response) => {
  const path = url.parse(request.url, true).pathname
  const method = request.method

  console.log({ path, method })

  // If the method is GET and the path ends with a file extension, try to serve a static asset
  if (method === 'GET' && /\/.+\.\w+$/.test(path)) {
    try {
      const file = await utils.getStaticFile(path)
      const fileExtension = utils.getFileExtensionFromPath(path)
      const contentType = utils.getContentTypeByExtension(fileExtension)
      response.writeHead(200, { 'Content-Type': contentType })
      return response.end(file)
    } catch (err) {
      console.log(err)
      response.writeHead(404)
      return response.end()
    }
  }

  // If the method is GET and the path is to a directory, search for an index.html file in the directory root
  if (method === 'GET' && !/\/.+\.\w+$/.test(path)) {
    try {
      const fullpath = path + '/index.html'
      const file = await utils.getStaticFile(fullpath)
      const contentType = utils.getContentTypeByExtension('html')
      response.writeHead(200, { 'Content-Type': contentType })
      return response.end(file)
    } catch (err) {
      console.log(err)
      response.writeHead(404)
      return response.end()
    }
  }

  // Every other request is a 404
  response.writeHead(404)
  return response.end()
})

server.listen(4200, () => {
  console.log(`Server listening on localhost:4200`)
})
