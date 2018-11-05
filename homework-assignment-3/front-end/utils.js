const path = require('path')
const fs = require('fs')

/**
 * Path to the generated code/assets directory.
 *
 * @constant
 */
const DIST_PATH = path.join(__dirname, 'dist')

/**
 * Contents of the index file of the SPA.
 *
 * @constant
 */
const APP_INDEX = fs.readFileSync(path.join(DIST_PATH, 'index.html')).toString()

/**
 * Get the contents of a static file
 *
 * @param {string} filepath Path to the file relative to /dist
 * @returns {Promise<string>} The file data
 */
const getStaticFile = async filepath => {
  if (typeof filepath !== 'string')
    throw new Error(`Invalid filepath "${filepath}"`)

  const fullpath = path.join(DIST_PATH, filepath)
  return new Promise((resolve, reject) => {
    fs.readFile(fullpath, (err, data) => {
      if (err) reject(err)
      else resolve(data.toString())
    })
  })
}

/**
 * Returns the correct Content-Type header according to the file extension passed.
 *
 * @param {string} extension The file extension
 * @returns {string} The respective Content-Type header
 */
const getContentTypeByExtension = extension => {
  const map = {
    css: 'text/css; charset=UTF-8',
    js: 'application/javascript; charset=UTF-8',
    ico: 'image/x-icon',
    txt: 'text/plain; charset=UTF-8',
  }
  const contentType = map[extension]
  if (contentType === undefined)
    throw new Error(`No Content-Type found for extension "${extension}"`)
  return contentType
}
/**
 * Extract the file extension from its path string.
 *
 * @param {string} path Path to the file
 * @returns {string} File extension
 */
const getFileExtensionFromPath = path => {
  const filename = path.split('/').reverse()[0]
  const extension = filename.split('.').reverse()[0]
  return extension
}

module.exports = {
  DIST_PATH,
  APP_INDEX,
  getStaticFile,
  getContentTypeByExtension,
  getFileExtensionFromPath,
}
