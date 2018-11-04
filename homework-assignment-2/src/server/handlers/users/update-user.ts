import { Handler } from '../Handler'
import { updateUser } from '../../../api/users'
import { HTTPError, getRequestPayload } from '../../utils'
import * as url from 'url'
import { authenticateRequest } from '../../../api/sessions'

/**
 * Server handler to update a user data.
 *
 * Accepted content types:
 * - aplication/json
 */
export const updateUserHandler: Handler = {
  route: /^\/user\/\w+$/, // /user/:id
  method: 'PUT',
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
      let name: string = undefined
      if (payload.name !== undefined) {
        if (typeof payload.name !== 'string' || payload.name.trim() === '') {
          const msg = `Invalid user name.`
          throw new HTTPError(400, msg)
        }
        name = (payload.name as string).trim()
      }

      let email: string = undefined
      if (payload.email !== undefined) {
        if (typeof payload.email !== 'string' || payload.email.trim() === '') {
          const msg = `Invalid email.`
          throw new HTTPError(400, msg)
        }
        email = (payload.email as string).trim()
      }

      let address: string = undefined
      if (payload.address !== undefined) {
        if (
          typeof payload.address !== 'string' ||
          payload.address.trim() === ''
        ) {
          const msg = `Invalid address.`
          throw new HTTPError(400, msg)
        }
        address = (payload.address as string).trim()
      }

      let password: string = undefined
      if (payload.password !== undefined) {
        if (
          typeof payload.password !== 'string' ||
          payload.password.trim() === ''
        ) {
          const msg = `Invalid password.`
          throw new HTTPError(400, msg)
        }
        password = (payload.password as string).trim()
      }

      if (
        name === undefined &&
        email === undefined &&
        address === undefined &&
        password === undefined
      ) {
        const msg = `You must specify at least one user property to be updated.`
        throw new HTTPError(400, msg)
      }

      // Update the user
      const data = {} as any
      if (name) data.name = name
      if (email) data.email = email
      if (address) data.address = address
      if (password) data.password = password
      const user = await updateUser(userID, data)
      delete user.hashedPassword // Don't show sensible information

      // Response
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(
        JSON.stringify({
          data: { message: 'User updated.', user },
        }),
      )
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
            errors: [{ message: 'Could not update the user.' }],
          }),
        )
      }
    }
  },
}
