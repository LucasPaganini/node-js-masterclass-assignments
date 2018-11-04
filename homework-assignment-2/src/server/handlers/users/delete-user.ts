import { Handler } from '../Handler'
import * as url from 'url'
import { deleteUser } from '../../../api/users'
import { authenticateRequest } from '../../../api/sessions'
import { HTTPError } from '../../utils'

/**
 * Server handler to delete a user.
 */
export const deleteUserHandler: Handler = {
  route: /^\/user\/\w+$/, // /user/:id
  method: 'DELETE',
  handle: async (req, res) => {
    try {
      // Parse route parameters
      const route = url.parse(req.url, true).pathname
      const regex = /^\/user\/(\w+)$/
      const [_, userID] = regex.exec(route)

      // Authentication
      try {
        const session = await authenticateRequest(req)
        if (session.userID !== userID) throw new Error()
      } catch (err) {
        throw new HTTPError(401, 'Unauthorized')
      }

      // Delete the user
      await deleteUser(userID)

      // Response
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ data: { message: 'User deleted' } }))
    } catch (err) {
      if (err instanceof HTTPError) {
        res.writeHead(err.statusCode, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            errors: [{ message: err.userMessage }],
          }),
        )
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            errors: [{ message: 'Could not delete the user.' }],
          }),
        )
      }
    }
  },
}
