import { Handler } from '../Handler'

export const cartOptionsHandler: Handler = {
  route: '/cart',
  method: 'OPTIONS',
  handle: async (req, res) => {
    res.setHeader('Allow', 'GET, POST, DELETE')
    res.end()
  },
}

export const payOptionsHandler: Handler = {
  route: '/cart/pay',
  method: 'OPTIONS',
  handle: async (req, res) => {
    res.setHeader('Allow', 'POST')
    res.end()
  },
}
