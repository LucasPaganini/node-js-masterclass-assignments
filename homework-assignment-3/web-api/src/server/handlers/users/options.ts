import { Handler } from '../Handler'

export const usersOptionsHandler: Handler = {
  route: '/user',
  method: 'OPTIONS',
  handle: async (req, res) => {
    const methods = 'POST'
    res.setHeader('Allow', methods)
    res.setHeader('Access-Control-Allow-Methods', methods)
    res.end()
  },
}

export const usersIDOptionsHandler: Handler = {
  route: /^\/user\/\w+$/, // /user/:id
  method: 'OPTIONS',
  handle: async (req, res) => {
    const methods = 'GET, DELETE, PUT'
    res.setHeader('Allow', methods)
    res.setHeader('Access-Control-Allow-Methods', methods)
    res.end()
  },
}
