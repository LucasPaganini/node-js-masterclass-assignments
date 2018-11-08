import { Handler } from '../Handler'

export const menuOptionsHandler: Handler = {
  route: '/menu-items',
  method: 'OPTIONS',
  handle: async (req, res) => {
    const methods = 'GET'
    res.setHeader('Allow', methods)
    res.setHeader('Access-Control-Allow-Methods', methods)
    res.end()
  },
}
