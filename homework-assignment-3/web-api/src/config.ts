import { StripeKeys } from './api/stripe'

if (typeof process.env.STRIPE_PUBLISHABLE_KEY !== 'string')
  throw new Error(
    'You must specify your stripe publishable key as STRIPE_PUBLISHABLE_KEY env variable',
  )
if (typeof process.env.STRIPE_SECRET_KEY !== 'string')
  throw new Error(
    'You must specify your stripe secret key as STRIPE_SECRET_KEY env variable',
  )
export const STRIPE_KEYS: StripeKeys = {
  publishable: process.env.STRIPE_PUBLISHABLE_KEY,
  secret: process.env.STRIPE_SECRET_KEY,
}

if (typeof process.env.MAILGUN_KEY !== 'string')
  throw new Error(
    'You must specify your mailgun key as MAILGUN_KEY env variable',
  )
export const MAILGUN_KEY = process.env.MAILGUN_KEY

export const MY_EMAIL = process.env.MY_EMAIL
