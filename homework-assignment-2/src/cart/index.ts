import { User } from '../users'
import { MenuItem } from '../menu-items'
import { readFile, writeFile } from 'fs'
import { join } from 'path'

interface JSONCart {
  userID: User['id']
  items: Array<CartMenuItem>
}

export class Cart {
  private _items: { [itemID: string]: CartMenuItem }
  readonly userID: User['id']

  constructor(data: JSONCart) {
    this.userID = data.userID

    this._items = {}
    data.items.forEach(item => (this._items[item.id] = item))
  }

  public get total(): number {
    return this.getAllItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    )
  }

  public async addItem(item: MenuItem): Promise<Cart> {
    const data = this.toJSON()
    const foundItem = data.items.find(i => i.id === item.id)
    if (foundItem === undefined) {
      data.items.push({ ...item, quantity: 1 })
    } else {
      foundItem.quantity++
    }
    const newCart = new Cart(data)
    return updateCart(newCart)
  }

  public getItem(itemID: MenuItem['id']): CartMenuItem | null {
    if (this._items[itemID] === undefined) return null
    return this._items[itemID]
  }

  public getAllItems(): Array<CartMenuItem> {
    return Object.values(this._items)
  }

  public toJSON(): JSONCart {
    return { items: this.getAllItems(), userID: this.userID }
  }
}

export interface CartMenuItem extends MenuItem {
  quantity: number
}

export const addToCart = async (user: User, item: MenuItem): Promise<Cart> => {
  return getCart(user).then(cart => cart.addItem(item))
}

const CARTS_DB_PATH = join(__dirname, './.carts')

export const getCart = (user: User): Promise<Cart> => {
  const fullPath = `${CARTS_DB_PATH}/${user.id}`
  return new Promise<Cart>((resolve, reject) => {
    readFile(fullPath, (err, maybeCart) => {
      if (err) reject(err)
      try {
        const cart = new Cart(validateJSONCart(maybeCart))
        resolve(cart)
      } catch (err) {
        reject(err)
      }
    })
  })
}

const updateCart = async (updatedCart: Cart): Promise<Cart> => {
  const fileData = JSON.stringify(updatedCart)
  const fullPath = `${CARTS_DB_PATH}/${updatedCart.userID}`

  return new Promise<Cart>((resolve, reject) => {
    writeFile(fullPath, fileData, err => {
      if (err) reject(err)
      resolve(updatedCart)
    })
  })
}

const throws = (fn: Function, ...args: any[]): boolean => {
  try {
    fn(...args)
    return false
  } catch (err) {
    return true
  }
}

const validateJSONCart = (maybeCart: any = {}): JSONCart => {
  if (
    !(maybeCart.items instanceof Array) ||
    maybeCart.items.some(item => throws(validateCartMenuItem, item))
  )
    throw new Error('Invalid cart')
  const items: Array<CartMenuItem> = maybeCart.items

  if (typeof maybeCart.userID !== 'string' || maybeCart.userID.trim() === '')
    throw new Error('Invalid cart')
  const userID: string = maybeCart.userID

  return { items, userID }
}

const validateCartMenuItem = (maybeCartMenuItem: any = {}): CartMenuItem => {
  if (
    typeof maybeCartMenuItem.id !== 'string' ||
    maybeCartMenuItem.id.trim() === ''
  )
    throw new Error('Invalid cart menu item')
  const id: string = maybeCartMenuItem.id

  if (
    typeof maybeCartMenuItem.title !== 'string' ||
    maybeCartMenuItem.title.trim() === ''
  )
    throw new Error('Invalid cart menu item')
  const title: string = maybeCartMenuItem.title.trim()

  if (typeof maybeCartMenuItem.price !== 'number')
    throw new Error('Invalid cart menu item')
  const price = maybeCartMenuItem.price

  if (typeof maybeCartMenuItem.quantity !== 'number')
    throw new Error('Invalid cart menu item')
  const quantity = maybeCartMenuItem.quantity

  return { id, title, price, quantity }
}
