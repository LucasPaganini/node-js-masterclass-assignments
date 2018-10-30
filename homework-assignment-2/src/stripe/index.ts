// curl https://api.stripe.com/v1/charges \
// -u sk_test_BQokikJOvBiI2HlWgH4olfQ2: \
// -d amount = 999 \
// -d currency = usd \
// -d source = tok_visa \
// -d receipt_email = "jenny.rosen@example.com"

import * as https from 'https'
import * as querystring from 'querystring'

export interface StripeKeys {
  publishable: string
  secret: string
}

export interface CreatableCharge {
  amount: number
  currency: string
  source: string
  receipt_email: string
}

export type Charge = any

const base64Encode = (string: string): string =>
  Buffer.from(string).toString('base64')

export const createCharge = (
  stripeAuth: StripeKeys,
  charge: CreatableCharge,
): Promise<Charge> => {
  return new Promise<Charge>((resolve, reject) => {
    const postData = querystring.stringify(charge)

    const options: https.RequestOptions = {
      hostname: 'api.stripe.com',
      port: 443,
      path: '/v1/charges',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length,
        Authorization: `Basic ${base64Encode(stripeAuth.secret)}:`,
      },
    }

    const req = https.request(options, res => {
      let resData = ''
      res.on('error', reject)
      res.on('data', data => (resData += data))
      res.on('end', () => {
        try {
          resolve(JSON.parse(resData))
        } catch (err) {
          reject(err)
        }
      })
    })

    req.on('error', reject)
    req.write(postData)
    req.end()
  })
}
