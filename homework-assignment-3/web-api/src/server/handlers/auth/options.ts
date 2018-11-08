import { Handler } from '../Handler'

export const authOptionsHandler: Handler = {
  route: '/auth',
  method: 'OPTIONS',
  handle: async (req, res) => {
    const methods = 'DELETE, POST'
    res.setHeader('Allow', methods)
    res.setHeader('Access-Control-Allow-Methods', methods)
    res.end()
  },
}
