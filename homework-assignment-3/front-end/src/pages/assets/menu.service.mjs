import { API_HOST } from './constants.mjs'

export class MenuService {
  constructor(auth) {
    this._auth = auth
  }

  /**
   * Gets all menu items available.
   *
   * @returns {Promise<Array<MenuItem>>} Array of all menu items
   */
  async getMenuItems() {
    const authHeaders = await this._auth.getAuthHeaders()
    const res = await fetch(API_HOST + '/menu-items', {
      method: 'GET',
      headers: authHeaders,
    })
    const json = await res.json()

    if (json.errors) {
      const msg = json.errors.map(error => error.message).join(' ')
      throw new Error(msg)
    }

    return json.data.menuItems
  }
}
