import { Handler } from '../Handler'
import * as url from 'url'
import { getUser } from '../../../api/users'

/**
 * Server handler to get a user data.
 */
export const getUserHandler: Handler = {
  route: /^\/user\/\w+$/, // /user/:id
  method: 'GET',
  handle: async (req, res) => {
    try {
      // TODO: Add authentication

      // Parse route parameters
      const route = url.parse(req.url, true).pathname
      const regex = /^\/user\/(\w+)$/
      const [_, userID] = regex.exec(route)

      // Get the user data
      const user = await getUser(userID)
      delete user.hashedPassword // Don't show sensible information

      // Response
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ data: { user } }))
    } catch (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({ errors: [{ message: 'Could not find the user.' }] }),
      )
    }
  },
}
