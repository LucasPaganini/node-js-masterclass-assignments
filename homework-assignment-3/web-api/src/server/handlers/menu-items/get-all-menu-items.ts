import { Handler } from '../Handler'
import { getMenuItems } from '../../../api/menu-items'
import { authenticateRequest } from '../../../api/sessions'
import { HTTPError } from '../../utils'

export const getAllMenuItemsHandler: Handler = {
  route: '/menu-items',
  method: 'GET',
  async handle(req, res) {
    try {
      // Authentication
      try {
        await authenticateRequest(req)
      } catch (err) {
        throw new HTTPError(401, 'Unauthorized')
      }

      // Get items
      const menuItems = await getMenuItems()

      // Response
      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({
          data: { menuItems },
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
            errors: [{ message: 'Could not delete the user.' }],
          }),
        )
      }
    }
  },
}
