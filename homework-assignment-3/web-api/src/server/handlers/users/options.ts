import { Handler } from '../Handler'

export const usersOptionsHandler: Handler = {
  route: '/user',
  method: 'OPTIONS',
  handle: async (req, res) => {
    res.setHeader('Allow', 'POST')
    res.end()
  },
}

export const usersIDOptionsHandler: Handler = {
  route: /^\/user\/\w+$/, // /user/:id
  method: 'OPTIONS',
  handle: async (req, res) => {
    res.setHeader('Allow', 'GET, DELETE, PUT')
    res.end()
  },
}
