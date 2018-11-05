import { Handler } from '../Handler'
import { authenticateRequest } from '../../../api/sessions'
import { HTTPError, getRequestPayload } from '../../utils'
import { getCart } from '../../../api/cart'
import { getMenuItem } from '../../../api/menu-items'

export const removeItemHandler: Handler = {
  route: '/cart',
  method: 'DELETE',
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
        typeof payload.menuItemID !== 'string' ||
        payload.menuItemID.trim() === ''
      ) {
        const msg = `Menu item id is required.`
        throw new HTTPError(400, msg)
      }
      const menuItemID = (payload.menuItemID as string).trim()

      // Get cart
      const cart = await getCart(userID)
      const item = await getMenuItem(menuItemID)
      const newCart = await cart.removeItem(item)

      // Response
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          data: { cart: newCart },
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
            errors: [{ message: 'Could not remove the item from the cart.' }],
          }),
        )
      }
    }
  },
}
