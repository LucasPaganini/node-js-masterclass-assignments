import { Handler } from '../Handler'

export const cartOptionsHandler: Handler = {
  route: '/cart',
  method: 'OPTIONS',
  handle: async (req, res) => {
    const methods = 'GET, POST, DELETE'
    res.setHeader('Allow', methods)
    res.setHeader('Access-Control-Allow-Methods', methods)
    res.end()
  },
}

export const payOptionsHandler: Handler = {
  route: '/cart/pay',
  method: 'OPTIONS',
  handle: async (req, res) => {
    const methods = 'POST'
    res.setHeader('Allow', methods)
    res.setHeader('Access-Control-Allow-Methods', methods)
    res.end()
  },
}
