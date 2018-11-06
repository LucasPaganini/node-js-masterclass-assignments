import { Handler } from '../Handler'

export const menuOptionsHandler: Handler = {
  route: '/menu-items',
  method: 'OPTIONS',
  handle: async (req, res) => {
    res.setHeader('Allow', 'GET')
    res.end()
  },
}
