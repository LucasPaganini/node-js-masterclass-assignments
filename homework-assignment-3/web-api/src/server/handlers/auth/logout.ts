import { Handler } from '../Handler'
import { HTTPError } from '../../utils'
import {
  authenticateRequest,
  Session,
  deleteSession,
} from '../../../api/sessions'

/**
 * Server handler to delete a user token (logout).
 */
export const logoutHandler: Handler = {
  route: '/auth',
  method: 'DELETE',
  handle: async (req, res) => {
    try {
      // Authentication
      let session: Session
      try {
        session = await authenticateRequest(req)
      } catch (err) {
        throw new HTTPError(401, 'Unauthorized')
      }

      // Delete the session
      await deleteSession(session.token)

      // Response
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          data: { message: 'Session deleted.' },
        }),
      )
    } catch (err) {
      if (err instanceof HTTPError) {
        res.writeHead(err.statusCode, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({ errors: [{ message: err.userMessage }] }))
      } else {
        res.writeHead(500, {
          'Content-Type': 'application/json',
        })
        res.end(
          JSON.stringify({
            errors: [{ message: 'Could not delete the session.' }],
          }),
        )
      }
    }
  },
}
