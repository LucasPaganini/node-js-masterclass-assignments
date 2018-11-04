import { Handler } from '../Handler'
import * as url from 'url'
import { deleteUser } from '../../../api/users'

/**
 * Server handler to delete a user.
 */
export const deleteUserHandler: Handler = {
  route: /^\/user\/\w+$/, // /user/:id
  method: 'DELETE',
  handle: async (req, res) => {
    try {
      // TODO: Add authentication

      // Parse route parameters
      const route = url.parse(req.url, true).pathname
      const regex = /^\/user\/(\w+)$/
      const [_, userID] = regex.exec(route)

      // Delete the user
      await deleteUser(userID)

      // Response
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ data: { message: 'User deleted' } }))
    } catch (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({ errors: [{ message: 'Could not delete the user.' }] }),
      )
    }
  },
}
