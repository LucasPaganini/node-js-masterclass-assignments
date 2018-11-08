import { API_HOST } from './constants.mjs'

export class UsersService {
  /**
   * @param {AuthService} auth Authentication service
   */
  constructor(auth) {
    this._auth = auth
  }

  /**
   * Creates a new user and authenticates it.
   *
   * @param {string} name User name
   * @param {string} address User address
   * @param {string} email User email
   * @param {string} password User password
   * @returns {Promise<User>} Data of the created user
   */
  async createUser(name, address, email, password) {
    const data = { name, email, address, password }
    const res = await fetch(API_HOST + '/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    const json = await res.json()

    if (json.errors) {
      const msg = json.errors.map(error => error.message).join(' ')
      throw new Error(msg)
    }

    await this._auth.login(email, password)

    return json.data.user
  }
}
