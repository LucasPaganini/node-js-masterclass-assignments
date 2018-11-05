import { CartMenuItem } from '../cart'

export interface OrderData {
  userID: string
  items: CartMenuItem[]
}
