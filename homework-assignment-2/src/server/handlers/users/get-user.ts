import { Handler } from '../Handler'

// TODO
export const getUser: Handler = {
  route: /^\/user\/\w+$/,
  method: 'GET',
  handle: async (req, res) => {
    try {
      throw new Error('t')
    } catch (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      })
      res.end(
        JSON.stringify({ errors: [{ message: 'Could not find the user.' }] }),
      )
    }
  },
}
