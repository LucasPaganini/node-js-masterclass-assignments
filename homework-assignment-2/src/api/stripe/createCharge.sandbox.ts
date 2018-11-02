import { createCharge } from '.'
import { stripeKeys, myEmail } from '../../config'

createCharge(stripeKeys, {
  amount: 999,
  currency: 'usd',
  source: 'tok_visa',
  receipt_email: myEmail,
}).then(console.log)
