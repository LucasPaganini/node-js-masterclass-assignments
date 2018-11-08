import { API_HOST } from './constants.mjs'

export class CartService {
  /**
   * @param {AuthService} auth Authentication service
   */
  constructor(auth) {
    this._auth = auth
  }

  /**
   * Adds one menu item to cart and returns the updated cart.
   *
   * @param {string} menuItemID ID of the menu item to be added to cart
   * @returns {Promise<Cart>} Updated cart
   */
  async addItem(menuItemID) {
    const data = { menuItemID }

    const authHeaders = await this._auth.getAuthHeaders()
    authHeaders.append('Content-Type', 'application/json')

    const res = await fetch(API_HOST + '/cart', {
      method: 'POST',
      headers: authHeaders,
      body: JSON.stringify(data),
    })
    const json = await res.json()

    if (json.errors) {
      const msg = json.errors.map(error => error.message).join(' ')
      throw new Error(msg)
    }

    return json.data.cart
  }

  /**
   * Removes one menu item from cart and returns the updated cart.
   *
   * @param {string} menuItemID ID of the menu item to be removed from cart
   * @returns {Promise<Cart>} Updated cart
   */
  async removeItem(menuItemID) {
    const data = { menuItemID }

    const authHeaders = await this._auth.getAuthHeaders()
    authHeaders.append('Content-Type', 'application/json')

    const res = await fetch(API_HOST + '/cart', {
      method: 'DELETE',
      headers: authHeaders,
      body: JSON.stringify(data),
    })
    const json = await res.json()

    if (json.errors) {
      const msg = json.errors.map(error => error.message).join(' ')
      throw new Error(msg)
    }

    return json.data.cart
  }

  /**
   * Gets the user cart.
   *
   * @returns {Promise<Cart>} Cart
   */
  async getCart() {
    const authHeaders = await this._auth.getAuthHeaders()

    const res = await fetch(API_HOST + '/cart', {
      method: 'GET',
      headers: authHeaders,
    })
    const json = await res.json()

    if (json.errors) {
      const msg = json.errors.map(error => error.message).join(' ')
      throw new Error(msg)
    }

    return json.data.cart
  }
}
