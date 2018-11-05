import { Handler } from '../Handler'
import { createOrder } from '../../../api/orders/createOrder'
import { getCart } from '../../../api/cart'
import { authenticateRequest } from '../../../api/sessions'
import { HTTPError, getRequestPayload } from '../../utils'

export const payHandler: Handler = {
  route: '/cart/pay',
  method: 'POST',
  async handle(req, res) {
    try {
      // Authentication
      let userID: string
      try {
        const session = await authenticateRequest(req)
        userID = session.userID
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
      if (
        typeof payload.paymentSource !== 'string' ||
        payload.paymentSource.trim() === ''
      ) {
        const msg = `Payment source is required.`
        throw new HTTPError(400, msg)
      }
      const paymentSource = (payload.paymentSource as string).trim()

      // Pay order
      const cart = await getCart(userID)
      const order = await createOrder(cart, paymentSource)

      // Response
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ data: { message: 'Order paid.' } }))
    } catch (err) {
      if (err instanceof HTTPError) {
        res.writeHead(err.statusCode, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify({ errors: [{ message: err.userMessage }] }))
      } else {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(
          JSON.stringify({
            errors: [{ message: 'Could not process the payment.' }],
          }),
        )
      }
    }
  },
}
