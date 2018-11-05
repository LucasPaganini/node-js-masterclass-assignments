import { Handler } from '../Handler'
import { getUserByEmail } from '../../../api/users'
import { HTTPError, getRequestPayload } from '../../utils'
import { createSession } from '../../../api/sessions'

/**
 * Server handler to generate a user token (login).
 *
 * Accepted content types:
 * - aplication/json
 */
export const loginHandler: Handler = {
  route: '/auth',
  method: 'POST',
  handle: async (req, res) => {
    try {
      // Check the content type
      const contentType = req.headers['content-type']
      if (contentType !== 'application/json') {
        const msg = `Invalid Content-Type "${contentType}", must be one of: "application/json".`
        throw new HTTPError(415, msg)
      }

      // Parse the payload
      const rawPayload = await getRequestPayload(req)
      let payload
      try {
        payload = JSON.parse(rawPayload)
      } catch (err) {
        throw new HTTPError(
          400,
          'Error parsing the request payload. Check your syntax.',
        )
      }

      // Validate payload data
      if (typeof payload.email !== 'string' || payload.email.trim() === '') {
        const msg = `User email is required.`
        throw new HTTPError(400, msg)
      }
      const email = (payload.email as string).trim()

      if (
        typeof payload.password !== 'string' ||
        payload.password.trim() === ''
      ) {
        const msg = `User password is required.`
        throw new HTTPError(400, msg)
      }
      const password = (payload.password as string).trim()

      // Create the session
      const userID = (await getUserByEmail(email)).id
      const session = await createSession(userID, password)

      // Response
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          data: { session },
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
            errors: [{ message: 'Could not create the session.' }],
          }),
        )
      }
    }
  },
}
