import { Handler } from '../Handler'
import { getCart } from '../../../api/cart'
import { authenticateRequest } from '../../../api/sessions'
import { HTTPError } from '../../utils'

export const getCartHandler: Handler = {
  route: '/cart',
  method: 'GET',
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

      // Get cart
      const cart = await getCart(userID)

      // Response
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          data: { cart },
        }),
      )
    } catch (err) {
      console.log(err)

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
            errors: [{ message: 'Could not get the cart.' }],
          }),
        )
      }
    }
  },
}
