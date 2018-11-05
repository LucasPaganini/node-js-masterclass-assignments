import { createCharge } from '.'
import { stripeKeys, myEmail } from '../../config'

createCharge(stripeKeys, {
  amount: 999,
  currency: 'usd',
  source: 'tok_visa',
  description: 'Example charge',
  receipt_email: myEmail,
}).then(console.log)
