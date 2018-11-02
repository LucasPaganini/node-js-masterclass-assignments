import { Handler } from '../Handler'

// TODO
export const createUser: Handler = {
  route: '/user',
  method: 'POST',
  handle: async (req, res) => {
    try {
      throw new Error('t')
    } catch (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({ errors: [{ message: 'Could not create the user.' }] }),
      )
    }
  },
}
