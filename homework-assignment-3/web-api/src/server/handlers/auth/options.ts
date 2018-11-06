import { Handler } from '../Handler'

export const authOptionsHandler: Handler = {
  route: '/auth',
  method: 'OPTIONS',
  handle: async (req, res) => {
    res.setHeader('Allow', 'POST, DELETE')
    res.end()
  },
}
