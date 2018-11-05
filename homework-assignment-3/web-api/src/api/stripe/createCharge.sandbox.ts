import { createCharge } from '.'
import { STRIPE_KEYS, MY_EMAIL } from '../../config'

createCharge(STRIPE_KEYS, {
  amount: 999,
  currency: 'usd',
  source: 'tok_visa',
  description: 'Example charge',
  receipt_email: MY_EMAIL,
}).then(console.log)
