import { Cart } from '../cart'
import { OrderData } from './OrderData'
import { CreatableCharge, createCharge } from '../stripe'
import { getUser } from '../users'
import { STRIPE_KEYS } from '../../config'
import { notifyOrderPlaced } from './notifyOrderPlaced'

export const createOrder = async (
  cart: Cart,
  paymentSource: string,
): Promise<OrderData> => {
  const order: OrderData = cart.toJSON()
  const user = await getUser(cart.userID)

  const chargeData: CreatableCharge = {
    amount: cart.total,
    description: 'Example charge',
    receipt_email: user.email,
    currency: 'usd',
    source: paymentSource,
  }
  const charge = await createCharge(STRIPE_KEYS, chargeData)

  await notifyOrderPlaced(order)

  const newCart = await cart.clear()

  return order
}
