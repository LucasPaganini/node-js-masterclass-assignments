const API_HOST = 'http://localhost:3000'

export class AuthService {
  /**
   * Tells if the user is authenticated.
   *
   * @returns {Promise<boolean>} User is authenticated?
   */
  async isAuthenticated() {
    try {
      this._getToken()
      return true
    } catch (err) {
      return false
    }
  }

  /**
   * Authenticates the user.
   *
   * @param {string} email User email
   * @param {string} password User password
   * @returns {Promise<Object>}
   */
  async login(email, password) {
    const res = await fetch(API_HOST + '/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    const json = await res.json()

    if (json.errors) {
      const msg = json.errors.map(error => error.message).join(' ')
      throw new Error(msg)
    }

    await this._saveToken(json.data.session.token)

    return json
  }

  /**
   * Save authentication token on local storage.
   *
   * @param {string} token Authentication token to be saved
   * @returns {Promise<void>} Completes when the token is saved
   */
  async _saveToken(token) {
    this._token = token

    localStorage.setItem('auth_token', token)
    return undefined
  }

  /**
   * Try to get an authentication token. Rejects if none was found.
   *
   * @returns {Promise<string>} Authentication token promise
   */
  async _getToken() {
    if (typeof this._token === 'string') return this._token

    const token = localStorage.getItem('auth_token')
    if (token) return token

    throw new Error(`Token not found.`)
  }
}
